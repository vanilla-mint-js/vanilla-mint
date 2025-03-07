import { TElementConfig } from "../types/element-config.type";

export function div(config: Omit<TElementConfig, 'tag'>) {
    return {...config, tag: 'div'};
}