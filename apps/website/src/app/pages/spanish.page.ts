import { $div, $th, $td, $section, $table, TElementProps, $tr, $thead, $tbody } from "@vanilla-mint/dom";
import { Route } from "@vanilla-mint/router";

export const spanishPage: Route['render'] = () =>
    $div({
        className: 'grow flex flex-col justify-center items-center gap-16',
        children: [
            $landingSection({
                children: [
                    // $h2({ textContent: 'AR Verbs', className: 'text-4xl', style: {color: 'var(--primary)'} }),
                    $table({
                        children: [
                            $thead({
                                children: [
                                    $tr({
                                        children: [
                                            $th({ textContent: 'English Subject' }),
                                            $th({ textContent: 'Spanish Subject' }),
                                            $th({ textContent: 'Spanish Ending' }),
                                        ]
                                    }),
                                ]
                            }),
                            $tbody({
                                children: [
                                    ['I', 'yo', 'o'],
                                    ['we (girls only)', 'nosotras', 'amos'],
                                    ['we', 'nosotros', 'amos'],
                                    ['you', 'tú', 'as'],
                                    ['you (fancy)', 'usted', 'a'],
                                    ["y'all", 'ustedes', 'an'],
                                    ['she', 'ella', 'a'],
                                    ['he', 'él', 'a'],
                                    ['they (girls only)', 'ellas', 'an'],
                                    ['they', 'ellos', 'an'],
                                ].map((_) => $tr({ children: _.map((textContent, i) => $td({ textContent, style: {fontWeight: !(i % 2) ? 'bold' : 'normal', color: i === 2 ? 'var(--primary)' : 'inherit'} })) }))
                            })
                        ]
                    })
                ]
            })
        ]
    });


const $landingSection = ({ className, ...props }: TElementProps<HTMLElement>) => $section({
    className: 'w-full grow flex flex-col justify-center items-center gap-16 h-[80vh] ' + (className || ''), ...props
});