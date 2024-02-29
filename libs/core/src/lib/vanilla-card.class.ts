import { filter, tap } from 'rxjs';
import { el } from './el.function';
import { VanillaMintier } from './vanilla-mintier.class';
import { TMintable } from './mintable.type';

export class VanillaCard extends VanillaMintier<{
  heading: string;
}> {
  static observedAttributes = ['heading'];
  static emittedEvents = [];
  static tagName = 'vanilla-card';
  static register = () => VanillaCard.registrar(VanillaCard);
  h1!: HTMLHeadingElement;

  static getContstructor(): Function {
    return VanillaCard;
  }

  constructor() {
    super(VanillaCard.observedAttributes);
  }

  override vmConnectedCallback() {
    this.h1 = document.createElement('h1');
    this.h1.style.color = 'black';
    this.h1.style.border = 'solid black 2px';
    this.style.padding = '4rem';
    this.style.backgroundColor = 'gray';
    this.style.display = 'block'
    this.prepend(this.h1);
  }

  override vmSubscribe() {
    return [
      this.onChanges('heading').pipe(
        filter(() => !!this.h1),
        tap(title => this.h1.innerHTML = title as string),
        tap(title => console.warn(title)),
        )
    ];
  }

  override vmDisconnectedCallback() { }

  override vmAdoptedCallback() { }
}
