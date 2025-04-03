import { $div } from "@vanilla-mint/dom";

export const $arrow = (innerHTML: '&larr;' | '&rarr;') => $div({ className: 'vm-sequence-step-arrow', style: { fontSize: '1rem',
 }, innerHTML });
export const rightArrowHtmlEntity = () => $arrow('&rarr;');
export const leftArrowHtmlEntity = () => $arrow('&larr;');