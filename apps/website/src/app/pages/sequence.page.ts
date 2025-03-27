import { $div, $h2 } from "@vanilla-mint/dom";
import { Route } from "@vanilla-mint/router";
import { $sequence } from "../components/sequence.component";

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
                        systems: [
                            customer,
                            amazon,
                            driver,
                        ],
                        steps: [
                            // { internally: customer, will: 'think about placing an order' },
                            { from: customer, to: amazon, with: 'order', withJson: {things: 'and stuff'} },
                            // { internally: amazon, will: 'process the order' },
                            { from: amazon, to: driver, with: 'package' },
                            { from: driver, to: customer, with: 'package' },
                        ],
                    })
                ]
            })
        ],
    });
