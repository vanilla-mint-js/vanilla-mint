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
        const rightArrowHtmlEntity = () => { const el = createElement({ tag: 'div', styles: { fontSize: '1.8rem', } }); el.innerHTML = '&rarr;'; return el; };
        const leftArrowHtmlEntity = () => { const el = createElement({ tag: 'div', styles: { fontSize: '1.8rem', } }); el.innerHTML = '&larr;'; return el; };

        const colCount = SYSTEMS.length;

        const gridStyles = {
            width: '100%',
            gridTemplateColumns: `repeat(${colCount}, 1fr)`,
            display: 'grid',
            gap
        };

        this.vmSetStyles({
            width: '100%',
            minHeight: '100vh',
            maxHeight: '100vh',
            overflowY: 'scroll',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#000000',
            fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
        });

        const header = div({
            children: [
                div({
                    styles: {
                        ...gridStyles,
                        color: frost,
                        zIndex: 1000,
                        fontWeight: 'bold',
                        position: 'fixed'
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
                                        padding: '.2rem 0',
                                        fontSize: '1.2rem',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }
                                }
                            ]
                        }))
                })
            ]
        });

        this.vmAppendChild(div({
            styles: { ...gridStyles, position: 'absolute', minHeight: '100vh', width: '100%' },
            children: new Array(colCount).fill(0).map((_, index) => div({ styles: { border: `solid 2px ${colors[index]}` } }))
        }));

        this.vmAppendChild(div({
            styles: {
                width: '100%',
                position: 'relative',
                zIndex: 10000,
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                overflowY: 'scroll',
                gap
            },
            children: [
                { ...header, styles: { ...header.styles, top: 0, } },
                { ...header, styles: { ...header.styles, bottom: '40px', position: 'fixed', zIndex: 10000, } },
                div({
                    styles: {
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '3rem 0',
                        gap
                    },
                    children: steps
                        .filter(step => !('if' in step) || !!step.if)
                        .map((rawStep, stepNumber) => {
                            const step: IStep = (rawStep.internally || rawStep.the) ? { ...rawStep, from: (rawStep.internally || rawStep.the), to: (rawStep.internally || rawStep.the) } : rawStep;
                            const startIndex = SYSTEMS.indexOf(step.from || (step.internally || step.the) as string);
                            const endIndex = SYSTEMS.indexOf((step.to || (step.internally || step.the) as string) as string);
                            const isRtl = startIndex > endIndex;

                            const gridColumnEnd = Math.max(endIndex, startIndex) + (isRtl ? 2 : 1);
                            const gridColumnStart = Math.min(endIndex, startIndex) + (isRtl ? 2 : 1);
                            const textAlign = startIndex === endIndex ? 'center' : (startIndex < endIndex ? 'left' : 'right');
                            const selfDirected = (startIndex === endIndex) || (step.internally || step.the);
                            const startName = SYSTEMS[startIndex];
                            const endName = SYSTEMS[endIndex];

                            const handoff = div({
                                classList: 'handoff',
                                styles: {
                                    display: 'flex',
                                    flexDirection: isRtl ? 'row' : 'row-reverse',
                                    flexGrow: '1',
                                    justifyContent: isRtl ? 'flex-start' : 'flex-end',
                                    alignItems: 'center',
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
                                                children: [
                                                    createElement({
                                                        tag: 'a',
                                                        styles: { backgroundColor: frost, color: colors[startIndex], padding, fontSize: '1.4rem', flexGrow: 1, fontWeight: 'bold' },
                                                        attrs: { id: `${stepNumber + 1}`, href: `#${stepNumber + 1}`, textContent: (stepNumber + 1).toString() },
                                                    })
                                                ]
                                            }),
                                        ]
                                    }),
                                    div({
                                        styles: { display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', flexGrow: '1' },
                                        children: [
                                            div({
                                                attrs: {
                                                    textContent: getMessage(step, startName, endName)
                                                },
                                                styles: {
                                                    flexGrow: '1',
                                                    alignItems: 'center',
                                                    ...((step.internally || step.the)
                                                        ? { display: 'flex', justifyContent: 'center' }
                                                        : {}
                                                    ),
                                                }
                                            }),
                                            handoff
                                        ]
                                    }),
                                ]
                            });

                            if (step.withJson) {
                                // TODO: make this use vm* api instead of native api
                                const element = document.createElement('j-son');
                                element.style.flexGrow = '1';
                                element.style.alignSelf = 'flex-end'; // don't think this is needed
                                element.setAttribute('stringified', JSON.stringify(step.withJson, null, 2));
                                element.setAttribute('heading', `${stepNumber + 1}. ${getMessage(step, startName, endName)}`);
                                handoff.children!.push(element);
                            } else if (step.with) {
                                handoff.children!.push(
                                    div({
                                        styles: {
                                            backgroundColor: frost,
                                            color: colors[startIndex],
                                            textAlign: isRtl ? 'left' : 'right',
                                            padding,
                                            flexGrow: 1,
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
            ]
        }));
    }
}

function getWith(step: IStep) {
    if ((step?.with as any)?.join) {
        return `[${(step.with as any).join(', ')}]`;
    }

    if ((step?.with as any)) {
        return `${(step.with as any)}`;
    }

    return 'JSON';
}

function getMessage(step: IStep, startName: string, endName: string) {
    if (step.internally || step.the) {
        return `${step.internally || step.the} will ${step.will || step.because}`;
    }

    const transmission = getWith(step);
    const defaultMessage = `${startName} transmits ${typeof transmission === 'string' ? transmission : JSON.stringify(transmission, null, 2)} to ${endName}`;

    if (step.because && (step.with || step.withJson)) {
        return `${defaultMessage} because ${step.because}`;
    }

    return step.because || step['viaUrl'] || defaultMessage;
}
