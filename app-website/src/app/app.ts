import { $router } from '@vanilla-mint/router-dom';
import { $a, $div, $footer, $h1, $header, $main, $nav, $section } from '@vanilla-mint/dom';
import { $navLink } from './components/nav-link.component';
import { $navBar } from './components/nav-bar.component';
import { basePath, frameworkPath, librariesPath, toolsPath } from './constants/paths.constant';
const rootOutletSelector = 'data-outlet-root';

const libraries = [
  'dom',
  'router',
  'dom-router',
  'core'
];

document.querySelector('#app')!.appendChild(
  $router({
    className: 'min-h-[100vh] flex flex-col items-stretch justify-stretch w-full',
    children: [
      {
        outlet: `.${rootOutletSelector}`,
        path: basePath,
        render: () => $div({
          className: 'grow flex flex-col items-stretch justify-stretch w-full bg-background text-bg-background-contrast',
          children: [
            $header({
              className: 'bg-surface text-surface-contrast',
              children: [
                $navBar({
                  children: [
                    $navLink({ href: basePath, textContent: "Home" }),
                    $navLink({ href: frameworkPath, textContent: "Framework" }),
                    $navLink({ href: librariesPath, textContent: "Libraries" }),
                    $navLink({ href: toolsPath, textContent: "Tools" }),
                  ]
                }),
              ]
            }),
            $main({ className: `${rootOutletSelector} grow` }),
            $footer({
              className: 'text-surface bg-surface-contrast flex flex-row justify-around items-center py-2', children: [
                $div({ textContent: 'Vanilla Mint JS' })
              ]
            })
          ]
        }),
        children: [
          { path: '/', render: () => $div({ children: [$h1({ textContent: 'Home with router-dom' })] }) },
          { path: toolsPath, render: () => $div({ children: [$h1({ textContent: 'Tools' })] }) },
          { path: frameworkPath, render: () => $div({ children: [$h1({ textContent: 'Framework' })] }) },
          {
            path: librariesPath,
            render: () => $div({ textContent: 'libs' }),
            children: [
              // { path: '/', loader: () => { }, render: () => $div({ textContent: 'wtf' }) },
              {
                path: 'all',
                render: () => $div({
                  children: [
                    $h1({ textContent: 'Libraries' }),
                    $div({
                      className: 'flex flex-wrap flex-row gap-4 items-stretch justify-between',
                      children: libraries.map(_ => $a({
                        href: `${librariesPath}/${_}`,
                        children: [$div({
                          className: 'p-4 rounded-sm border border-primary',
                          textContent: `@vanilla-mint/${_}`
                        })]
                      }))
                    }),
                    $div({ className: 'data-outlet' })
                  ]
                })
              },
              // {
              //   path: '/:library',
              //   render: ({ params }) => {
              //     console.warn({ params })
              //     return $section({
              //       children: [
              //         $h1({ textContent: params?.library }),
              //       ]
              //     });
              //   },
              // }
            ],
            outlet: '.data-outlet'
          }
        ],
      },
    ]
  }));