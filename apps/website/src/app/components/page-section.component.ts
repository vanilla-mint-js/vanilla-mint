import { $section, TElementProps } from "@vanilla-mint/dom";

export const $pageSection = ({className, ...props}: TElementProps<HTMLElement>) => $section({
    className: 'w-full grow flex flex-col justify-center items-center gap-16 h-[80vh] ' + (className || ''), ...props
});