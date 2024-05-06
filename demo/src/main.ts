import { define } from "@vanilla-mint/core";
import { CsvTable, FrostedButton, MonacoEditor, PdfViewer, QrCode, SigPad } from "@vanilla-mint/components";
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