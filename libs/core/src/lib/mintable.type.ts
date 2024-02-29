export type TMintable<TVanillaMint> = {
    observedAttributes: string[];
    tagName: string;
    getConstructor: () => Function;
    register: () => void;
    // mint: TVanillaMint;
  };