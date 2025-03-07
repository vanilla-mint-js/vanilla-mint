import { setCssVar } from "./set-css-var.function";

export function setCssVars(target: HTMLElement, _: Record<string, string>) {
    Object.entries(_ || {}).forEach(([key, value]) => setCssVar(target, key, value));
}