import { VanillaMint, appendChild, appendStylesheet, injectScript } from "@vanilla-mint/core";

type TAttrs = {
    input: any;
    language: any;
};

const styleUrl = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs/editor/editor.main.min.css';

export class MonacoEditor extends VanillaMint<TAttrs> {
    static observedAttributes: Array<keyof TAttrs> = ['input', 'language'];
    static tagName = 'monaco-editor';

    constructor() {
        super(MonacoEditor.observedAttributes);
    }

    get monaco() {
        return (window as any).monaco;
    }

    override async vmConnected() {
        if (!this.monaco) {
            await injectScript(document.body, 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs/loader.min.js');
            await appendStylesheet(document.body, styleUrl, { 'data-name': 'vs/editor/editor.main' })
        }

        const template: HTMLTemplateElement = this.vmAppendChild({ tag: 'template' }) as any;
        const container = appendChild(template, {
            tag: 'div', styles: {
                overflow: 'hidden',
                width: '100%',
                height: '100%',
                position: 'absolute',
            }
        });

        const shadowRoot = this.attachShadow({ mode: "open" });

        const style: any = document.querySelector(
            `link[rel='stylesheet'][href='${styleUrl}']`
        );

        if (style) {
            shadowRoot.appendChild(style.cloneNode(true));
        }

        shadowRoot.appendChild(template.content.cloneNode(true));

        this.monaco.editor.create(container, {
            automaticLayout: true,
            language: this.vmAttr('language'),
            value: this.vmAttr('input'),
        });
    }

    override vmDisconnected() { }

    override vmAdopted() { }
}
