import { $div, $h2 } from "@vanilla-mint/dom";
import { Route } from "@vanilla-mint/router";

export const notesPage: Route<any, { notes: Array<{ description: string, title: string }> }>['render'] = ({ data }) =>
    $div({
        className: 'flex flex-col justify-center items-center grow gap-16',
        children: [
            $h2({ className: 'text-lg text-center font-bold', textContent: 'API integration demo using $router loader' }),
            $div({
                className: 'p-4 flex flex-row flex-wrap gap-8',
                children: [
                    ...data!.notes.map((note) =>
                        $div({
                            className: 'border border-primary rounded p-4',
                            children: [
                                $div({ className: 'font-bold', textContent: note.title }),
                                $div({ textContent: note.description }),
                            ]
                        })
                    )
                ]
            })
        ],
    });
