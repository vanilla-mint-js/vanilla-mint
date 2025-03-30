import { $button, $dialog, $div } from "@vanilla-mint/dom"

export const $modal = ({ children, buttonLabel, style }: any) => {
    const dialog = $dialog({ style, children: [$button({ style: {padding: '1rem', fontWeight: 700}, textContent: 'X', onclick: () => dialog.close() }), ...children] });
    const button = $button({ textContent: buttonLabel, onclick: () => dialog.showModal(), style: { padding: '0.4rem' } });
    return $div({
        children: [
            button,
            dialog
        ]
    });
};
