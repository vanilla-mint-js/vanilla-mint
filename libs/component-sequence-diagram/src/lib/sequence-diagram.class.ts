
import { VanillaMint, appendScript } from '@vanilla-mint/core';
import { combineLatest, tap } from 'rxjs';

const globalQrCodeName = '_globalQrCode';

type TAttrs = {
    text: string;
    'cell-size': number;
};

export class QrCode extends VanillaMint<TAttrs> {
    static observedAttributes: Array<keyof TAttrs> = ['text', 'cell-size'];
    static tagName = 'sequence-diagram';

    constructor() {
        super(QrCode.observedAttributes);
    }

    get qrcode() {
        // todo: replace umd dep and delete this
        // or... if this is how we roll, then we need to specify the umd name to avoid collisions
        return (window as any)[globalQrCodeName];
    }

    override async vmConnected() {
        if (!this.qrcode) {
            await appendScript(this, 'https://cdn.jsdelivr.net/npm/qrcode-generator/qrcode.min.js');
            (window as any)[globalQrCodeName] = (window as any).qrcode;
        }

        if (typeof this.qrcode !== 'function') {
            console.warn(`QrCode component detected a global namespace error: "window.${globalQrCodeName}" has already been assigned`);
        } else {
            const typeNumber = 0;
            const errorCorrectionLevel = 'H';

            this.vmSubscribe(
                combineLatest([
                    this.vmObserveAttr('cell-size'),
                    this.vmObserveAttr('text')]
                ).pipe(
                    tap(([cellSize, text]) => {
                        const qr = this.qrcode(typeNumber, errorCorrectionLevel);
                        qr.addData(text);
                        qr.make();
                        this.innerHTML = qr.createSvgTag({ cellSize, scalable: false });
                    })
                )
            );
        }
    }

    override vmDisconnected() { }
    override vmAdopted() { }
}
