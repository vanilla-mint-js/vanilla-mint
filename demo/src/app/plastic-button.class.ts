
import { VanillaMint } from '@vanilla-mints/core';
import { tap } from 'rxjs';

type TAttrs = {
  color: string;
  'background-color': string;
};

export class PlasticButton extends VanillaMint<TAttrs> {
  static observedAttributes: Array<keyof TAttrs> = ['color', 'background-color'];
  static tagName = 'plastic-button';

  constructor() {
    super(PlasticButton.observedAttributes);
  }

  override vmConnected() {
    this.vmSetStyles({
      padding: '2rem 4rem',
      display: 'flex',
      flexDirection: 'row',
      fontSize: '32px'
    });

    this.vmSetAttrs({role: 'button'});

    this.vmSupervise(
      ...PlasticButton.observedAttributes.map(_ =>
        this.vmObserve(_ as any)
          .pipe(
            tap((__: string) => (this.style[(_ as any)] = __))
          )));

          return 'hotsauce';
  }

  override vmDisconnected() {}
  override vmAdopted() {}
}
