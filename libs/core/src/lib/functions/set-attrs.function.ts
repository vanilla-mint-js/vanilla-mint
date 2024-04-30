export function setAttrs(target: HTMLElement, _: Record<string, string | Function>) {
    Object.entries(_ || {}).forEach(([key, value]) => {
        if((key === 'textContent') || (typeof value === 'function')) {
            (target as any)[key] = value;
        } else {
            target.setAttribute(key, value);
        }
    });
}