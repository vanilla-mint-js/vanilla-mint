import { CSSProperties } from "../types/css-properties.type";
import { TElement } from "../types/element-props.type";
import { extractStyle } from "./extract-style.function";
import { styleOn } from "./style-on.function";

export function styleOnFocus(element: TElement, style: CSSProperties, elementToStyle?: HTMLElement, onlyIf?: () => boolean) {
    const originalStyle = extractStyle(elementToStyle || element, style);

    styleOn(element, 'focus', style, elementToStyle, onlyIf);
    styleOn(element, 'blur', originalStyle, elementToStyle, onlyIf);
}
