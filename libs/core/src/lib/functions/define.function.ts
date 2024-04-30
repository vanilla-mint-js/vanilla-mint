export function define (mintable: CustomElementConstructor & { tagName: string }) {
    customElements.define(mintable.tagName, mintable);
}