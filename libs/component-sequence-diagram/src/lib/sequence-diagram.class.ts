import { TElementConfig, VanillaMint, appendChild, appendScript, createElement, div } from '@vanilla-mint/core';
import { IStep } from './types/i-step';

type TAttrs = {};

const user = 'User';
const browser = 'Browser';
const server = 'Server';
const db = 'Database';

const colors = [
    'red', 'green', 'navy', 'steelblue'
];

const gap = '0.4rem'
const frost = 'rgba(255, 255, 255, 0.8)';

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
                { from: browser, to: user, withJson: { lee: 'Norris' } },
                { from: user, to: browser, withJson: { erica: 'Norris' } }
            ],
            [user, browser, db, server],
            false
        );
    }

    override vmDisconnected() { }
    override vmAdopted() { }

    render(steps: IStep[], SYSTEMS: string[], DEBUG: boolean, notes?: string[], risks?: string[]) {
        const rightArrowHtmlEntity = () => { const el = createElement({ tag: 'div', styles: { fontSize: '1.8rem' } }); el.innerHTML = '&rarr;'; return el; };
        const leftArrowHtmlEntity = () => { const el = createElement({ tag: 'div', styles: { fontSize: '1.8rem' } }); el.innerHTML = '&larr;'; return el; };

        const colCount = SYSTEMS.length;

        const gridStyles = {
            width: '100%',
            gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
            display: 'grid',
            gap
        };

        this.vmSetStyles({
            width: '100%',
            minHeight: '100vh',
            position: 'relative',
            backgroundColor: '#000000',
            fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
        });

        const header: TElementConfig = {
            tag: 'div',
            children: [
                {
                    tag: 'header',
                    styles: {
                        ...gridStyles,
                        color: frost,
                    },
                    children: SYSTEMS
                        .map((system, index) => ({
                            tag: 'div',
                            children: [
                                {
                                    tag: 'div',
                                    attrs: { textContent: system },
                                    styles: {
                                        textAlign: 'center',
                                        backgroundColor: colors[index],
                                        padding: '1.2rem 0',
                                        fontSize: '1.4rem',
                                        border: `solid 2px ${frost}`,
                                    }
                                }
                            ]
                        }))
                }
            ]
        };

        const main: TElementConfig = {
            tag: 'div',
            styles: {
                display: 'flex',
                flexDirection: 'column',
                gap
            },
            children: steps
                .map((rawStep, stepNumber) => {
                    const step: IStep = rawStep.internally ? { ...rawStep, from: rawStep.internally, to: rawStep.internally } : rawStep;
                    const startIndex = SYSTEMS.indexOf(step.from || step.internally as string);
                    const endIndex = SYSTEMS.indexOf((step.to || step.internally as string) as string);
                    const isRtl = startIndex > endIndex;

                    const gridColumnEnd = Math.max(endIndex, startIndex) + (isRtl ? 2 : 1);
                    const gridColumnStart = Math.min(endIndex, startIndex) + (isRtl ? 2 : 1);
                    const textAlign = startIndex === endIndex ? 'center' : (startIndex < endIndex ? 'left' : 'right');
                    const selfDirected = (startIndex === endIndex) || step.internally;
                    const startName = SYSTEMS[startIndex];
                    const endName = SYSTEMS[endIndex];

                    const handoff = div({
                        styles: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: isRtl ? 'flex-start' : 'flex-end' },
                        children: [
                            !selfDirected && (isRtl ? leftArrowHtmlEntity() : rightArrowHtmlEntity())
                        ]
                    });

                    const _step: TElementConfig = {
                        tag: 'div',
                        styles: {
                            gridColumnStart,
                            gridColumnEnd,
                            textAlign,
                            position: 'relative',
                            backgroundColor: colors[startIndex],
                            width: '100%',
                            display: 'flex',
                            gap,
                            justifyItems: 'space-between',
                            flexDirection: isRtl ? 'row-reverse' : 'row',
                            alignItems: 'stretch',
                            color: frost
                        },
                        children: [
                            div({
                                styles: { display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' },
                                children: [
                                    div({
                                        styles: { backgroundColor: frost, color: colors[startIndex], padding: '.25rem', fontSize: '1.4rem', flexGrow: 1, fontWeight: 'bold' },
                                        attrs: { textContent: (stepNumber + 1).toString() }
                                    }),
                                ]
                            }),
                            {
                                tag: 'div',
                                attrs: {
                                    textContent: getMessage(step, startName, endName)
                                    // textContent: step.internally ? step.internally : `${startName} => ${endName}`
                                },
                                styles: {
                                    flexGrow: '1'
                                }
                            },
                            handoff
                        ]
                    };

                    if (step.withJson) {
                        const element = document.createElement('j-son');
                        element.setAttribute('stringified', JSON.stringify(step.withJson, null, 2));
                        element.setAttribute('heading', `${stepNumber}. ${getMessage(step, startName, endName)}`);
                        handoff.children!.push(element);
                    } else if (step.with) {
                        handoff.children!.push(
                            div({
                                styles: {
                                    backgroundColor: frost,
                                    color: colors[startIndex],
                                    textAlign: isRtl ? 'left' : 'right'
                                },
                                attrs: {
                                    textContent: getWith(step) as any
                                }
                            })
                        );
                    }

                    return {
                        tag: 'div',
                        styles: {
                            ...gridStyles
                        },
                        children: [_step]
                    } satisfies TElementConfig;
                })
        };

        const content: TElementConfig = {
            tag: 'div',
            styles: {
                width: '100%',
                minHeight: '100vh',
                position: 'relative',
                zIndex: 10000,
            },
            children: [
                { ...header, styles: { zIndex: 10000, position: 'sticky', top: 0, } },
                main,
                { ...header, styles: { zIndex: 10000, position: 'sticky', bottom: 0, } },
            ]
        };

        const gridLines: TElementConfig = {
            tag: 'section',
            styles: { ...gridStyles, position: 'absolute', minHeight: '100vh', width: '100%' },
            children: new Array(colCount).fill(0).map((_, index) => ({ tag: 'section', styles: { border: `solid 2px ${colors[index]}` } }))
        };

        this.vmAppendChild(gridLines);
        this.vmAppendChild(content);
    }
}

function getWith(step: IStep) {
    if (step.withJson) {
        return 'JSON';
    }
    if ((step?.with as any)?.join) {
        return `{${(step.with as any).join(', ')}}`;
    }

    return step.with || 'JSON';
}

function getMessage(step: IStep, startName: string, endName: string) {
    if (step.internally) {
        return `${step.internally} will ${step.will || step.because}`;
    }

    const transmission = getWith(step);
    const defaultMessage = `${startName} transmits ${typeof transmission === 'string' ? transmission : JSON.stringify(transmission, null, 2)} to ${endName}`;

    return step.because || step['viaUrl'] || defaultMessage;
}
