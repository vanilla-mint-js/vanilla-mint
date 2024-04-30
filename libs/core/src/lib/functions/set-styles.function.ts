import { setStyle } from "./set-style.function";

export function setStyles(target: HTMLElement, _: Record<string, string>) { Object.entries(_ || {}).forEach(([key, value]) => setStyle(target, key, value)); }