import { VanillaButton, VanillaCard, el } from '@vanilla-mints/core';
import './app.element.css';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    this.innerHTML = ``;
    this.appendChild(
      el(VanillaCard, { heading: 'TESTING' }, [
        el(VanillaButton, { color: 'hotpink', textContent: 'click me!!!', clicked: 'console.warn($event)' })
      ])
    );

  }
}
customElements.define('app-root', AppElement);
