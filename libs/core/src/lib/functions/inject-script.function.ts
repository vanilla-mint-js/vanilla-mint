import { appendChild } from "./append-child.function";

export function injectScript(target: HTMLElement, src: string, type?: any) {
    return new Promise((resolve, reject) => {
        const attrs: any = {
            onload: resolve,
            onerror: reject,
            src,
        };

        if(type) {
            attrs.type = type;
        }
        appendChild(target, {
            tag: 'script',
            attrs,
        });
    });
}
