export function define(mintable: CustomElementConstructor, tagNameOverride?: string) {
    const tagName = tagNameOverride || (mintable as any).tagName;
    if (!customElements.get(tagName)) {
        customElements.define(tagName, mintable);
    }
}