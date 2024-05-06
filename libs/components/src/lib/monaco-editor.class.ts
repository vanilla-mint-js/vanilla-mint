import { VanillaMint } from "@vanilla-mint/core";

import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

type TAttrs = {
    input: any;
    language: any;
};

export class MonacoEditor extends VanillaMint<TAttrs> {
    static observedAttributes: Array<keyof TAttrs> = ['input', 'language'];
    static tagName = 'monaco-editor';
    editor!: monaco.editor.IStandaloneCodeEditor;

    constructor() {
        super(MonacoEditor.observedAttributes);

        if (!self.MonacoEnvironment) {
            self.MonacoEnvironment = {
                getWorker(_, label) {
                    if (label === 'json') { return new jsonWorker(); }
                    if (label === 'css' || label === 'scss' || label === 'less') { return new cssWorker(); }
                    if (label === 'html' || label === 'handlebars' || label === 'razor') { return new htmlWorker(); }
                    if (label === 'typescript' || label === 'javascript') { return new tsWorker(); }
                    return new editorWorker();
                }
            }
        }
    }

    override async vmConnected() {

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

        this.editor = monaco.editor.create(container, this.buildModel());

        this.editor.onDidChangeModelContent(() => {
            if (this.editor) {
                const value = this.editor.getValue()
                this.vmDispatch('onmodelchange', value)
            }
        });

        this.vmOnChangedAttr('input', _ => this.editor?.setValue(_));
        this.vmOnChangedAttr('language', _ => monaco.editor.setModelLanguage(this.editor.getModel() as any, _));

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
