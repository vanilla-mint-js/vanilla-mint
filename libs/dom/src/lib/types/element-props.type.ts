import { CSSProperties } from "./css-properties.type";

export type TGenericElementProps = { style?: CSSProperties, className?: string, children?: Array<HTMLElement> };

export type TElementProps<TElement> = Partial<
    TGenericElementProps
    &
    Omit<TElement, 'style' | 'classList' | 'children'>
>;