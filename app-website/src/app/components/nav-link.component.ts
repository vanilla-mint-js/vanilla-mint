import { $a, TElementProps } from "@vanilla-mint/dom";

export const $navLink = (props: TElementProps<HTMLAnchorElement>) => $a({...props, className: 'p-3 font-bold text-primary hover:text-secondary rounded-sm transition-all'})