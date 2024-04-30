import { TChildConfig } from "../types/element.type";
import { appendChild } from "./append-child.function";
import { setAttrs } from "./set-attrs.function";
import { setStyles } from "./set-styles.function";

export function createElement(config: TChildConfig) {
  const element = document.createElement(config.tag);
  (config.children || []).forEach(child => appendChild(element, child));
  setAttrs(element, config.attrs || {});
  setStyles(element, config.styles || {});

  return element;
}