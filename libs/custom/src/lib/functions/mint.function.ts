export function mint(observedAttributes: string[], tagName?: string) {
    const VanillaMintier = (function () {

        // Constructor function
        function CustomElement(this: HTMLElement) {
            // Use Reflect.construct to properly initialize with HTMLElement constructor
            const self = Reflect.construct(HTMLElement, [], CustomElement);

            // Return the properly constructed instance
            return self;
        }

        // Set up prototype chain
        CustomElement.prototype = Object.create(HTMLElement.prototype);
        CustomElement.prototype.constructor = CustomElement;

        // Define static observedAttributes
        Object.defineProperty(CustomElement, 'observedAttributes', {
            get: () => observedAttributes,
            enumerable: true,
            configurable: true,
        });

        if (tagName) {
            Object.defineProperty(CustomElement, 'tagName', {
                get: () => tagName,
                enumerable: true,
                configurable: true,
            });
        }

        // Define connectedCallback
        CustomElement.prototype.connectedCallback = function (this: HTMLElement) {
            _connectedCallback.call(this);
        };

        // Define attributeChangedCallback
        CustomElement.prototype.attributeChangedCallback = function (
            this: HTMLElement,
            name: string,
            oldValue: string | null,
            newValue: string | null
        ) {
            if (oldValue !== newValue) {
                console.log(`${name} changed from "${oldValue}" to "${newValue}"`);
                _connectedCallback.call(this);
            }
        };

        // Helper function to update content
        function _connectedCallback(this: HTMLElement) {
            let content = "Hello, I'm a custom element!";
            observedAttributes.forEach((attr) => {
                const value = this.getAttribute(attr);
                if (value !== null) {
                    content += ` ${attr}="${value}"`;
                }
            });
            this.textContent = content;
        }

        return CustomElement;
    })();

    return VanillaMintier as unknown as CustomElementConstructor;
}