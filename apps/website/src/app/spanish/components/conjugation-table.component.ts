import { effect } from "@preact/signals-core";
import { $table, $tbody, $td, $tr } from "@vanilla-mint/dom";

const things = [
    { pronoun: 'I', pronombre: 'yo', ending: 'o' },
    { pronoun: 'we (girls only)', pronombre: 'nosotras', ending: 'amos' },
    { pronoun: 'we', pronombre: 'nosotros', ending: 'amos' },
    { pronoun: 'you', pronombre: 'tú', ending: 'as' },
    { pronoun: 'you (fancy)', pronombre: 'usted', ending: 'a' },
    { pronoun: "y'all", pronombre: 'ustedes', ending: 'an' },
    { pronoun: 'she', pronombre: 'ella', ending: 'a' },
    { pronoun: 'he', pronombre: 'él', ending: 'a' },
    { pronoun: 'they (girls only)', pronombre: 'ellas', ending: 'an' },
    { pronoun: 'they', pronombre: 'ellos', ending: 'an' },
];

export function $conjugationTable(infinitive: { value?: string }): HTMLElement {
    let tbodyRef = $tbody({
        children: [

        ]
    });

    effect(() => {
        tbodyRef.replaceChildren(
            ...things.map(({ pronombre, pronoun, ending }) =>
                $tr({
                    children: [
                        $td({ textContent: pronoun, style: { fontWeight: 'bold', color: 'var(--primary)' } }),
                        $td({ textContent: pronombre, style: { fontWeight: 'bold', color: 'var(--primary)' } }),
                        $td({ textContent: ending, style: { fontWeight: 'bold', color: 'var(--primary)' } }),
                        infinitive.value ? $td({ textContent: infinitive.value.replace('ar', ending), style: { fontWeight: 'bold', color: 'var(--accent)' } }) : undefined as any,
                    ].filter(Boolean)
                })
            )
        );
    });

    return $table({
        children: [
            tbodyRef
        ]
    });
}
