import { $div, $h2, $p } from "@vanilla-mint/dom";
import { Route } from "@vanilla-mint/router";
import { $vmInput } from "@vanilla-mint/forms";
import { effect, signal } from "@preact/signals-core";
import { $pageSection } from "../components/page-section.component";

const thing = signal('asdf');

effect(() => {
    console.warn({ thingValue: thing.value })
});

export const formsPage: Route['render'] = () => {
    return $div({
        className: 'grow flex flex-col justify-center items-center gap-16',
        children: [
            $pageSection({
                children: [
                    $h2({ textContent: 'Forms', className: 'text-6xl' }),
                    $p({ className: 'text-lg', innerHTML: 'Out-of-the box Material Design with significant customization via CSS variables.' }),
                ]
            }),
            $pageSection({
                className: 'bg-neutral-100', children: [
                    $vmInput({
                        value: thing as any,
                        onchange: (_) => {
                            console.warn({ _ });
                            thing.value = (_.target as any).value;
                        }
                    }),
                    $p({ textContent: thing as any }),
                ]
            })
        ],
    });
}


