import { VanillaMint, appendScript } from "@vanilla-mint/core";

type TAttrs = {
    input: any;
    language: string;
    theme: string;
};

export class MonacoEditor extends VanillaMint<TAttrs> {
    static observedAttributes: Array<keyof TAttrs> = ['input', 'language', 'theme'];
    static tagName = 'monaco-editor';
    editor!: any;

    get monaco() {
        return (self as any).monaco;
    }

    constructor() {
        super(MonacoEditor.observedAttributes);
    }

    override async vmConnected() {
        await appendScript(document.body, 'https://unpkg.com/monaco-editor@latest/min/vs/loader.js');
        (require as any).config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@latest/min/vs' } });

        (self as any).MonacoEnvironment = {
            getWorkerUrl: function (workerId: any, label: any) {
                return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
        self.MonacoEnvironment = {
          baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
        };
        importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');`
                )}`;
            }
        };

        await new Promise(res => (require as any)(["vs/editor/editor.main"], res as any));

        this.vmSetStyles({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'justify-stretch',
            width: '100%',
            height: '100%',
            position: 'relative'
        });

        const container = this.vmAppendChild({
            tag: 'div', styles: {
                width: '100%',
                height: '100%',
                top: '0',
                left: '0',
                position: 'absolute',
            }
        });
        this.editor = this.monaco.editor.create(container, this.buildModel());

        this.editor.onDidChangeModelContent(() => {
            if (this.editor) {
                const value = this.editor.getValue()
                this.vmDispatch('onmodelchange', value)
            }
        });

        this.vmOnChangedAttr('input', _ => this.editor?.setValue(_));
        this.vmOnChangedAttr('language', _ => this.monaco.editor.setModelLanguage(this.editor.getModel() as any, _));


        return this.editor;
    }

    buildModel() {
        return {
            value: this.vmAttr('input'),
            language: this.vmAttr('language'),
            automaticLayout: true,
            theme: this.vmAttr('theme'),
        };
    }

    override vmDisconnected() {
        this.editor?.dispose?.();
    }

    override vmAdopted() { }
}
