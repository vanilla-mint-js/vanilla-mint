import { CSSProperties } from "./css-properties.type";

export interface TElement extends HTMLElement { };
export type TElementVmProps = { style?: CSSProperties, className?: string, children?: Array<HTMLElement> };
export type TElementProps<TElement> = Partial<
    Omit<TElement, 'style' | 'classList' | 'children'>
    &
    TElementVmProps
>;