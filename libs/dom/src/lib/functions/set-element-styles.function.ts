import { CSSProperties } from "../types/css-properties.type";
import { setElementStyle } from "./set-element-style.function";

export function setElementStyles(target: HTMLElement, _: CSSProperties) {
    Object.entries(_ || {})
        .filter(([_key, value]) => (value !== 0) && value)
        .forEach(([key, value]) => setElementStyle(target, key, `${value}`));
}
