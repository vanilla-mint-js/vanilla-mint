export function define(mintable: CustomElementConstructor & { tagName: string, is?: string }, tagNameOverride?: string) {
    const tagName = tagNameOverride || mintable.tagName;
    if (!customElements.get(tagName)) {
        if(mintable.is) {
            customElements.define(mintable.tagName, mintable, {extends: mintable.is});
        } else {
            customElements.define(mintable.tagName, mintable);
        }
    }
}