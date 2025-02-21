import { define, PdfViewer } from "@vanilla-mint/component-pdf-viewer";
import { $button, $div, _ } from "@vanilla-mint/dom";
import { signal, effect } from '@preact/signals-core';

define(PdfViewer);

const page = signal(1);
const total = signal(1); // need to get this from connected

const pdfViewer: PdfViewer = _(document.createElement('pdf-viewer'), {
    page: 1,
    url: "f1040.pdf",
    connected: (e: any) => console.warn({e}),
    onconnected: (e: any) => console.warn({e}),
    onConnected: (e: any) => console.warn({e}),
} as any) as any;


effect(() => {
    pdfViewer.setAttribute('page', `${page.value}`);
    console.warn({thing: pdfViewer.vmSetAttrs})
});

const back = $button({ textContent: 'back', onclick: () => page.value--, } as any);
const forward = $button({ textContent: 'forward', onclick: () => page.value++, } as any);

document.getElementById('app')
    ?.appendChild($div({
        children: [
            pdfViewer,
            $div({
                children: [
                    back, forward
                ]
            })
        ]
    }));