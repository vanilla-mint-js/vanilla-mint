import { $div } from "@vanilla-mint/dom";

export const $arrow = (innerHTML: '&larr;' | '&rarr;') => $div({ className: 'vm-sequence-step-arrow', style: { fontSize: '1.6rem',
    // filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.99))'
 }, innerHTML });
export const rightArrowHtmlEntity = () => $arrow('&rarr;');
export const leftArrowHtmlEntity = () => $arrow('&larr;');