import { dashCase } from "./dash-case.function";

export function setStyle(target: HTMLElement, key: string, value: string) {
    target.style.setProperty(dashCase(key), value);
}
