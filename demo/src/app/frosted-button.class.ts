
import { VanillaMint } from '@vanilla-mints/core';

type TAttrs = {
  color: string;
  'background-color': string;
};

// adaptation of https://codepen.io/kevinpowell/pen/LYvBZyb to demonstrate VanillaMint API

export class FrostedButton extends VanillaMint<TAttrs> {
  static observedAttributes: Array<keyof TAttrs> = ['color', 'background-color'];
  static tagName = 'frosted-button';

  constructor() {
    super(FrostedButton.observedAttributes);
  }

  override vmConnected() {
    const id = this.vmId(FrostedButton);

    this.vmInsertCss(`
    .${id} {
      --bg: hsl(221, 37%, 10%);
      --button-text: transparent;
      --_padding: 1rem 1.5rem;
      --_transition-speed: 200ms;
      --_hover-opacity: 0.4;
      --_pressed-opacity: 0.15;
      --_hover-blurriness: 5px;
      --_pressed-blurriness: 10px;
      --_frostiness: 0.3;
      --_hover-offset: 0.5rem;
      --_pressed-offset: 0.25rem;
      --_motion-factor: 0.1;
      --_surface: transparent;
      outline: 0;
      cursor: pointer;
      font: inherit;
      color: var(--button-text);
      font-weight: 500;
      padding: 0;
      border: 0;
      border-radius: 1rem;
      background-color: transparent;
      position: relative;
      display: flex;
      flex-direction: row;
      gap: 0.125rem;
      flex-wrap: wrap;
      justify-content: center;
      align-items: stretch;

      span {
          display: grid;
          place-items: center;
          overflow: hidden;
          padding: var(--_padding);
          border-radius: inherit;
          background-color: hsl(0 0% 100% / 0);
          backdrop-filter: blur(0px);
          transition: background-color var(--_transition-speed),
              backdrop-filter var(--_transition-speed),
              translate var(--_transition-speed);

          &::before {
              content: "";
              position: absolute;
              inset: 0;
              z-index: -1;

              opacity: 0;
              transition: opacity var(--_transition-speed);
          }
      }

      &::after {
          content: "";
          position: absolute;
          z-index: -1;
          inset: 0;
          border-radius: inherit;
          background-color: var(--_surface);
          transition: scale var(--_transition-speed),
              translate var(--_transition-speed);
          animation: exit forwards var(--_transition-speed);
      }

      &:hover,
      &:focus-visible {
          span {
              outline: 1px solid hsl(0 0% 100% / 0.7);
              background-color: hsl(0 0% 100% / var(--_hover-opacity));
              backdrop-filter: blur(var(--_hover-blurriness));
              translate: 0 calc(var(--_hover-offset) * -1);

              &::before {
                  opacity: var(--_frostiness);
              }
          }

          &::after {
              scale: 0.95;
              translate: 0 0.125rem;
              animation: enter forwards var(--_transition-speed);
          }
      }

      &:active {
          span {
              backdrop-filter: blur(var(--_pressed-blurriness));
              background-color: hsl(0 0% 100% / var(--_pressed-opacity));
              translate: 0 calc(var(--_pressed-offset) * -1);
          }

          &::after {
              scale: 0.875;
              translate: 0 0.25rem;
          }
      }
  }

  @keyframes enter {
      from {
          transform: translate(0, 0);
      }

      to {
          transform: translate(calc(var(--_x-motion) * var(--_motion-factor) * -1),
                  calc(var(--_y-motion) * var(--_motion-factor) * -1));
      }
  }

  @keyframes exit {
      from {
          transform: translate(calc(var(--_x-motion) * var(--_motion-factor) * -1),
                  calc(var(--_y-motion) * var(--_motion-factor) * -1));
      }

      to {
          transform: translate(0, 0);
      }
  }`);

    this.vmClassListAdd(id);
    this.vmSetAttrs({ role: 'button' });

    this.vmSubscribe('color', _ => this.vmSetCssVar('button-text', _));
    this.vmSubscribe('background-color', _ => this.vmSetCssVar('_surface', _));

    this.addEventListener("mousemove", (event) => {
      const centerX = this.offsetWidth / 2;
      const centerY = this.offsetHeight / 2;

      const offsetX = event.offsetX - centerX;
      const offsetY = event.offsetY - centerY;

      this.vmSetCssVar('_x-motion', `${offsetX}px`);
      this.vmSetCssVar('_y-motion', `${offsetY}px`);
    });
  }

  override vmDisconnected() { }
  override vmAdopted() { }
}
