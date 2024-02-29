import { tap } from 'rxjs';
import { VanillaMint } from './vanilla-mint.class';

export class VanillaButton extends VanillaMint<{
  color: string;
  size: string;
}> {
  static observedAttributes = ['color', 'size'];
  static tagName = 'vanilla-button';
  static register = () => VanillaButton.registrar(VanillaButton);

  i = 0;

  constructor() {
    super(VanillaButton.observedAttributes);
  }

  override vmConnectedCallback() {
    this.onclick = (e) => {
      // this.onClick(e);
      this.emit('clicked', e);
    };
  }

  override vmSubscribe() {
    return [
      this.onChanges('color').pipe(
        tap((color: string) => (this.style.backgroundColor = color))
      ),
    ];
  }

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];
    const i = this.i++ % colors.length;
    this.setAttribute('color', colors[i]);
    this.style.backgroundColor = colors[i]
  }

  override vmDisconnectedCallback() {}

  override vmAdoptedCallback() {}
}
