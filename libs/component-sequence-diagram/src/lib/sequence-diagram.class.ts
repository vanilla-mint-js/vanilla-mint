import { TElementConfig, VanillaMint, appendChild, appendScript, createElement, div } from '@vanilla-mint/core';
import { IStep } from './types/i-step.type';
import { colors } from './colors.constant';
import { filter, tap } from 'rxjs';

type TAttrs = { steps: IStep[], systems: string[] };

const gap = '0.4rem'
const frost = 'rgba(255, 255, 255, 0.8)';
const padding = '.25rem';

export class SequenceDiagram extends VanillaMint<TAttrs> {
    static observedAttributes: Array<keyof TAttrs> = ['steps', 'systems'];
    static tagName = 'sequence-diagram';

    constructor() {
        super(SequenceDiagram.observedAttributes);
    }

    override async vmConnected() {
        this.vmSubscribe(this.vmObserveAttrs(['steps', 'systems'])
            .pipe(
                filter(([steps, systems]) => steps && systems),
                tap(([steps, systems]) => {
                    this.render(
                        JSON.parse(steps),
                        JSON.parse(systems),
                    );
                })));
    }

    override vmDisconnected() { }
    override vmAdopted() { }

    render(steps: IStep[], SYSTEMS: string[]) {
        // TODO: replace these entity invocations w/ vm* api
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

        const header = div({
            children: [
                {
                    tag: 'header',
                    styles: {
                        ...gridStyles,
                        color: frost,
                        zIndex: 10000,
                        fontWeight: 'bold',
                        position: 'sticky'
                    },
                    children: SYSTEMS
                        .map((system, index) => div({
                            children: [
                                {
                                    tag: 'div',
                                    attrs: { textContent: system },
                                    styles: {
                                        textAlign: 'center',
                                        color: colors[index],
                                        backgroundColor: frost,
                                        padding: '1.2rem 0',
                                        fontSize: '1.4rem',
                                    }
                                }
                            ]
                        }))
                }
            ]
        });

        this.vmAppendChild(div({
            styles: { ...gridStyles, position: 'absolute', minHeight: '100vh', width: '100%' },
            children: new Array(colCount).fill(0).map((_, index) => div({ styles: { border: `solid 2px ${colors[index]}` } }))
        }));

        this.vmAppendChild(div({
            styles: {
                width: '100%',
                minHeight: '100vh',
                position: 'relative',
                zIndex: 10000,
                display: 'flex',
                flexDirection: 'column',
                gap
            },
            children: [
                { ...header, styles: { ...header.styles, top: 0, } },
                div({
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
                                styles: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: isRtl ? 'flex-start' : 'flex-end',
                                    left: isRtl && '-1rem',
                                    right: !isRtl && '-1rem',
                                    position: 'relative'
                                },
                                children: [
                                    !selfDirected && (isRtl ? leftArrowHtmlEntity() : rightArrowHtmlEntity())
                                ]
                            });

                            const _step: TElementConfig = div({
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
                                                styles: { backgroundColor: frost, color: colors[startIndex], padding, fontSize: '1.4rem', flexGrow: 1, fontWeight: 'bold' },
                                                attrs: { textContent: (stepNumber + 1).toString() }
                                            }),
                                        ]
                                    }),
                                    div({
                                        attrs: {
                                            textContent: getMessage(step, startName, endName)
                                        },
                                        styles: {
                                            flexGrow: '1',
                                            alignItems: 'center',
                                            ...(step.internally
                                                ? { display: 'flex', justifyContent: 'center' }
                                                : {}
                                            ),
                                        }
                                    }),
                                    handoff
                                ]
                            });

                            if (step.withJson) {
                                // TODO: make this use vm* api instead of native api
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
                                            textAlign: isRtl ? 'left' : 'right',
                                            padding,
                                            border: `solid 1px ${colors[startIndex]}`
                                        },
                                        attrs: {
                                            textContent: getWith(step) as any
                                        }
                                    })
                                );
                            }

                            return div({
                                styles: {
                                    ...gridStyles
                                },
                                children: [_step]
                            });
                        })
                }),
                { ...header, styles: { ...header.styles, bottom: 0, } },
            ]
        }));
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

    if(step.because && (step.with || step.withJson)) {
        return `${defaultMessage} because ${step.because}`;
    }

    return step.because || step['viaUrl'] || defaultMessage;
}
