import { $div, $input, $label, TElementProps, asId, styleOnFocus, styleOnPointerEnter, styled } from "@vanilla-mint/dom"

const $vmInputRaw = (props: TElementProps<HTMLInputElement>) => {
    const { className, style, placeholder, ...remaining } = props;
    console.warn({ props, placeholder })
    const id = asId();

    const _label = $label({ htmlFor: id, textContent: 'placeholder', className: 'material-label' });

    const input = $input({ ...remaining, id, className: 'material-input', placeholder: ' ' });

    return $div({
        className: (props.className || ''),
        children: [
            $div({
                className: 'material-input-container',
                children: [
                    input,
                    _label
                ]
            })
        ]
    });
};
export const $vmInputasdf = $vmInputRaw;
export const $vmInput = styled($vmInputRaw as any)`
.material-input-container {
    position: relative;
    margin: 1rem 0;
    width: 100%;
    max-width: 20rem;
}

.material-input {
    width: 100%;
    padding: .5rem 0;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    background: transparent;
    outline: none;
    transition: border-bottom-color 0.2s ease-in-out;
}

.material-input:focus {
    border-bottom: 2px solid #1976d2;
}

.material-label {
    position: absolute;
    left: 0;
    top: .5rem;
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.42);
    transition: all 0.2s ease-in-out;
    pointer-events: none;
}

.material-input:focus + .material-label,
.material-input:not(:placeholder-shown) + .material-label {
    top: -1.25rem;
    font-size: .75rem;
    color: #1976d2;
}

.material-helper-text {
    font-size: .75rem;
    color: rgba(0, 0, 0, 0.54);
    margin-top: .25rem;
}

.material-input.error {
    border-bottom: 2px solid #d32f2f;
}

.material-input.error + .material-label {
    color: #d32f2f;
}`;


export const $vmInputNoCss = ({ className, style, placeholder, ...props }: TElementProps<HTMLInputElement>) => {
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

