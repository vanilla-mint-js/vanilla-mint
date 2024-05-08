export function define(mintable: CustomElementConstructor & { tagName: string }, tagNameOverride?: string) {
    const tagName = tagNameOverride || mintable.tagName;
    if (!customElements.get(tagName)) {
        customElements.define(mintable.tagName, mintable);
    }
}