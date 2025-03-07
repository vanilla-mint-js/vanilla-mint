export function setSvgStyle(target: SVGElement, key: string, value: string) {
    target.style[key as any] = value;
}