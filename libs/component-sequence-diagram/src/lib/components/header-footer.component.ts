import { $div, TElementProps } from "@vanilla-mint/dom";
import { colorsReduced } from '../colors.constant';

export function $headerFooter({ top, bottom, systems, width, ...props }: TElementProps<HTMLElement> & { top?: any, bottom?: any, systems: string[], width: string } = { systems: [], width: '0' }) {
    const colors = colorsReduced(systems.length);
    return $div({
        ...props,
        className: 'vm-sequence-legend',
        style: {
            position: 'sticky',
            boxSizing: 'border-box',
            display: `flex`,
            flexDirection: 'row',
            ...props.style,
            top,
            bottom,
        },
        children: systems.map((sys, i) =>
            $div({ textContent: sys, style: { backgroundColor: colors[i], fontWeight: '500', width, color: '#ffffff', overflowX: 'scroll', padding: '1rem', flexShrink: '1', textAlign: 'center', display: 'grid', placeItems: 'center' } })
        )
    });
}