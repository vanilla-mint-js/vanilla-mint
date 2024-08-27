import { define } from "@vanilla-mint/core";
import { CsvTable, FrostedButton, MonacoEditor } from "@vanilla-mint/components";
import { PdfViewer } from "@vanilla-mint/component-pdf-viewer";
import { QrCode } from "@vanilla-mint/component-qr-code";
import { SigPad } from "@vanilla-mint/component-sig-pad";
import { SequenceDiagram } from "@vanilla-mint/component-sequence-diagram";
const rows = 3;

const arr = Array(rows).fill(0);

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