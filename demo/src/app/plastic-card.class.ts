
import { VanillaMint } from '@vanilla-mints/core';

type TAttrs = {
  title: string;
};

export class PlasticCard extends VanillaMint<TAttrs> {
  static observedAttributes: Array<keyof TAttrs> = ['title'];
  static tagName = 'plastic-card';

  constructor() {
    super(PlasticCard.observedAttributes);
  }

  override vmConnected() {
    this.vmSetStyles({
      padding: '2rem 4rem',
      display: 'flex',
      flexDirection: 'column',
      fontSize: '16px',
      // filter: 'blur(12px)',
      color: 'midnightblue'
    });

    const title = this.vmPrependChild({
      tag: 'h1',
      styles: {
        fontSize: '32px',
        color: 'red'
      }
    });

    this.vmSubscribe('title', _ => {
      title.innerText = _;
      console.warn(_)
    });
  }

  override vmDisconnected() { }
  override vmAdopted() { }
}
