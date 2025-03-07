import { CSSProperties } from "../types/css-properties.type";
import { setSvgStyle } from "./set-svg-style.function";

export function setSvgStyles(target: SVGElement, _: CSSProperties) {
    Object.entries(_ || {})
        .filter(([_key, value]) => (value !== 0) && value)
        .forEach(([key, value]) => setSvgStyle(target, key, `${value}`));
}
