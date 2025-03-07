export function setSvgAttrs(target: SVGElement, _: Record<string, string | Function>) {
    Object.entries(_ || {}).forEach(([key, value]) => {
        if (
            (key === 'textContent') ||
            (key === 'innerHTML') ||
            (key === 'outerHTML') ||
            (typeof value === 'function')
        ) {
            (target as any)[key] = value;
        } else {
            target.setAttribute(key, value);
        }
    });
}