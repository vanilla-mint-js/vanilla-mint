import { CSSProperties } from "./css-properties.type";

export type TGenericSvgProps = { style?: CSSProperties, className?: string, children?: Array<SVGElement> };

export type TSvgProps<TSvg> = Partial<
    TGenericSvgProps
    &
    Omit<TSvg, 'style' | 'classList' | 'children'>
>;