import { classListParse } from "./class-list-parse.function";

export function classListRemove(target: HTMLElement, _: string) { target.classList.remove(...classListParse(_)); }