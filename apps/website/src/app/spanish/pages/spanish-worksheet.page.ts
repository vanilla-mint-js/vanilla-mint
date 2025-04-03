import { $div } from "@vanilla-mint/dom";
import { Route } from "@vanilla-mint/router";
import { $landingSection } from "../../components/landing-section.component";

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
    'She helps mi mom.',
    'He swims in the pool.',
    'She paints turkeys.',
    'We cook food in the cocina.',
    `Mom doesn't clean.`,
    'You visit places.',
    'He waits for my sister.',
    'They ask questions.',
];

export const spanishWorksheetRoute = '/spanish-worksheet';
export const spanishWorksheetPage: Route['render'] = () => {
    return $div({
        className: 'grow flex flex-col justify-center items-center gap-16',
        children: [
            $landingSection({
                children: [
                    $div({
                        children: sentences.map((textContent, i) =>
                            $div({
                                style: {
                                    display: 'flex',
                                    fontSize: '1.2rem',
                                    padding: '.5rem',
                                },
                                textContent: `${i + 1}. ${textContent}`
                            })
                        )
                    })
                ]
            })
        ]
    });
};