import { TElementConfig } from "../types/element-config.type";
import { appendChild } from "./append-child.function";

export function appendExternalAsset(target: HTMLElement, config: TElementConfig) {
    return new Promise((resolve, reject) => {
        const attrs: any = {
            onload: resolve,
            onerror: reject,
        };

        Object.entries(config.attrs || {}).forEach(([key, value]) => {
            if(value) {
                attrs[key] = value;
            }
        });

        return appendChild(target, {
            ...config,
            attrs,
        });
    });
}
