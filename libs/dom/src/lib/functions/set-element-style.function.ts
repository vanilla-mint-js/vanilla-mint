export function setElementStyle(target: HTMLElement, key: string, value: string) {
    target.style[key as any] = value;
}