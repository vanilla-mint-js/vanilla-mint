import { TElementConfigChild } from "../types/element-config.type";
import { createElement } from "./create-element.function";

export function appendChild(parent: HTMLElement | undefined | null, config: TElementConfigChild) {
  const element = config instanceof HTMLElement ? config : createElement(config);
  if (parent) {
    parent.appendChild(element);
  }
  return element;
}