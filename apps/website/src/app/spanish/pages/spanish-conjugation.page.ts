import { $div, $option, $select } from "@vanilla-mint/dom";
import { Route } from "@vanilla-mint/router";
import { $conjugationTable } from "../components/conjugation-table.component";
import { $landingSection } from "../../components/landing-section.component";
import { signal } from "@preact/signals-core";
import { infinitives } from "../constants/infinitives.constant";

export const spanishConjugationRoute = '/spanish-conjugation';
export const spanishConjugationPage: Route['render'] = () => {
    const infinitive = signal('');

    return $div({
        className: 'grow flex flex-col justify-center items-center gap-16',
        children: [
            $landingSection({
                children: [
                    $select({
                        name: 'infinitive',
                        style: {
                            fontSize: '2rem',
                            padding: '.5rem',
                        },
                        onchange: (e) => {
                            infinitive.value = (e?.target as any)?.value;
                        },
                        children: Object.entries(infinitives).map(([verbo, verb]) =>
                            $option({
                                value: verbo, textContent: `${verbo} - ${verb}`,
                            }))
                    }),
                    $conjugationTable(infinitive)
                ]
            })
        ]
    });
};