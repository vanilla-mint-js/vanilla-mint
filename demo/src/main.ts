import { _$, $, define, VanillaMint } from "@vanilla-mint/core";
import { CsvTable, FrostedButton, MonacoEditor } from "@vanilla-mint/components";
import { PdfViewer } from "@vanilla-mint/component-pdf-viewer";
import { QrCode } from "@vanilla-mint/component-qr-code";
import { SigPad } from "@vanilla-mint/component-sig-pad";
import { Json, SequenceDiagram } from "@vanilla-mint/component-sequence-diagram";
const rows = 3;

const arr = Array(rows).fill(0);

console.warn('things and stuff')

const columns = [
    'test-sku', 'test-name', 'test-location'
];

const content = [
    [...columns, 'test-qty'].join(', '),
    ...arr.map(
        (_, i) => [...columns.map(c => `${c}-${i}-3-21`), i + 1].join(', ')
    )
].join('\n');

(window as any)['csv'] = content;

define(CsvTable);
define(FrostedButton);
define(MonacoEditor);
define(PdfViewer);
define(QrCode);
define(SigPad);
define(SequenceDiagram);
define(Json);

type TCounterProps = {count: number};
class Counter extends VanillaMint<TCounterProps> {
    vmConnected() {

    }
    vmDisconnected() {
        throw new Error("Method not implemented.");
    }
    vmAdopted() {
        throw new Error("Method not implemented.");
    }
    static observedAttributes: Array<keyof TCounterProps> = ['count'];
    static tagName = 'the-counter';

    constructor() {
      super(Counter.observedAttributes);
    }

}

define(Counter);

const border = 'solid 1px orange';
const flex = {display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'};

const $button = (props: Partial<HTMLButtonElement>) => $({ tag: 'button', ...props }) as HTMLButtonElement;
const $input = (props: Partial<HTMLInputElement>) => $({ tag: 'input', ...props }) as HTMLInputElement;
const $canvas = (props: Partial<HTMLCanvasElement>) => $({ tag: 'canvas', ...props }) as HTMLCanvasElement;

const height = window.innerHeight * .8;
const width = window.innerWidth * .8;

const count = $input({value: '337', onchange: (e: any) => handleChange(e.target?.value)});
const canvas = $canvas({width, height, styles: {height: `${height}px`, width: `${width}px`, border}} as any);

function inc () {
    handleChange((Number(count.value) + 1).toString());
}

function dec () {
    handleChange((Number(count.value) - 1).toString());
}
function handleChange(_value: string) {

    count.value = _value;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, width, height)
    ctx!.font = '30px Arial';
    ctx!.fillStyle = 'white';
    ctx!.textAlign = 'center';
    ctx!.fillText(_value, canvas.width / 2, 100);
    ctx!.strokeStyle = 'red';
    ctx!.lineWidth = 2;
    ctx!.strokeText(_value, canvas.width / 2, 150);
}

_$(document.body,
    $({
        tag: 'div',
        styles: { height: '100vh', boxSizing: 'border-box', backgroundColor: 'navy', color: 'white', ...flex, flexDirection: 'column' },
        $$: [
            $({
                styles: {  boxSizing: 'border-box', border, ...flex, padding: '1rem', flex: 1 },
                tag: 'div',
                $$: [
                    $button({
                        onclick: dec,
                        textContent: '-',
                    }),
                    count,
                    $button({
                        onclick: inc,
                        textContent: '+',
                    }),
                ]
            }),
            canvas,
        ]
    })
);