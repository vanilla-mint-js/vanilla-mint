
import { VanillaMint } from '@vanilla-mint/core';
import * as qrcode from 'qrcode-generator';
import { combineLatest, tap } from 'rxjs';

type TAttrs = {
    text: string;
    'cell-size': number;
};

export class QrCode extends VanillaMint<TAttrs> {
    static observedAttributes: Array<keyof TAttrs> = ['text', 'cell-size'];
    static tagName = 'qr-code';

    constructor() {
        super(QrCode.observedAttributes);
    }

    override vmConnected() {
        const typeNumber: TypeNumber = 0;
        const errorCorrectionLevel: ErrorCorrectionLevel = 'H';

        this.vmSupervise(
            combineLatest([
                this.vmObserve('cell-size'),
                this.vmObserve('text')]
            ).pipe(
                tap(([cellSize, text]) => {
                    const qr = qrcode(typeNumber, errorCorrectionLevel);
                    qr.addData(text);
                    qr.make();
                    this.innerHTML = qr.createSvgTag({ cellSize, scalable: false });
                })
            )
        );
    }

    override vmDisconnected() { }
    override vmAdopted() { }
}
