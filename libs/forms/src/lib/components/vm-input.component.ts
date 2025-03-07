import { $div, $input, $label, TElementProps, asId } from "@vanilla-mint/dom"

export const $vmInput = ({ className, style, placeholder, ...props }: TElementProps<HTMLInputElement>) => {
    const id = asId();

    const _label = $label({ htmlFor: id, textContent: 'placeholder', style: {
        position: 'absolute',
        left: '0',
        top: '.5rem',
        fontSize: '1rem',
        color: 'inherit',
        transition: 'all 0.3s ease-in-out',
        pointerEvents: 'none',
        opacity: '.6'
    } });

    const input = $input({
        ...props,
        id,
        style: {
            width: '100%',
            padding: '.5rem 0',
            fontSize: '1rem',
            border: 'none',
            borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
            background: 'transparent',
            outline: 'none',
            transition: 'border-bottom-color 0.3s ease-in-out',
            ...style
        }
    });

    input.addEventListener('pointerenter', () => {
        input.style.backgroundColor = 'blue';
        console.log('Pointer entered!');
      });

      input.addEventListener('pointerleave', () => {
        input.style.backgroundColor = 'white';
        console.log('Pointer left!');
      });

    input.addEventListener('focus', () => {
        input.style.borderBottom = '2px solid #1976d2';
        _label.style.fontSize = '.75rem';
        _label.style.top = '-1.25rem';
        _label.style.color = '#1976d2';
        _label.style.opacity = '1';
    });
    input.addEventListener('blur', () => {
        input.style.borderBottom = '1px solid rgba(0, 0, 0, 0.42)';
        if(!input.value) {
            _label.style.fontSize = '1rem';
            _label.style.top = '.5rem';
            _label.style.color = 'inherit';
            _label.style.opacity = '.6';
        }
    });

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


// .material-input:focus + .material-label, .material-input:not(:placeholder-shown) + .material-label {
//     top: -20px;
//     font - size: 12px;
//     color: #1976d2; /* Matches focus border color */
// }

// .material - helper - text {
//     font - size: 12px;
//     color: rgba(0, 0, 0, 0.54);
//     margin - top: 4px;
// }


// .material - input.error {
//     border - bottom: 2px solid #d32f2f; /* Material UI error color */
// }

// .material - input.error + .material - label {
//     color: #d32f2f;
// }