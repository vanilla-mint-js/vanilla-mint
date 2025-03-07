export function setCssVar(target: HTMLElement, name: string, value: string) {
    target.style.setProperty(`--${name}`, value);
}
