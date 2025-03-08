import { TElementProps } from "../types/element-props.type";
import { setAttrs } from "./set-element-attributes.function";
import { setElementStyles } from "./set-element-styles.function";

export const asElementFactory = <TElement extends HTMLElement>(element: TElement, { style, className, children, ...props }: TElementProps<TElement> = {}) => {
    if (style) {
        setElementStyles(element, style);
    }

    if (className) {
        element.className = className;
    }

    setAttrs(element, props as any);

    if (children?.length) {
        children.forEach(child => element.appendChild(child));

        // const fragment = document.createDocumentFragment();
        // fragment.appendChild(element);

        // return fragment;
    }

    return element;
}
