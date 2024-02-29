

// export function el(tag: string, attrs: any, children: any[]) {
//     var element = document.createElement(tag);
//     // element.className = classNames || '';
//     (children || []).forEach(child => element.appendChild(child));
//     Object.entries(attrs || {}).forEach(([attr, value]) => {
//       element.setAttribute(attr, value as string);
//     });
//     return element;
//   }

import { TMintable } from "./mintable.type";

export function el<TAttrs>(vm: TMintable<any>, attrs: TAttrs, children?: any[]) {
    var element = document.createElement(vm.tagName);
    // element.className = classNames || '';

    (children || []).forEach(child => element.appendChild(child));

    Object.entries(attrs || {}).forEach(([attr, value]) => {
      element.setAttribute(attr, value as string);
      Object.assign(element, attrs);
    });

    return element;
  }

