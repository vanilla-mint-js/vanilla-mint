import { Router } from '@vanilla-mint/router';
import { $counter } from './counter';
import { $a, $div, $h1, $main, $nav, $section } from '@vanilla-mint/dom';
const rootOutletSelector = 'data-outlet-root';

Router.forRoot([
  {
    outlet: `.${rootOutletSelector}`,
    path: '/',
    render: () => $div({
      children: [
        $nav({
          children: [
            $a({ href: "/", textContent: "/" }),
            $a({ href: "/about", textContent: "/about" }),
            $a({ href: "/contact", textContent: "/contact" }),
            $a({ href: "/counter/3", textContent: "/counter/3" }),
            $a({ href: "/counter", textContent: "/counter" }),
          ]
        }),
        $main({ className: rootOutletSelector })
      ]
    }),
    children: [
      { path: '/', render: () => $h1({ textContent: 'Home' })},
      { path: '/contact', render: () => $h1({ textContent: 'Contact' })},
      { path: '/counter/:count', render: ({ count }) => $counter(count) },
      { path: '/counter', render: () => $counter(0) },
      {
        path: '/about',
        render: () => $div({
          children: [
            $nav({
              style: {position: 'fixed', top: '4rem'},
              children: [
                $a({ href: "/", textContent: "/" }),
                $a({ href: "/about", textContent: "/about" }),
                $a({ href: "/about/hours", textContent: "/hours" }),
              ]
            }),
            $h1({textContent: 'Abouttttt'}),
            $div({ className: 'data-outlet' })
          ]
        }),
        children: [{
          path: '/hours',
          render: () => $section({
            children: [
              $h1({ textContent: 'Hours' }),
              $a({ href: 'about/hours', textContent: '24/7' })
            ]
          }),
        }],
        outlet: '.data-outlet'
      }
    ],
  },
], document.querySelector('#app')!);