import { $div, $form, $input, $label, $option, $select } from '@vanilla-mint/dom';
import { effect, signal } from '@preact/signals-core';
import { TFormFields } from '../types/form-fields.type';
import { TFormLayout } from '../types/form-layout.type';

export function $vmForm<TFormData>({ config, layout, value, onSubmit, onChange }: { config: TFormFields<TFormData>, layout: TFormLayout<TFormData>, value?: TFormData, onChange?: (_: any) => any, onSubmit: (value: TFormData) => any }) {

    const currentValue = signal({} as TFormData);

    function _onChange(change: Partial<TFormData>) {
        currentValue.value = {...currentValue.value, ...change} as TFormData;
    }

    effect(() => {
        onChange?.(currentValue.value);
    });

    function onSubmitProxy() {
        onSubmit(currentValue.value);
    }

    return $div({
        className: 'flex flex-col justify-center items-stretch w-full',
        children: [
            $form({
                // onChange: () => _onChange(),
                className: 'flex flex-col justify-center gap-4 items-stretch',
                onsubmit: onSubmitProxy,
                children: layout.map((row, rowNumber) =>
                    $div({
                        className: 'flex flex-row justify-between items-stretch gap-12',
                        children:
                            row.map((name: any, index: number) => {
                                if (typeof name === 'function') {
                                    return $div({
                                        className: 'flex flex-row items-center',
                                        children: [name(currentValue)]
                                    });
                                }
                                const fieldOptions = config[name as keyof TFormData];
                                const { label, type, validators, options, disabled, className, placeholder } = fieldOptions || {};
                                return $div({
                                    className: 'flex-1',
                                    children: [
                                        (() => {
                                            const id = `${name}-${index}-${Date.now()}`;
                                            switch (type) {
                                                case 'select':
                                                    return $div({
                                                        className: 'relative', children: [
                                                            $vmLabel({ controlId: id, label }),
                                                            $select({
                                                                id, disabled, className: `grow w-full focus:outline-none text-sm py-5 px-4 border border-solid border-light-gray ${disabled ? 'cursor-not-allowed' : 'cursor-default'} ${className || ''}`, name, children:

                                                                    (typeof options === 'function' ? options({}) : options || []).map((option: any, optionIndex: number) => $option({ value: option.value, textContent: option.display }))
                                                            })
                                                        ]
                                                    })

                                                // case 'checkbox':
                                                //         return $div({ className: 'flex flex-row justify-start items-center w-full'})
                                                //             $input({ placeholder={placeholder} disabled={disabled} id={id} className: {`focus:outline-none text-sm py-5 px-4 border border-solid border-light-gray ${disabled ? 'cursor-not-allowed' : 'cursor-default'} ${className || ''}`} type='checkbox' {...form.register(name, { ...validators }}) })
                                                //             $vmLabel({ className: 'px-4 text-sm' htmlFor={id}}){label}})
                                                //         })
                                                //     case 'color':
                                                //         return $div({ className: 'flex flex-col gap-2 justify-between h-full rounded border border-solid border-lighter-gray'})
                                                //             $vmLabel({ htmlFor={id}}){label}})
                                                //             $input({ placeholder={placeholder} id={id} disabled={disabled} autoComplete="off" className: 'mt-4 w-full min-h-[3rem]' type={type} {...form.register(name, { ...validators }}) })
                                                //         })
                                                default:
                                                    return $div({
                                                        className: 'relative', children: [
                                                            $vmLabel({ controlId: id, label }),
                                                            $input({ placeholder, id, autocomplete: "off", className: `grow w-full focus:outline-none text-sm py-5 px-4 border border-solid border-light-gray ${disabled ? 'cursor-not-allowed' : 'cursor-default'}`, type, onchange: (_) => _onChange({[name]: (_.target as any)?.value}  as Partial<TFormData>) })
                                                        ]
                                                    });
                                            }

                                        })()
                                    ]
                                })
                            })
                    })
                )
            })
        ]
    });
    // $div({ className: 'text-xs text-error p-1 h-[1.5rem]'}){form.formState.errors[name] ? <span}){getErrorMessage((form.formState.errors[name] as any), validators})</span}) : ' '}})
}


function $vmLabel({ label, controlId }: { label?: string, controlId: string }) {
    return $label({ className: 'text-sm absolute left-[0.75rem] bg-white px-1 -translate-y-[50%] text-main-light-gray rounded z-10', htmlFor: `${controlId}`, textContent: label });
}