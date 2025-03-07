
import { VanillaMint } from '@vanilla-mint/custom';
import { switchMap, takeUntil, tap } from 'rxjs';

type TAttrs = {
    width: number;
    height: number;
};

export class SigPad extends VanillaMint<TAttrs> {
    static observedAttributes: Array<keyof TAttrs> = ['width','height'];
    static tagName = 'sig-pad';

    constructor() {
        super(SigPad.observedAttributes);
    }

    override async vmConnected() {
        const width = Number(this.vmAttr('width', window.innerWidth.toString()).replace('px', ''));
        const height = Number(this.vmAttr('height', window.innerHeight.toString()).replace('px', ''));
        const canvas: HTMLCanvasElement = this.vmAppendChild({ tag: 'canvas', attrs: { width, height } as any, styles: { width: width + 'px', height: height + 'px', border: 'solid 1px hotpink' } }) as any;
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as any;
        let x: number;
        let y: number;

        this.vmSubscribe(this.vmObserveEvent('pointerdown')
            .pipe(
                tap(console.warn.bind(console, 'pointerdown')),
                tap(({
                    pageX,
                    pageY,
                }) => {
                    x = pageX;
                    y = pageY;
                    console.warn({x, y})
                }),
                switchMap(() => this.vmObserveEvent('pointermove')
                    .pipe(
                        takeUntil(this.vmObserveEvent('pointerup')),
                        tap(({ clientX: pageX, clientY: pageY }) => {
                            // todo: this only works for full-screen render currently
                            // fix so that the coordinates reflect the offset of the canvas w/ respect to the window
                            console.warn({pageX, pageY})
                            ctx.beginPath();
                            ctx.moveTo(x, y);
                            ctx.lineTo(pageX, pageY);
                            ctx.lineWidth = 1;
                            ctx.stroke();
                            x = pageX;
                            y = pageY;
                        }),
                    ),
                )
            )
        );
    }

    override vmDisconnected() { }
    override vmAdopted() { }
}
