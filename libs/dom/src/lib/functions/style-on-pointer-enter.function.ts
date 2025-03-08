import { CSSProperties } from "../types/css-properties.type";
import { TElement } from "../types/element-props.type";
import { extractStyle } from "./extract-style.function";
import { styleOn } from "./style-on.function";

export function styleOnPointerEnter(element: TElement, style: CSSProperties, elementToStyle?: HTMLElement, onlyIf?: () => boolean) {
    const originalStyle = extractStyle(elementToStyle || element, style);

    styleOn(element, 'mouseenter', style, elementToStyle, onlyIf);
    styleOn(element, 'mouseleave', originalStyle, elementToStyle, onlyIf);
}