import { Subject, Observable, Subscription, shareReplay } from 'rxjs';

export abstract class VanillaMint<TAttributes> extends HTMLElement {
  static registrar = (mint: CustomElementConstructor & { tagName: string }) =>
    customElements.define(mint.tagName, mint);
  subjects$$: Record<string, Subject<any>> = {};
  $: Record<string, Observable<any>> = {};
  attrSubscriptions: Record<string, Subscription> = {};
  subscriptions: Array<Subscription> = [];

  onChanges(attr: keyof TAttributes) {
    return (this.$ as any)[attr];
  }

  emit(handlerName: string, detail: any) {
    const handler = this.getAttribute(handlerName);
    if (handler) {
      Function(`const $event = arguments[0]; ${handler}`)(detail);
    }
    this.dispatchEvent(new CustomEvent(handlerName, { detail, bubbles: true }));
  }

  constructor(public attrs: string[], lifeCyclers?: {}) {
    super();
    (attrs || []).forEach((attr) => {
      const subject = new Subject();
      this.subjects$$[attr] = subject;
      const observable$ = subject.asObservable().pipe(shareReplay());
      this.$[attr] = observable$;
      this.attrSubscriptions[attr] = observable$.subscribe();
    });
  }

  abstract vmConnectedCallback(): void;

  connectedCallback() {
    (this.vmSubscribe() || []).forEach(($) =>
      this.subscriptions.push($.subscribe())
    );
    this.vmConnectedCallback();
  }

  abstract vmDisconnectedCallback(): void;

  disconnectedCallback() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });

    (this.attrs || []).forEach((attr) => {
      this.attrSubscriptions[attr].unsubscribe();
    });
    this.vmDisconnectedCallback();
  }

  abstract vmAdoptedCallback(): void;
  abstract vmSubscribe(): Observable<any>[];

  adoptedCallback() {
    this.vmAdoptedCallback();
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue != newValue) {
      const subject$$ = this.subjects$$[name];
      if (subject$$) subject$$.next(newValue);
    }
  }
}
