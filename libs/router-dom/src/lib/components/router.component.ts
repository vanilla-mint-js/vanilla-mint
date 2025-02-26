import { $div, TElementProps } from '@vanilla-mint/dom';
import { Route, Router } from '@vanilla-mint/router';

export type TRouterElementProps = Omit<TElementProps<HTMLDivElement>, 'children'> & { children: Route[] };

export const $router = ({children = [], ...props}: TRouterElementProps) => {
    const rootOutlet = $div(props);

    Router.forRoot(children, rootOutlet);

    return rootOutlet;
};