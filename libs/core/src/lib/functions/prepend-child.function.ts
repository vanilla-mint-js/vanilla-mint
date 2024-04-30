import { TChildConfig } from "../types/element.type";
import { createElement } from "./create-element.function";

export function prependChild(parent: HTMLElement | undefined | null, config: TChildConfig) {
  const element = createElement(config);
  if (parent) {
    parent.prepend(element);
  }
  return element;
}