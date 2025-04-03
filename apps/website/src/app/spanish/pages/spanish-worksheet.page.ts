import { $div } from "@vanilla-mint/dom";
import { Route } from "@vanilla-mint/router";
import { $landingSection } from "../../components/landing-section.component";

const sentences = [
    'I speak Spanish.',
    'She sings songs.',
    'They dance salsa.',
    'He works jobs.',
    'We study books.',
    'The dog walks paths.',
    'You look pictures.',
    'Maria listens music.',
    'The bus arrives late.',
    'John buys bread.',
    'I call friends.',
    'They travel countries.',
    'She helps people.',
    'He swims laps.',
    'The artist paints canvases.',
    'We cook meals.',
    'The maid cleans rooms.',
    'You visit places.',
    'He waits trains.',
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