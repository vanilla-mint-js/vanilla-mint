import { $a, TElementProps } from '@vanilla-mint/dom';

export const $navLink = (props: TElementProps<HTMLAnchorElement>) =>
  $a({
    ...props,
    className:
      'p-3 font-semibold hover:text-primary hover:bg-primary-contrast rounded-sm transition-all',
  });
