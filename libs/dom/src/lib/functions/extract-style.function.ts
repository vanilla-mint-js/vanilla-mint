import { CSSProperties } from "../types/css-properties.type";
import { TElement } from "../types/element-props.type";

export function extractStyle(element: TElement, style: CSSProperties) {
    return Object.keys(style)

        .reduce((_: any, propertyName: any) => {
            _[propertyName] = element.style[propertyName as any];

            return _;
        }, {} as CSSProperties);
}