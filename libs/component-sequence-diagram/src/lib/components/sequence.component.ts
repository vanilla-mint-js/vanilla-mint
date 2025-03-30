import { IStep } from '../types/i-step.type';
import { $div, TElementProps } from "@vanilla-mint/dom";
import { $sequenceStep } from "./sequence-step.component";
import { $headerFooter } from "./header-footer.component";

export const $sequence = ({ steps, systems, ...props }: TElementProps<HTMLElement> & { steps: IStep[], systems: string[] }) => {
    const widthNumeric = Math.round((100 / systems.length) * 10_000) / 10_000;
    const width = `${widthNumeric}%`;

    return $div({
        ...props,
        className: 'vm-sequence',
        style: {
            maxHeight: '100vh',
            maxWidth: '100%',
            minWidth: '0',
            boxSizing: 'border-box',
            flexGrow: '1',
            gap: '.25rem',
            display: `flex`,
            flexDirection: 'column',
            ...props.style
        },
        children: [
            $headerFooter({ top: 0, systems, width }),
            $div({
                style: {
                    overflowY: 'scroll',
                    maxWidth: '100%',
                    minWidth: '0',
                    display: 'flex',
                    gap: '.25rem',
                    flexDirection: 'column'
                },
                children: [
                    ...steps.map((step, stepIndex) => $sequenceStep({step, systems, widthNumeric, stepIndex})),
                ]
            }),
            $headerFooter({ bottom: 0, systems, width }),
        ]
    });

};