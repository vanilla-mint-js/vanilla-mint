import { $div, TElementProps } from "@vanilla-mint/dom";

export const $sequence = (props: TElementProps<HTMLAnchorElement> & { steps: { from: string, to: string, internally?: string }[], systems: string[] }) => {

    function idx(system: string) {
        const index = props.systems.indexOf(system) + 1;
        console.warn({ system, index });
        return index;
    }

    function $step(step: { from: string, to: string }, index: number) {
        const from = idx(step.from);
        const to = idx(step.to);
        const lesser = Math.min(from, to);
        const greater = Math.max(from, to);
        let start: number
        let end: number
        const span = greater - lesser;
        const ltr = (to - from) > 0;
        const internal = from === to;

        if(ltr) {
            start = lesser;
            end = greater;
        } else {
            start = greater - (span - 1);
            end = greater + 1;
        }
        return $div({
            className: 'step',
            textContent: `${JSON.stringify({...step, lesser, greater, start, end, ltr, span}, null, 2)}`,
            style: {
                border: 'solid 1px yellow',
                gridColumnStart: `${start}`,
                gridColumnEnd: `${end}`,
                // gridColumn: `span ${span}`,
                gridRow: `${index + 2}`
            }
        });
    }
    return $div({
        ...props,
        className: 'vm-sequence',
        style: {
            flexGrow: '1',
            display: `grid`,
            gridTemplateColumns: `repeat(${props.steps.length}, 1fr)`,
            gridTemplateRows: `auto`,
            ...props.style
        },
        children: [
            ...props.systems.map((sys, i) => $div({ textContent: sys, style: { backgroundColor: 'hotpink', border: 'solid 1px black', gridColumnStart: `${i + 1}`, gridColumnEnd: `${i + 1}`, gridRow: '1' } })),
            ...props.steps.map((step, stepIndex) => $step(step, stepIndex)),
            ...props.systems.map((sys, i) => $div({ textContent: sys, style: { backgroundColor: 'hotpink', border: 'solid 1px black', gridColumnStart: `${i + 1}`, gridColumnEnd: `${i + 1}`, gridRow: `${props.steps.length + 2}` } })),
        ]
    });

};

