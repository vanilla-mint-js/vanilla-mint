import { VanillaMint, appendScript, setStyle } from '@vanilla-mint/custom';
import { combineLatest, concatMap, debounceTime, distinctUntilChanged, filter, fromEvent, map, share, startWith } from 'rxjs';

const globalPdfjsDistName = 'pdfjsLib';

type TAttrs = {
  url: string;
  page: number,
};

export class PdfViewer extends VanillaMint<TAttrs> {
  static observedAttributes: Array<keyof TAttrs> = ['url', 'page'];
  static tagName = 'pdf-viewer';

  scale = .94;
  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;

  readonly resize$ = fromEvent(window, 'resize').pipe(share());
  readonly width$ = this.resize$.pipe(
    startWith(() => null),
    map(() => this.parentElement?.getBoundingClientRect().width),
    map(width => width || window.innerWidth),
    map(width => width * this.scale),
    distinctUntilChanged(),
    debounceTime(1000),
  );
  nextButton!: HTMLElement;
  previousButton!: HTMLElement;
  pageNumber!: number;
  page: any;
  pageCount!: number;

  constructor() {
    super(PdfViewer.observedAttributes);
  }

  get pdfjsLib() {
    return (window as any)[globalPdfjsDistName];
  }

  override async vmConnected() {

    await this.init();

    this.vmSubscribe(
      combineLatest([
        this.vmObserveAttr('url').pipe(filter(Boolean), concatMap(async (url) => await this.loadPdf(url))),
        this.vmObserveAttr('page').pipe(startWith(1), map(Number), distinctUntilChanged()),
        this.width$,
      ]).pipe(
        map(([pdf, page, width]) => ({ pdf, page, width })),
        concatMap(({pdf, page, width}) => this.renderPage(pdf, page, width))
      )
    );
  }

  async init() {
    this.previousButton = this.vmAppendChild({ tag: 'button', styles: { padding: '1rem' }, attrs: { textContent: 'Previous', onclick: () => this.vmSetAttrs({ page: Math.max(1, (Number(this.vmAttr('page') || 1) - 1)) as any }) } }) as any;
    this.nextButton = this.vmAppendChild({ tag: 'button', styles: { padding: '1rem' }, attrs: { textContent: 'Next', onclick: () => this.vmSetAttrs({ page: Math.min(this.pageCount, Number(this.vmAttr('page') || 1) + 1) as any }) } }) as any;
    this.canvas = this.vmAppendChild({ tag: 'canvas', styles: { visibility: 'hidden' } }) as any;
    this.context = this.canvas.getContext('2d') as any;

    if (!this.pdfjsLib) {
      await appendScript(this, 'https://mozilla.github.io/pdf.js/build/pdf.mjs', 'module');
    }

    this.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.mjs';
  }

  async loadPdf(url: string) {
    const pdf = await this.pdfjsLib.getDocument({ url, withCredentials: false }).promise;
    this.pageCount = pdf._pdfInfo.numPages;
    return pdf;
  }

  async renderPage(pdf: any, pageNumber: number, width: number) {
    if(!this.pageNumber || (this.pageNumber !== pageNumber)) {
      this.pageNumber = pageNumber;
      this.page = await pdf.getPage(pageNumber);
    }

    const page = this.page;

    const viewportProbe = page.getViewport({ scale: 1 });
    const scale = ((width / viewportProbe.width) as any);
    const viewport = page.getViewport({ scale });
    this.canvas.height = viewport.height;
    this.canvas.width = viewport.width;

    await page.render({
      canvasContext: this.context,
      viewport
    }).promise;

    setStyle(this.canvas, 'visibility', 'visible');
  }

  override vmDisconnected() { }
  override vmAdopted() { }
}
