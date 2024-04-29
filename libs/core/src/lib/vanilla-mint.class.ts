import { Subject, Observable, Subscription, shareReplay, tap } from 'rxjs';

export type TKeysOf<TKeySource, TValue> = { [key in keyof TKeySource]: TValue };

export abstract class VanillaMint<TAttrs> extends HTMLElement {
  static define = (mint: CustomElementConstructor & { tagName: string }) => customElements.define(mint.tagName, mint);

  private readonly _$$: TKeysOf<TAttrs, Subject<any>> = {} as any;
  private readonly _$: TKeysOf<TAttrs, Observable<any>> = {} as any;
  private readonly _$$$: TKeysOf<TAttrs, Subscription> = {} as any;
  private readonly subscriptions: Array<Subscription> = [];

  abstract vmConnected(): any;
  abstract vmDisconnected(): any;
  abstract vmAdopted(): any;

  connectedCallback() {
    this.vmDispatch('onconnected', this.vmConnected());
  }

  disconnectedCallback() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });

    (this.attrs || []).forEach((attr) => {
      this._$$$[attr].unsubscribe();
    });

    this.vmDispatch('ondisconnected', this.vmDisconnected());
  }

  adoptedCallback() {
    this.vmDispatch('onadopted', this.vmAdopted());
  }

  attributeChangedCallback(name: keyof TAttrs, oldValue: any, newValue: any) {
    const subject$$ = this._$$[name];
    if (subject$$) subject$$.next(newValue);
  }

  constructor(public attrs: Array<keyof TAttrs>) {
    super();
    (attrs || []).forEach((attr) => {
      const $$ = new Subject();
      this._$$[attr] = $$;
      const $ = $$.asObservable().pipe(shareReplay());
      this._$[attr] = $;
      this._$$$[attr] = $.subscribe();
    });
  }

  vmObserve(_: keyof TAttrs): Observable<any> {
    return (this._$)[_];
  }

  vmDispatch(handlerName: string, detail?: any) {
    const handler = this.getAttribute(handlerName);
    if (handler) { // $event is angular only... is it needed ???
      Function(`const $event = arguments[0]; const event = arguments[0]; ${handler}`).bind(this)(detail);
    }
    this.dispatchEvent(new CustomEvent(handlerName, { detail, bubbles: true }));
  }

  vmSupervise(...observables: Array<Observable<any>>) {
    (observables || []).forEach($ => this.subscriptions.push($.subscribe()));
  }

  vmSubscribe(attr: keyof TAttrs, handler?: (value: string) => any): Observable<any> | undefined {
    if (handler) {
      this.vmSupervise(this.vmObserve(attr).pipe(tap(_ => handler(_))));
      return;
    }

    return this.vmObserve(attr);
  }

  vmSetStyles(_: Record<string, string>) {
    // Object.entries(_ || {}).forEach(([key, value]) => this.style[key as any] = value);
    setStyles(_, this);
  }

  vmSetAttrs(_: Record<string, string>) {
    // Object.entries(_ || {}).forEach(([key, value]) => this.setAttribute(key, value));
    setAttrs(_, this);
  }

  vmAppendChild(config: TChildConfig) {
    return appendChild(config, this);
  }
}

function setStyles(_: Record<string, string>, target: any) { Object.entries(_ || {}).forEach(([key, value]) => target.style[key as any] = value); }
function setAttrs(_: Record<string, string>, target: any) { Object.entries(_ || {}).forEach(([key, value]) => target.setAttribute(key, value)); }
type TChildConfig = { tag: string, attrs?: Record<string, string>, styles?: Record<string, string>, children?: TChildConfig[], classList?: string }
function appendChild(config: TChildConfig, parent: HTMLElement) {
  const element = document.createElement(config.tag);
  (config.children || []).forEach(child => appendChild(child, element));
  setAttrs(config.attrs || {}, element);
  setStyles(config.styles || {}, element);
  parent.appendChild(element);
  return element;
}
