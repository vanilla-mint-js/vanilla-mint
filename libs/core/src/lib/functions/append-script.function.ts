import { appendExternalAsset } from "./append-external-asset.function";

export function appendScript(target: HTMLElement, src: string, type?: any) {
    const attrs: any = { src };

    if ((typeof type) !== 'undefined') {
        attrs['type'] = type;
    }

    return appendExternalAsset(target, { tag: 'script', attrs });
}