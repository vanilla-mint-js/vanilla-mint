import { appendChild } from "./append-child.function";

export function injectScript(target: HTMLElement, src: string, type?: any) {
    return new Promise((resolve, reject) => {
        appendChild(target, {
            tag: 'script',
            attrs: {
                onload: resolve,
                onerror: reject,
                src,
                type,
            }
        });
    });
}
