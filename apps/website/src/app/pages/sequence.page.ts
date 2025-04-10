import { $div, $h2 } from "@vanilla-mint/dom";
import { Route } from "@vanilla-mint/router";
import { $sequence } from "@vanilla-mint/component-sequence-diagram";

const customer = 'customer';
const amazon = 'amazon';
const driver = 'driver';

export const sequencePage: Route<any, {}>['render'] = () =>
    $div({
        className: 'flex flex-col grow items-stretch justify-stretch border border-solid',
        children: [
            $h2({ className: 'text-lg text-center font-bold', textContent: 'Sequence Diagram' }),
            $div({
                className: 'flex flex-col grow items-stretch justify-stretch border border-solid',

                children: [
                    $sequence({
                        style: {
                            maxHeight: 'calc(100vh - 9.8rem)'
                        },
                        systems: [
                            customer,
                            amazon,
                            driver,
                        ],
                        steps: [
                            { internally: customer, will: 'decide to place an order' },
                            { from: customer, to: amazon, with: 'order', withJson: { things: 'and stuff' } },
                            { internally: amazon, will: 'process the order' },
                            { from: amazon, to: driver, with: 'package' },
                            { from: driver, to: customer, with: 'package' },
                        ],
                    })
                ]
            })
        ],
    });
