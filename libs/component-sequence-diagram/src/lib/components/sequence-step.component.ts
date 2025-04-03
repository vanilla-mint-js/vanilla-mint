import { IStep } from '../types/i-step.type';
import { $a, $div, $h3, $pre, TElementProps } from "@vanilla-mint/dom";
import { getMessage } from "../functions/get-message.function";
import { getSystemIndex } from "../functions/get-system-index.function";
import { $handoff } from "./handoff.component";
import { colorsReduced } from '../colors.constant';
import { $modal } from "./modal.component";

export const $sequenceStep = ({ step, systems, stepIndex, widthNumeric }: TElementProps<HTMLElement> & { step: IStep, systems: string[], widthNumeric: number, stepIndex: number }) => {
    const { startIndex, endIndex } = getSystemIndex(step, systems);
    const colors = colorsReduced(systems.length);
    const from = startIndex;
    const to = endIndex;
    const isRtl = startIndex > endIndex;
    const ltr = !isRtl;
    const selfDirected = (startIndex === endIndex) || !!(step.internally || step.the);
    const startName = systems[startIndex];
    const endName = systems[endIndex];

    const stepWidthNumeric = ((Math.max(from, to) - Math.min(from, to)) * widthNumeric);

    const stepDiv = $div({
        className: 'vm-step-wrapper',
        style: {
            boxSizing: 'border-box',
            border: `dotted 1px ${colors[from]}`,
            flexGrow: '1',
            paddingBlock: '0.25rem',
            display: 'flex',
        },
        children: [
            $div({
                className: 'vm-step',
                style: {
                    display: 'flex',
                    borderRadius: '4px',
                    minWidth: 0,
                    flexDirection: 'column',
                    position: 'relative',
                    boxSizing: 'border-box',
                    color: '#ffffff99',
                    backgroundColor: colors[from],
                    left: `${((ltr || selfDirected) ? Math.min(from, to) : (to + 1)) * widthNumeric}%`,
                    maxWidth: `${selfDirected ? widthNumeric : stepWidthNumeric}%`,
                    textAlign: ltr ? 'left' : 'right',
                    flexGrow: '1',
                },
                children: [
                    $div({
                        style: {
                        },
                        children: [
                            $div({
                                style: {
                                    color: colors[from],
                                    backgroundColor: '#ffffff99',
                                    padding: '0.4rem',
                                    fontWeight: '700',
                                    borderTopLeftRadius: '4px', borderTopRightRadius: '4px',
                                    fontSize: '1.2rem',
                                    display: 'flex',
                                    flexDirection: isRtl ? 'row' : 'row-reverse',
                                    justifyContent: 'space-between',

                                    alignItems: 'center',
                                },
                                children: [
                                    $handoff({ isRtl, selfDirected }),
                                    $a({ textContent: `${stepIndex + 1}`, id: `${stepIndex + 1}`, href: `${location.pathname || ''}#${stepIndex + 1}`, style: { color: colors[from] } }),
                                    $handoff({ isRtl, selfDirected })
                                ]
                            }),
                            $div({
                                style: {
                                    flexGrow: '1',
                                },
                                children: [
                                    $div({
                                        innerHTML: getMessage(step, startName, endName),
                                        style: {
                                            overflowX: 'scroll',
                                            overflowY: 'hidden',
                                            padding: '0.5rem',
                                            fontSize: '.9rem',
                                            textAlign: selfDirected ? 'center' : (isRtl ? 'right' : 'left'),
                                        }
                                    }),
                                    $div({
                                        style: {
                                            display: 'flex',
                                            flexDirection: isRtl ? 'row' : 'row-reverse',
                                        },
                                        children: [
                                            step.withJson ? $modal({
                                                buttonLabel: 'JSON +',
                                                style: {backgroundColor: colors[from], borderRadius: '4px', padding: '0'},
                                                children: [
                                                    $h3({ innerHTML: `<b>Step ${stepIndex + 1}</b>. ${getMessage(step, startName, endName)}`, style: { padding: '1rem', letterSpacing: '.1rem', color: '#ffffff77' }}),
                                                    $pre({textContent: JSON.stringify(step.withJson, null, 2), style: {backgroundColor: '#ffffff99', textAlign: 'left', padding: '1rem', overflow: 'scroll'}})
                                                ]
                                            }) : null as any
                                        ].filter(Boolean)
                                    })
                                ]
                            }),
                        ],
                    })
                ]
            })
        ]
    });

    return stepDiv;
}