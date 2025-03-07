export type TElementConfigChild = TElementConfig | HTMLElement;
export type TElementConfigChildOptional = TElementConfigChild | undefined | false | 0 | null;
export type TElementStyles = {
    [K in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[K] | null | undefined | false | number;
};
export type TElementConfig = {
    tag: string,
    attrs?: Record<string, string | Function>,
    styles?: TElementStyles,
    children?: Array<TElementConfigChildOptional>,
    classList?: string
}