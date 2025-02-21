import { CSSProperties } from "./css-properties.type";

export type TElementProps = { style?: CSSProperties, className?: string, textContent?: string, innerHTML?: string, children?: Array<HTMLElement> };