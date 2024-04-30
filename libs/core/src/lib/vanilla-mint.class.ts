import { Subject, Observable, Subscription, shareReplay, tap } from 'rxjs';
import { appendChild } from './functions/append-child.function';
import { setAttrs } from './functions/set-attrs.function';
import { setStyles } from './functions/set-styles.function';
import { classListAdd } from './functions/class-list-add.function';
import { classListRemove } from './functions/class-list-remove.function';
import { insertCss } from './functions/insert-css.function';
import { setStyle } from './functions/set-style.function';
import { setCssVar } from './functions/set-css-var.function';
import { createElement } from './functions/create-element.function';
import { prependChild } from './functions/prepend-child.function';
import { setCssVars } from './functions/set-css-vars.function';

export type TKeysOf<TKeySource, TValue> = { [key in keyof TKeySource]: TValue };

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
    this.vmDispatch('onconnected', this.vmConnected());
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

  vmObserve(_: keyof TAttrs): Observable<any> {
    return (this._$)[_];
  }

  vmDispatch(handlerName: string, detail?: any) {
    const handler = this.getAttribute(handlerName);
    if (handler) { // $event is angular only... is it needed ???
      Function(`const $event = arguments[0]; const event = arguments[0]; ${handler}`).bind(this)(detail);
    }
    this.dispatchEvent(new CustomEvent(handlerName, { detail, bubbles: true }));

    if (handlerName.startsWith('on')) {
      this.vmDispatch(handlerName.slice(2), detail);
    }
  }

  vmSupervise(...observables: Array<Observable<any>>) {
    (observables || []).forEach($ => this.$$$s.push($.subscribe()));
  }

  vmSubscribe(attr: keyof TAttrs, handler?: (value: string) => any): Observable<any> | undefined {
    if (handler) {
      this.vmSupervise(this.vmObserve(attr).pipe(tap(_ => handler(_))));
      return;
    }

    return this.vmObserve(attr);
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
  vmAttr(attr: keyof TAttrs) {
    return this.__[attr];
  }
  vmId({name}: {name: string}) {
    if (!this._id) {
      this._id = `${name}-${Math.random().toString().split('.')[1]}`;
    }

    return this._id;
  }
}
