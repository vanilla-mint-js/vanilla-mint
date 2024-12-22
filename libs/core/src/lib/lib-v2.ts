
import { combineLatest, fromEvent, Observable, shareReplay, Subject, Subscription, tap } from "rxjs";
import { appendChild } from "./functions/append-child.function";
import { classListAdd } from "./functions/class-list-add.function";
import { classListRemove } from "./functions/class-list-remove.function";
import { createElement } from "./functions/create-element.function";
import { insertCss } from "./functions/insert-css.function";
import { prependChild } from "./functions/prepend-child.function";
import { setAttrs } from "./functions/set-attrs.function";
import { setCssVar } from "./functions/set-css-var.function";
import { setCssVars } from "./functions/set-css-vars.function";
import { setStyle } from "./functions/set-style.function";
import { setStyles } from "./functions/set-styles.function";
import { define } from "@vanilla-mint/components";
import { $ } from "./functions/create-element-v2.function";
import { TKeysOf } from "./vanilla-mint.class";

type TBaseElement = HTMLElement;

export abstract class VanillaMint<TAttrs> extends HTMLElement {
  private _id: string | undefined;

  private readonly __: TKeysOf<TAttrs, any> = {} as any;
  private readonly _$$: TKeysOf<TAttrs, Subject<any>> = {} as any;
  private readonly _$: TKeysOf<TAttrs, Observable<any>> = {} as any;
  private readonly _$$$: TKeysOf<TAttrs, Subscription> = {} as any;
  private readonly $$$s: Array<Subscription> = [];

  abstract vmConnected(): any;
  abstract vmDisconnected(): any;
  abstract vmAdopted(): any;

  connectedCallback() {
    const result = this.vmConnected();
    if (result) {
      if (result instanceof Promise) {
        result.then((_: any) => this.vmDispatch('onconnected', _));
      } else {
        this.vmDispatch('onconnected', result);
      }
    }
  }

  disconnectedCallback() {
    this.$$$s.forEach((sub) => {
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
    this.__[name] = newValue;
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

  vmDispatch(handlerName: string, detail?: any) {
    const handler = this.getAttribute(handlerName);
    if (handler) { // $event 4 angular only...  needed ???
      Function(`const $event = arguments[0]; const event = arguments[0]; ${handler}`).bind(this)(detail);
    }
    this.dispatchEvent(new CustomEvent(handlerName, { detail, bubbles: true }));

    if (handlerName.startsWith('on')) {
      this.vmDispatch(handlerName.slice(2), detail);
    }
  }

  vmObserveAttr(attr: keyof TAttrs): Observable<any> {
    return (this._$)[attr];
  }

  vmObserveAttrs(attrs: Array<keyof TAttrs>): Observable<any[]> {
    return combineLatest(attrs.map(_ => this.vmObserveAttr(_)));
  }

  vmObserveEvent(event: keyof HTMLElementEventMap): Observable<any> {
    return fromEvent(this, event);
  }

  vmObserveEvents(events: Array<keyof HTMLElementEventMap>): Observable<any[]> {
    return combineLatest(events.map(event => fromEvent(this, event)));
  }

  vmSubscribe(observable: Observable<any>) {
    this.$$$s.push(observable.subscribe());
  }

  vmSubscribeMany(observables: Array<Observable<any>>) {
    (observables || []).forEach(observable => this.$$$s.push(observable.subscribe()));
  }

  vmOnChangedAttr(attr: keyof TAttrs, handler: (value: string) => any): void {
    if ((typeof handler) === 'function') {
      this.vmSubscribe(this.vmObserveAttr(attr).pipe(tap(handler)));
    }
  }

  vmOnChangedAttrs(attrs: Array<keyof TAttrs>, handler: (values: any[]) => any): void {
    if ((typeof handler) === 'function') {
      this.vmSubscribe(this.vmObserveAttrs(attrs).pipe(tap(handler)));
    }
  }

  vmOnEvent(event: keyof HTMLElementEventMap, handler: (value: any) => any): void {
    if ((typeof handler) === 'function') {
      this.vmSubscribe(this.vmObserveEvent(event).pipe(tap(handler)));
    }
  }

  vmOnEvents(events: Array<keyof HTMLElementEventMap>, handler: (values: any[]) => any): void {
    if ((typeof handler) === 'function') {
      this.vmSubscribe(this.vmObserveEvents(events).pipe(tap(handler)));
    }
  }

  // need to support the handler returning a cleanup function
  // bc the only purpose of this method es to match react semantix
  // even tho it's far less powerful/useful than the observable-based counterparts
  vmUseEffect(handler: (values: any[]) => void, attrs: Array<keyof TAttrs>): void {
    if ((typeof handler) === 'function') {
      this.vmSubscribe(this.vmObserveAttrs(attrs).pipe(tap((_) => handler(_))));
    }
  }

  vmAppendChild = appendChild.bind(null, this);
  vmClassListAdd = classListAdd.bind(null, this);
  vmClassListRemove = classListRemove.bind(null, this);
  vmCreateElement = createElement.bind(null);
  vmInsertCss = insertCss.bind(null, this);
  vmPrependChild = prependChild.bind(null, this);
  vmSetAttrs = setAttrs.bind(null, this);
  vmSetCssVar = setCssVar.bind(null, this);
  vmSetCssVars = setCssVars.bind(null, this);
  vmSetStyle = setStyle.bind(null, this);
  vmSetStyles = setStyles.bind(null, this);
  vmAttr<T>(attr: keyof TAttrs, defaultValue?: T) {
    if ((typeof this.__[attr]) === 'undefined') {
      return defaultValue;
    }

    return this.__[attr];
  }
  vmId(name: string) {
    if (!this._id) {
      this._id = `${name}-${Math.random().toString().split('.')[1]}`;
    }

    return this._id;
  }
}

export function mint<TAttrs>(
  tagName: string,
  observedAttributes: Array<keyof TAttrs>,
  fns?: {
    vmConnected: (vm: VanillaMint<TAttrs> & TBaseElement) => void,
    vmDisconnected?: (vm: VanillaMint<TAttrs> & TBaseElement) => void,
    vmAdopted?: (vm: VanillaMint<TAttrs> & TBaseElement) => void,
  },
) {

  type TKeysOf<TKeySource, TValue> = { [key in keyof TKeySource]: TValue };

  class Subclass extends VanillaMint<TAttrs> {
    static observedAttributes = observedAttributes;
    static tagName = tagName;

    constructor() {
      super(observedAttributes);
    }

    override vmConnected() {
      if (fns?.vmConnected) {
        fns.vmConnected(this as any);
      }
    }

    override vmDisconnected() {
      if (fns?.vmDisconnected) {
        fns.vmDisconnected(this as any);
      }
    }

    override vmAdopted() {
      if (fns?.vmAdopted) {
        fns.vmAdopted(this as any);
      }
    }
  };

  define(Subclass);

  return (props: Partial<TBaseElement>) => $({ tag: tagName, ...props }) as TBaseElement
}
