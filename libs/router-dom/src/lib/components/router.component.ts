import { $div, TElementProps } from '@vanilla-mint/dom';
import { Route, Router, VanillaRouter } from '@vanilla-mint/router';

export type TRouterElementProps = Omit<TElementProps<HTMLDivElement>, 'children'> & { children: Route[] };

export const $router = ({children = [], ...props}: TRouterElementProps) => {
    const rootOutlet = $div({...props, className: (props.className || '') + ' outlet'});

    // Router.forRoot(children, rootOutlet);

    setTimeout(() => {

        new VanillaRouter({
            routes: children as any,
            outlet: '.outlet',
            useHash: false
        })
    }, 0)

    return rootOutlet;
};