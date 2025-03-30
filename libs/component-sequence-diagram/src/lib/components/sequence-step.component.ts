import { IStep } from '../types/i-step.type';
import { $a, $div, $h3, $pre, TElementProps } from "@vanilla-mint/dom";
import { getMessage } from "../functions/get-message.function";
import { getSystemIndex } from "../functions/get-system-index.function";
import { $handoff } from "./handoff.component";
import { colors } from '../colors.constant';
import { $modal } from "./modal.component";

export const $sequenceStep = ({ step, systems, stepIndex, widthNumeric, ...props }: TElementProps<HTMLElement> & { step: IStep, systems: string[], widthNumeric: number, stepIndex: number }) => {
    let open = false;
    const { startIndex, endIndex } = getSystemIndex(step, systems);
    const from = startIndex;
    const to = endIndex;
    const isRtl = startIndex > endIndex;
    const ltr = !isRtl;
    const selfDirected = (startIndex === endIndex) || !!(step.internally || step.the);
    const startName = systems[startIndex];
    const endName = systems[endIndex];

    const stepWidthNumeric = ((Math.max(from, to) - Math.min(from, to)) * widthNumeric);

    console.warn({ stepWidthNumeric, step })

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
                    flexDirection: isRtl ? 'row' : 'row-reverse',
                    minWidth: 0,
                    position: 'relative',
                    boxSizing: 'border-box',
                    color: '#ffffff99',
                    backgroundColor: colors[from],
                    left: `${((ltr || selfDirected) ? Math.min(from, to) : (to + 1)) * widthNumeric}%`,
                    maxWidth: `${selfDirected ? widthNumeric : stepWidthNumeric}%`,
                    textAlign: ltr ? 'left' : 'right',
                    flexGrow: '1',
                    // clipPath: selfDirected ? undefined : (
                    //     ltr ?
                    //     'polygon(0 0, 100% 0, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 0 100%)' :
                    //     'polygon(0 0, 100% 0, 100% 100%, 1rem 100%, 0 calc(100% - 1rem))'
                    // )
                },
                children: [
                    $div({
                        style: {
                            color: colors[from],
                            backgroundColor: '#ffffff99',
                            padding: '0.5rem',
                            fontWeight: '700',
                            fontSize: '1.2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            ...(isRtl ? { borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px' } : { borderTopRightRadius: '4px', borderBottomRightRadius: '4px' }),
                            alignItems: 'center',
                        },
                        children: [
                            $a({ textContent: `${stepIndex + 1}`, id: `${stepIndex + 1}`, href: `${location.pathname || ''}#${stepIndex + 1}`, style: { color: colors[from] } }),
                            $handoff({ isRtl, selfDirected })
                        ]
                    }),
                    $div({
                        children: [
                            $div({
                                innerHTML: getMessage(step, startName, endName),
                                style: {
                                    padding: '0.5rem',
                                    fontSize: '.9rem',
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
                                            $h3({innerHTML: `<b>Step ${stepIndex + 1}</b>. ${getMessage(step, startName, endName)}`, style: { padding: '1rem', letterSpacing: '.1rem' }}),
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
    });

    return stepDiv;
}