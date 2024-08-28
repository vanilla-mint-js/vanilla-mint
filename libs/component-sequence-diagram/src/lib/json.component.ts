import { appendChild, VanillaMint } from "@vanilla-mint/core";

const frost = { backgroundColor: 'rgba(255, 255, 255, 0.9)' };

type TJsonAttrs = {
    stringified: string;
    heading: string;
};

const buttonStyles = {
    padding: '0.4rem',
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'solid 1px black',
    ...frost,
};

export class Json extends VanillaMint<TJsonAttrs> {
    pre!: HTMLElement;
    previewButton!: HTMLButtonElement;
    hideButton!: HTMLButtonElement;

    static observedAttributes: Array<keyof TJsonAttrs> = ['stringified', 'heading'];
    static tagName = 'j-son';
    originalPosition!: { left: string; right: string; top: string; bottom: string; };

    constructor() {
        super(Json.observedAttributes);
    }

    vmConnected() {
        this.vmSetStyles({
            color: 'black',
            display: 'grid',
            placeItems: 'center',
            maxHeight: '90vh', overflowY: 'scroll',
            borderRadius: '0.25rem',
            padding: '0.25rem',
        });

        this.pre = this.vmAppendChild({ tag: 'pre', styles: {
            flexGrow: 1,
            width: '100%',
            color: 'black', textAlign: 'start', display: 'none', overflowWrap: 'break-word !important', maxWidth: '100%'
        } });

        const header = this.vmPrependChild({
            tag: 'div',
            styles: {
                position: 'sticky',
                top: '0.25rem',
                backdropFilter: 'blur(2px)',
                width: '100%',
                color: 'black',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '2rem',
            },
        });

        const heading = appendChild(header, {
            tag: 'h3', attrs: { textContent: this.vmAttr('heading') },
            styles: { padding: '0', margin: '0', display: 'none' }
        });

        this.vmOnChangedAttr('heading', (_) => heading.textContent = _);

        this.previewButton = appendChild(header, {
            tag: 'button',
            styles: buttonStyles,
            attrs: {
                textContent: 'JSON +',
                onclick: () => {
                    this.pre.innerHTML = this.vmAttr('stringified');
                    this.vmSetStyles({...frost, zIndex: 10000});
                    this.previewButton.style.display = 'none';
                    this.pre.style.display = 'initial';
                    this.hideButton.style.display = 'initial';
                    const { left, right, top, bottom } = this.style;
                    heading.style.display = 'inline-block';
                    this.originalPosition = { left, right, top, bottom };
                    this.vmSetStyles({ position: 'fixed', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)' })
                }
            }
        }) as HTMLButtonElement;

        this.hideButton = appendChild(header, {
            tag: 'button',
            styles: { ...buttonStyles, display: 'none' },
            attrs: {
                textContent: 'JSON -',
                onclick: () => {
                    this.vmSetStyles({backgroundColor: 'transparent'});
                    this.pre.style.display = 'none';
                    this.vmSetStyles({zIndex: 1000});
                    this.previewButton.style.display = 'initial';
                    this.hideButton.style.display = 'none';
                    heading.style.display = 'none';
                    this.vmSetStyles({ position: 'static', transform: 'translateX(0%) translateY(0%)', ... this.originalPosition })
                }
            }
        }) as HTMLButtonElement;

        header.prepend(this.previewButton);
        header.prepend(this.hideButton);
    }

    vmDisconnected() {
        throw new Error('Method not implemented.');
    }
    vmAdopted() {
        throw new Error('Method not implemented.');
    }

}