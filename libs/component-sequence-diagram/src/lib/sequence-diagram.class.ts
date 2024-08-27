import { TElementConfig, VanillaMint, appendChild, appendScript } from '@vanilla-mint/core';
import { IStep } from './types/i-step';
import { createElement } from 'libs/core/src/lib/functions/create-element.function';

type TAttrs = {};

const user = 'User';
const browser = 'Browser';
const server = 'Server';
const db = 'Database';

const colors = [
    'red', 'green', 'navy', 'steelblue'
];

export class SequenceDiagram extends VanillaMint<TAttrs> {
    static observedAttributes: Array<keyof TAttrs> = [];
    static tagName = 'sequence-diagram';

    constructor() {
        super(SequenceDiagram.observedAttributes);
    }

    override async vmConnected() {
        this.render(
            [
                { from: user, to: browser, with: 'URL' },
                { from: browser, to: server, with: 'Request for data' },
                { from: server, to: db, with: 'SQL Query' },
                { from: db, to: server, with: 'Query Result' },
                { internally: server, will: 'filter data by user login state' },
                { from: server, to: browser, with: 'Data to render' },
                { internally: browser, will: 'Create visualizations' },
                { from: browser, to: user, with: 'Visualizations' }
            ],
            [user, browser, db, server],
            false
        );
    }

    override vmDisconnected() { }
    override vmAdopted() { }

    render(steps: IStep[], SYSTEMS: string[], DEBUG: boolean, notes?: string[], risks?: string[]) {
        const colCount = SYSTEMS.length;

        const border = 'solid 1px blue';

        const gridStyles = {
            width: '100%',
            gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
            display: 'grid'
        };

        this.vmSetStyles({
            border,
            width: '100%',
            minHeight: '100vh'
        });

        const header: TElementConfig = {
            tag: 'div',
            children: [
                {
                    tag: 'header',
                    styles: {
                        ...gridStyles
                    },
                    children: SYSTEMS
                        .map(system => ({
                            tag: 'div',
                            children: [{ tag: 'h2', attrs: { textContent: system } }]
                        }))
                }
            ]
        };

        const main: TElementConfig = {
            tag: 'main',
            children: steps
                .map(step => {
                    const startIndex = SYSTEMS.indexOf(step.from || step.internally as string);
                    const endIndex = SYSTEMS.indexOf((step.to  || step.internally as string) as string);
                    const isRtl = startIndex > endIndex;

                    const gridColumnEnd = Math.max(endIndex, startIndex) + (isRtl ? 2 : 1);
                    const gridColumnStart = Math.min(endIndex, startIndex) + 1;
                    const textAlign = startIndex === endIndex ? 'center' : (startIndex < endIndex ? 'left' : 'right');
                    const selfDirected = (startIndex === endIndex) || step.internally;
                    const startName = SYSTEMS[startIndex];
                    const endName = SYSTEMS[endIndex];
                    const _step: TElementConfig = {
                        tag: 'div',
                        styles: {
                            gridColumnStart,
                            gridColumnEnd,
                            textAlign,
                            border,
                            backgroundColor: colors[startIndex]
                        },
                        children: [{ tag: 'h2', attrs: { textContent: step.internally ? step.internally : `${startName} => ${endName}` } }]
                    };

                    return {
                        tag: 'div',
                        styles: {
                            ...gridStyles
                        },
                        children: [_step]
                    } satisfies TElementConfig;
                })
        };

        const gridLines: TElementConfig = {
            tag: 'div',
            styles: {...gridStyles},
            children: new Array(colCount).map(() => ({tag: 'div', styles: {border}}))
        };
        this.vmAppendChild({ ...header, styles: { position: 'sticky', top: 0, } });
        this.vmAppendChild(main);
        this.vmAppendChild({ ...header, styles: { position: 'sticky', bottom: 0, } });
    }
}
