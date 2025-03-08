import { effect } from '@preact/signals-core';

export function setAttrs(target: HTMLElement, _: Record<string, string | Function>) {
    Object.entries(_ || {}).forEach(([key, value]) => {
        if (isSignal(value)) {
            effect(() => {
                (target as any)[key] = (value as any).value;
            });
        } else {
            (target as any)[key] = value;
        }
    });
}

function isSignal(_: any): boolean {
    if (!_) {
        return false;
    }

    if (typeof _ === 'object') {
        const { peek, subscribe } = _;

        return (typeof peek === 'function') && (typeof subscribe === 'function');
    }

    return false;
}