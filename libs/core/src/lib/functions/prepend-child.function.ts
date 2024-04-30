import { TElementConfig } from "../types/element-config.type";
import { createElement } from "./create-element.function";

export function prependChild(parent: HTMLElement | undefined | null, config: TElementConfig) {
  const element = createElement(config);
  if (parent) {
    parent.prepend(element);
  }
  return element;
}