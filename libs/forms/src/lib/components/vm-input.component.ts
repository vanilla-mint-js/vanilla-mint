import { $div, $input, $label, TElementProps, asId, styleOnFocus, styleOnPointerEnter } from "@vanilla-mint/dom"

export const $vmInput = ({ className, style, placeholder, ...props }: TElementProps<HTMLInputElement>) => {
    const id = asId();

    const _label = $label({
        htmlFor: id, textContent: placeholder || '', style: {
            position: 'absolute',
            left: '0',
            top: '.5rem',
            fontSize: '1rem',
            color: 'inherit',
            transition: 'all 0.3s ease-in-out',
            pointerEvents: 'none',
            opacity: '.6'
        }
    });

    const input = $input({
        ...props,
        id,
        style: {
            width: '100%',
            padding: '.5rem 0',
            fontSize: '1rem',
            border: 'none',
            borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
            backgroundColor: '#dddddd11',
            outline: 'none',
            transition: 'border-bottom-color 0.3s ease-in-out',
            ...style
        }
    });

    styleOnPointerEnter(input, { backgroundColor: 'transparent' });

    styleOnFocus(input, {
        borderBottom: '2px solid #1976d2',
    });

    styleOnFocus(input, {
        top: '-1.25rem',
        color: '#1976d2',
        fontSize: '.75rem',
        opacity: '1',
    }, _label);

    return $div({
        style: {
            position: 'relative',
            margin: '1rem 0',
            width: '100%',
            maxWidth: '20rem',
        },
        children: [
            input,
            _label
        ]
    });
}

