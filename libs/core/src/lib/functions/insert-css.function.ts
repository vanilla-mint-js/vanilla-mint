export function insertCss(target: HTMLElement, _: string) {
  if(_?.length) {
    target.insertAdjacentHTML("beforebegin", `<style>${_}</style>`);
  }
}