import { CSSProperties } from "../types/css-properties.type";
import { TElement } from "../types/element-props.type";

export function styleOn(element: TElement, event: keyof HTMLElementEventMap, style: CSSProperties, elementToStyle?: HTMLElement, onlyIf?: () => boolean) {
    const _elementToStyle = elementToStyle || element;

    element.addEventListener(event, () => {
        if(!onlyIf || onlyIf()) {
            Object.entries(style).forEach(([key, value]) => {
                (_elementToStyle as any).style[key] = value;
            });
        }
    });
}
