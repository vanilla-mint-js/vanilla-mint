import { TChildConfig } from "../types/element.type";
import { createElement } from "./create-element.function";

export function appendChild(parent: HTMLElement | undefined | null, config: TChildConfig) {
  const element = createElement(config);
  if (parent) {
    parent.appendChild(element);
  }
  return element;
}