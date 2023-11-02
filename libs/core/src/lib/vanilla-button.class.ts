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
      this.onClick(e);
    };
  }

  override vmSubscribe() {
    return [
      this.onChanges('color').pipe(
        tap((color: string) => (this.style.backgroundColor = color))
      ),
    ];
  }

  onClick(e: MouseEvent) {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];
    const i = this.i++ % colors.length;
    //   el.setAttribute('color', colors[i]);
    //   el.style.backgroundColor = colors[i]

    this.emit('clicked', colors[i]);
  }

  override vmDisconnectedCallback() {}

  override vmAdoptedCallback() {}
}
