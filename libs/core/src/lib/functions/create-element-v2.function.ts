import { classListAdd } from "./class-list-add.function";
import { setStyle } from "./set-style.function";

export function setStylesV2(target: HTMLElement, _: TElementStylesV2) { Object.entries(_ || {}).filter(([key, value]) => (value !== 0) && value).forEach(([key, value]) => setStyle(target, key, (value as string | number).toString())); }

export type TElementStylesV2 = {
  [K in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[K] | null | undefined | false | number;
};
export type TAttrV2 = any; //string | Function | boolean | number;

export type TElementConfigV2 = Partial<HTMLElement> & {
  tag?: string,
  styles?: TElementStylesV2,
  $$?: Array<any> | HTMLCollection,
  classes?: string
}

export type TElementOrTextConfig = TElementConfigV2 | string;

export function _$(parent: HTMLElement | undefined | null, config: TElementOrTextConfig) {
  let element: any;

  if (typeof config === 'string') {
    element = document.createTextNode(config)
  } else {
    element = (config instanceof HTMLElement ? config : $(config));
  }

  if (parent) {
    parent.appendChild(element);
  }
  return element;
}

export function setAttrsV2(target: HTMLElement, _: Record<string, TAttrV2>) {
  Object.entries(_ || {}).forEach(([key, value]) => {
    if ((key === 'textContent') || (typeof value === 'function')) {
      (target as any)[key] = value;
    } else {
      target.setAttribute(key, value.toString());
    }
  });
}

export function $<THTMLElement extends HTMLElement>(config: TElementConfigV2) {
  const element = config instanceof HTMLElement
    ? config
    : document.createElement(config.tag!);

  const { styles, tag, $$: children, classes, ...attrs } = config;

  ((children || []) as any).filter(Boolean).forEach((child: any) => _$(element, child as TElementOrTextConfig));

  setAttrsV2(element, attrs || {});
  setStylesV2(element, styles || {});

  if (config.classList) {
    classListAdd(element, classes as string);
  }

  return element as THTMLElement;
}

export function $_$() {

}
