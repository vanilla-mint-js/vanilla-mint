import { TElement, TElementProps } from "../types/element-props.type";
import { styleManager } from "../constants/style-manager.constant";

export function styled<TPropsElement extends TElement, TReturnElement extends TElement>(creator: (props?: TElementProps<TPropsElement>) => TReturnElement) {
    return function (css: TemplateStringsArray) {
        const generatedClassName = styleManager.applyStyle(css[0]);

        return function (props: TElementProps<TPropsElement>) {
            return creator({ ...props, className: `${generatedClassName} ${props.className || ''}` }) as TReturnElement;
        };
    };
}