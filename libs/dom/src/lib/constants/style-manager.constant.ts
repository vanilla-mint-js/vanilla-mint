// Singleton to manage the stylesheet
export const styleManager = (function () {
  // Create a single <style> element
  const styleElement = document.head.querySelector("style") || document.createElement("style");
  if (!styleElement.parentNode) {
    document.head.appendChild(styleElement);
  }
  document.head.appendChild(styleElement);
  const sheet = styleElement.sheet!;

  // Cache to store generated class names and their CSS
  const styleCache = new Map();

  // Generate a unique class name
  function generateClassName(css: string) {
    const hash = btoa(css).slice(0, 8).replace(/[^a-zA-Z0-9]/g, ""); // Simple hash
    return `sc-${hash}-${Math.random().toString(36).slice(2, 6)}`;
  }

  // Parse CSS and insert rules
  function applyStyle(css: string) {
    if (!css?.length) return null;

    // Normalize CSS by removing extra whitespace and ensuring proper formatting
    const normalizedCss = css.replace(/\s+/g, " ").trim();

    // Check cache for deduplication
    if (styleCache.has(normalizedCss)) {
      return styleCache.get(normalizedCss); // Return cached class name
    }

    // Generate a new unique class name
    const className = generateClassName(normalizedCss);

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
          const fullSelector = trimmedSelector.startsWith(":") || trimmedSelector.startsWith("::")
            ? `.${className}${trimmedSelector}` // Append pseudo-class to class
            : `.${className} ${trimmedSelector}`; // Nested selector
          sheet.insertRule(`${fullSelector} { ${trimmedDeclarations} }`, sheet.cssRules.length);
        }
      } else {
        // Standalone declarations (e.g., "color: red;")
        const trimmedDeclarations = rule.trim();
        if (trimmedDeclarations) {
          sheet.insertRule(`.${className} { ${trimmedDeclarations} }`, sheet.cssRules.length);
        }
      }
    });

    // Cache the result
    styleCache.set(normalizedCss, className);
    return className;
  }

  return { applyStyle };
})();
