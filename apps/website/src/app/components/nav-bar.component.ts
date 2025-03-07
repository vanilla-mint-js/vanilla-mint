import { $nav, TElementProps } from '@vanilla-mint/dom';

export const $navBar = (props: TElementProps<HTMLAnchorElement>) =>
  $nav({ ...props, className: 'flex flex-row gap-4 items-center' });
