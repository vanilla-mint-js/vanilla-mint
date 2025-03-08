import { TElement, TElementProps } from "../types/element-props.type";
import { styleManager } from "../constants/style-manager.constant";

export function styled(creator: (props?: TElementProps<TElement>) => TElement) {
    return function (css: any) {
        const generatedClassName = styleManager.applyStyle(css);

        return function ({ className = '', ...props }: TElementProps<TElement> = {}) {
            return creator({ ...props, className: `${generatedClassName} ${className}` });
        };
    };
}