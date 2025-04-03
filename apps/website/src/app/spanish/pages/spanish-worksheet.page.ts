import { $div } from "@vanilla-mint/dom";
import { Route } from "@vanilla-mint/router";
import { $landingSection } from "../../components/landing-section.component";
import { infinitives } from "../constants/infinitives.constant";

const sentences = [
    'I speak Spanish.',
    'She sings songs.',
    'They dance salsa.',
    'He works jobs.',
    'We study books.',
    'The dog walks.',
    'You look at monkeys.',
    'Maria listens to music.',
    'The car arrives.',
    'John buys bread.',
    'I call my brother.',
    'They travel a lot.',
    'She helps my mom.',
    'He swims in the pool.',
    'She paints turkeys.',
    'We cook food in the cocina.',
    `Mom doesn't clean.`,
    'You visit places.',
    'He waits for my sister.',
    'They ask questions.',
];
const style = {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '1.2rem',
    padding: '.5rem',
    gap: '.4rem'
} as any;

export const spanishWorksheetRoute = '/spanish-worksheet';
export const spanishWorksheetPage: Route['render'] = () => {
    return $div({
        className: 'grow flex flex-col justify-center items-center gap-16',
        children: [
            $landingSection({
                children: [
                    $div({
                        style: {
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '1rem',
                        },
                        children: [
                            $div({
                                style: {...style, color: 'var(--primary)'},
                                children: Object.entries(infinitives).map(([verbo, verb]) => $div({ textContent: `${verbo} - ${verb}` }))
                            }),
                            $div({
                                style,
                                children: sentences.map((textContent, i) =>
                                    $div({
                                        textContent: `${i + 1}. ${textContent}`
                                    })
                                )
                            })
                        ]
                    })
                ]
            })
        ]
    });
};