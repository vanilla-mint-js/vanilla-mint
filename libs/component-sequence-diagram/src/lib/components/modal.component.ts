import { $button, $dialog, $div } from "@vanilla-mint/dom"

const defaultButtonStyle = { backgroundColor: 'transparent', padding: '.4rem', fontWeight: 700, color: '#ffffff', boxSizing: 'border-box' as any };

export const $modal = ({ children, buttonLabel, style }: any) => {
    const dialog = $dialog({ style: {border: 'solid 1px #ffffff', ...style }, children: [$button({ style: defaultButtonStyle, textContent: 'X', onclick: () => dialog.close() }), ...children] });
    const button = $button({ textContent: buttonLabel, onclick: () => dialog.showModal(), style: defaultButtonStyle });
    return $div({
        children: [
            button,
            dialog
        ]
    });
};
