// Type for the style manager instance
interface TStyleManager {
  applyStyle(css: string): string | null;
}

// StyleManager class
export class StyleManager {
  // Private static instance properties
  private static styleElement: HTMLStyleElement;
  private static sheet: CSSStyleSheet;
  private static styleCache: Map<string, string>;

  // Static initialization block (runs once when class is first accessed)
  private static initialized = false;

  private static initialize() {
    if (this.initialized) return;

    // Create or reuse a single <style> element
    this.styleElement = (document.head.querySelector("style") as HTMLStyleElement) || document.createElement("style");
    if (!this.styleElement.parentNode) {
      document.head.appendChild(this.styleElement);
    }
    this.sheet = this.styleElement.sheet as CSSStyleSheet;
    this.styleCache = new Map<string, string>();
    this.initialized = true;
  }

  // Generate a unique class name
  private static generateClassName(css: string): string {
    const hash = btoa(css).slice(0, 8).replace(/[^a-zA-Z0-9]/g, ""); // Simple hash
    return `sc-${hash}-${Math.random().toString(36).slice(2, 6)}`;
  }

  // Parse CSS and insert rules
  public static applyStyle(css: string): string | null {
    this.initialize(); // Ensure initialization

    if (!css?.length) return null;

    // Normalize CSS by removing extra whitespace and ensuring proper formatting
    const normalizedCss = css.replace(/\s+/g, " ").trim();

    // Check cache for deduplication
    if (this.styleCache.has(normalizedCss)) {
      return this.styleCache.get(normalizedCss)!; // Non-null assertion since we know it exists
    }

    // Generate a new unique class name
    const className = this.generateClassName(normalizedCss);

    // Split CSS into individual rules (e.g., "color: red; :hover { color: blue; }")
    const rules = normalizedCss.split("}").map(rule => rule.trim()).filter(Boolean);

    // Process each rule
    rules.forEach(rule => {
      // Handle pseudo-classes or standalone declarations
      if (rule.includes("{")) {
        // Rule with selector (e.g., ":hover { color: blue; ")
        const [selector, declarations] = rule.split("{");
        const trimmedSelector = selector.trim();
        const trimmedDeclarations = declarations.trim();
        if (trimmedDeclarations) {
          const fullSelector =
            trimmedSelector.startsWith(":") || trimmedSelector.startsWith("::")
              ? `.${className}${trimmedSelector}` // Append pseudo-class to class
              : `.${className} ${trimmedSelector}`; // Nested selector
          this.sheet.insertRule(`${fullSelector} { ${trimmedDeclarations} }`, this.sheet.cssRules.length);
        }
      } else {
        // Standalone declarations (e.g., "color: red;")
        const trimmedDeclarations = rule.trim();
        if (trimmedDeclarations) {
          this.sheet.insertRule(`.${className} { ${trimmedDeclarations} }`, this.sheet.cssRules.length);
        }
      }
    });

    // Cache the result
    this.styleCache.set(normalizedCss, className);
    return className;
  }

  // Optional: Expose the singleton instance as a static property
  public static get instance(): TStyleManager {
    this.initialize();
    return this;
  }
}

export const styleManager = StyleManager;