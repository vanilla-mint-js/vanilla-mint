import { appendExternalAsset } from "./append-external-asset.function";

export function appendStylesheet(target: HTMLElement, href: string, extraAttrs = {}) {
    return appendExternalAsset(target, { tag: 'link', attrs: { href, rel: 'stylesheet', ...extraAttrs } });
}
