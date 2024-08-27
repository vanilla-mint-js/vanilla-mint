export type TElementConfigChild = TElementConfig | HTMLElement;
export type TElementConfigChildOptional = TElementConfigChild | undefined | false | 0 | null;

export type TElementConfig = { tag: string, attrs?: Record<string, string | Function>, styles?: Record<string, string | number>, children?: Array<TElementConfigChildOptional>, classList?: string }