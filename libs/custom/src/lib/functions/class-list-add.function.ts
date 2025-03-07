import { classListParse } from "./class-list-parse.function";

export function classListAdd(target: HTMLElement, _: string) { target.classList.add(...classListParse(_)); }