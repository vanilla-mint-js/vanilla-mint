import { TElementStyles } from "../types/element-config.type";
import { setStyle } from "./set-style.function";

export function setStyles(target: HTMLElement, _: TElementStyles) { Object.entries(_ || {}).filter(([key, value]) => (value !== 0) && value).forEach(([key, value]) => setStyle(target, key, (value as string | number).toString())); }