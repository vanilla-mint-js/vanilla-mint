
import { VanillaMint } from '@vanilla-mint/core';

type TAttrs = {
    csv: any;
    'has-header': boolean;
};

const styles = { padding: '0.5rem 1rem', borderBottomStyle: 'solid', borderWidth: '1px' };

export class CsvTable extends VanillaMint<TAttrs> {
    static observedAttributes: Array<keyof TAttrs> = ['csv', 'has-header'];
    static tagName = 'csv-table';

    constructor() {
        super(CsvTable.observedAttributes);
    }

    override async vmConnected() {
        const csv = (this.textContent || '').trim();

        const allLines: string[] = csv.split('\n').map(_ => _.trim()).filter(Boolean);

        if (!allLines.length) {
            this.textContent = `Put the CSV inside the <${CsvTable.tagName}></${CsvTable.tagName}>`;
            return;
        } else {
            this.innerHTML = '';
        }

        const hasHeader = this.vmAttr('has-header');

        this.vmAppendChild({
            tag: 'table',
            styles: { borderCollapse: 'collapse' },
            children: [
                hasHeader && {
                    tag: 'thead',
                    children: [allLines[0]]
                        .map((_, i) => ({
                            tag: 'tr',
                            children: _.split(',').map(_ => _.trim())
                                .map(textContent => ({
                                    tag: 'th',
                                    attrs: { textContent },
                                    styles
                                }))
                        }))
                },
                {
                    tag: 'tbody',
                    children: (hasHeader ? allLines.slice(1) : allLines)
                        .map((_, i) => ({
                            tag: 'tr',
                            children: _.split(',').map(_ => _.trim())
                                .map(textContent => ({
                                    tag: 'td',
                                    attrs: { textContent },
                                    styles,
                                }))
                        }))
                }
            ]
        });
    }

    override vmDisconnected() { }
    override vmAdopted() { }
}
