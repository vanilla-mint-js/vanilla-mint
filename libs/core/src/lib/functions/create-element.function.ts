import { TElementConfig, TElementConfigChild } from "../types/element-config.type";
import { appendChild } from "./append-child.function";
import { classListAdd } from "./class-list-add.function";
import { setAttrs } from "./set-attrs.function";
import { setStyles } from "./set-styles.function";

export function createElement(config: TElementConfig) {
  const element = config instanceof HTMLElement ? config : document.createElement(config.tag);
  (config.children || []).filter(Boolean).forEach(child => appendChild(element, child as TElementConfigChild));
  setAttrs(element, config.attrs || {});
  setStyles(element, config.styles || {});

  if(config.classList) {
    classListAdd(element, config.classList);
  }

  return element;
}