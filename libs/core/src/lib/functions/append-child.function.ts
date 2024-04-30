import { TElementConfig } from "../types/element-config.type";
import { createElement } from "./create-element.function";

export function appendChild(parent: HTMLElement | undefined | null, config: TElementConfig) {
  const element = createElement(config);
  if (parent) {
    parent.appendChild(element);
  }
  return element;
}