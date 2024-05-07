import { VanillaMint, appendChild, appendStylesheet, injectScript } from "@vanilla-mint/core";

// import * as monaco from 'monaco-editor'
// import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
// import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
// import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
// import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
// import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import * as monaco from 'https://cdn.jsdelivr.net/npm/monaco-editor@0.39.0/+esm';

type TAttrs = {
    input: any;
    language: any;
};

export class MonacoEditor extends VanillaMint<TAttrs> {
    static observedAttributes: Array<keyof TAttrs> = ['input', 'language'];
    static tagName = 'monaco-editor';
    editor!: any; //monaco.editor.IStandaloneCodeEditor;

    get monaco() {
        // return (self as any).monaco;
        return monaco;
    }

    constructor() {
        super(MonacoEditor.observedAttributes);
    }

    override async vmConnected() {

        await appendStylesheet(document.body, 'https://cdn.jsdelivr.net/npm/vscode-codicons@0.0.17/dist/codicon.min.css');
        await appendStylesheet(document.body, 'https://cdn.jsdelivr.net/npm/monaco-editor@0.39.0/min/vs/editor/editor.main.css');

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
        };
    }

    override vmDisconnected() {
        this.editor?.dispose();
    }

    override vmAdopted() { }
}
