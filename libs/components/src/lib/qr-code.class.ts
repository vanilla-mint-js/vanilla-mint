
import { VanillaMint, injectScript } from '@vanilla-mint/core';
import { combineLatest, tap } from 'rxjs';

const globalQrCodeName = '_globalQrCode';

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

    get qrcode() {
        return (window as any)[globalQrCodeName];
    }

    override async vmConnected() {

        if (!this.qrcode) {
            await injectScript(this, 'https://cdn.jsdelivr.net/npm/qrcode-generator/qrcode.min.js');
            (window as any)[globalQrCodeName] = (window as any).qrcode;
        }

        if (typeof this.qrcode !== 'function') {
            console.warn(`${QrCode.name} component detected a global namespace error: "window.${globalQrCodeName}" has already been assigned`);
        } else {
            const qrcode = (window as any).qrcode;
            const typeNumber = 0;
            const errorCorrectionLevel = 'H';

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
    }

    override vmDisconnected() { }
    override vmAdopted() { }
}
