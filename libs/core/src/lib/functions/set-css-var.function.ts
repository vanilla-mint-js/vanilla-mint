import { setStyle } from "./set-style.function";

export function setCssVar(target: HTMLElement, name: string, value: string) {
    setStyle(target, `--${name}`, value);
}
