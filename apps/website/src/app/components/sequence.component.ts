import { $div, TElementProps } from "@vanilla-mint/dom";

export interface IStep {
    with?: string | string[];
    from?: string;
    to?: string;
    internally?: string;
    the?: string;
    because?: string;
    will?: string;
    withJson?: object;
    if?: string;
}

export const $sequence = (props: TElementProps<HTMLElement> & { steps: IStep[], systems: string[] }) => {
    const widthNumeric = Math.round((100 / props.steps.length) * 10_000) / 10_000;
    const width = `${widthNumeric}%`;

    function idx(step: IStep) {
        const startIndex = props.systems.indexOf(step.from || (step.internally || step.the) as string);
        const endIndex = props.systems.indexOf((step.to || (step.internally || step.the) as string) as string);

        return { startIndex, endIndex }

    }

    function $headerFooter(headerFooterProps: TElementProps<HTMLElement> = {}) {
        return $div({
            ...headerFooterProps,
            className: 'vm-sequence-legend',
            style: {
                // flexGrow: '1',
                boxSizing: 'border-box',
                display: `flex`,
                flexDirection: 'row',
                ...headerFooterProps.style
            },
            children: props.systems.map((sys, i) =>
                $div({ textContent: sys, style: { backgroundColor: 'hotpink', width, border: 'solid 1px black', flexShrink: '1' } })
            )
        });

    }

    function $step(step: IStep, index: number) {
        const { startIndex, endIndex } = idx(step);
        const from = startIndex;
        const to = endIndex;
        const isRtl = startIndex > endIndex;
        const ltr = !isRtl;
        const selfDirected = (startIndex === endIndex) || !!(step.internally || step.the);
        const startName = props.systems[startIndex];
        const endName = props.systems[endIndex];

        const paddingLeftNumeric = (ltr || selfDirected) ? from * widthNumeric : to * widthNumeric;

        const stepWidthNumeric = ((Math.max(from, to) - Math.min(from, to)) * widthNumeric);

        return $div({
            className: 'vm-step-wrapper',
            style: {
                boxSizing: 'border-box',
                border: 'solid 1px red',

                flexGrow: '1',
                display: 'flex',
                ...((ltr && !selfDirected) ? { paddingLeft: `${paddingLeftNumeric}%`, paddingRight: `${100 - stepWidthNumeric - paddingLeftNumeric}%` } : {}),
                ...((isRtl && !selfDirected) ?  { paddingRight: `${paddingLeftNumeric}%`, paddingLeft: `${100 - stepWidthNumeric - paddingLeftNumeric}%` } : {}),
                // ...(selfDirected ? { paddingLeft: `${paddingLeftNumeric}%`, paddingRight: `${100 - widthNumeric - paddingLeftNumeric}%` } : {}),
            },
            children: [
                $div({
                    className: 'vm-step',
                    textContent: getMessage(step, startName, endName) + ` ${selfDirected} ${ltr} ${isRtl} ${from} ${to}`,
                    style: {
                        position: 'relative',
                        boxSizing: 'border-box',
                        // width: `${selfDirected ? widthNumeric : stepWidthNumeric}%`,
                        maxWidth: `${selfDirected ? widthNumeric : stepWidthNumeric}%`,
                        border: 'solid 1px yellow',
                        textAlign: ltr ? 'left' : 'right',
                        flexGrow: '1'
                    },
                    children: [
                        $handoff({ isRtl, selfDirected })
                    ]
                })
            ]
        });
    }

    const rightArrowHtmlEntity = () => $div({ className: 'vm-sequence-step-arrow', style: { fontSize: '1.8rem', }, innerHTML: '&rarr;' });
    const leftArrowHtmlEntity = () => $div({ className: 'vm-sequence-step-arrow', style: { fontSize: '1.8rem', }, innerHTML: '&larr;' });


    function $handoff({ isRtl, selfDirected }: { isRtl: boolean, selfDirected: boolean }) {
        return $div({
            className: 'handoff',
            style: {
                display: 'flex',
                flexDirection: isRtl ? 'row' : 'row-reverse',
                flexGrow: '1',
                justifyContent: isRtl ? 'flex-start' : 'flex-end',
                alignItems: 'center',
                left: isRtl ? '-1rem' : undefined,
                right: isRtl ? undefined : '-1rem',
                position: 'absolute',
                height: '1rem',
                width: '1rem',
            },
            children: !selfDirected ? [isRtl ? leftArrowHtmlEntity() : rightArrowHtmlEntity()] : []
        });
    }

    return $div({
        ...props,
        className: 'vm-sequence',
        style: {
            boxSizing: 'border-box',
            flexGrow: '1',
            display: `flex`,
            flexDirection: 'column',
            ...props.style
        },
        children: [
            $headerFooter(),
            ...props.steps.map((step, stepIndex) => $step(step, stepIndex)),
            // ...props.systems.map((sys, i) => $div({ textContent: sys, style: { backgroundColor: 'hotpink', border: 'solid 1px black', gridColumnStart: `${i + 1}`, gridColumnEnd: `${i + 1}`, gridRow: `${props.steps.length + 2}` } })),
            $headerFooter(),
        ]
    });

};


function getWith(step: IStep) {
    if ((step?.with as any)?.join) {
        return `[${(step.with as any).join(', ')}]`;
    }

    if ((step?.with as any)) {
        return `${(step.with as any)}`;
    }

    if ((step?.withJson as any)) {
        return 'JSON';
    }

    return 'data';
}

function getMessage(step: IStep, startName: string, endName: string): string {
    if (step.internally || step.the) {
        return `${step.internally || step.the} will ${step.will || step.because}`;
    }

    const transmission = getWith(step);
    const defaultMessage = `${startName} transmits ${typeof transmission === 'string' ? transmission : JSON.stringify(transmission, null, 2)} to ${endName}`;

    if (step.because && (step.with || step.withJson)) {
        return `${defaultMessage} because ${step.because}`;
    }

    return step.because || defaultMessage;
}
