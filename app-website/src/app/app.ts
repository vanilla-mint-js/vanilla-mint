import { $router } from '@vanilla-mint/router-dom';
import { $a, $div, $footer, $h1, $header, $main, $section } from '@vanilla-mint/dom';
import { $vmForm } from '@vanilla-mint/forms';
import { $navLink } from './components/nav-link.component';
import { $navBar } from './components/nav-bar.component';
import { basePath, frameworkPath, librariesPath, toolsPath } from './constants/paths.constant';
const libraries = [
  'dom',
  'router',
  'dom-router',
  'core'
];
export const companyId = 'c2f57fb2-d19a-4f9f-b299-34ed310375fc';
const apiBase = `https://issessvim.hievilmath.org/api/company/${companyId}`;

document.querySelector('#app')!.appendChild(
  $router({
    className: 'min-h-[100vh] flex flex-col items-stretch justify-stretch w-full',
    children: [
      {
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
            $main({ className: `grow`, children: [
              $div({ className: `outlet grow` })
            ] }),
            $footer({
              className: 'text-surface bg-surface-contrast flex flex-row justify-around items-center py-2', children: [
                $div({ textContent: 'Vanilla Mint JS' })
              ]
            })
          ]
        }),
        children: [
          { path: '/',
            loader: async () => {
              const response = await fetch(`${apiBase}/note`, {method: 'GET', headers: {'Content-Type': 'application/json'}});
              const notes = await response.json();
              return {notes};
            },
            render: ({data}) => $div({ children: [
            $h1({ textContent: 'Home with router-dom' }),
            ...data.notes.map((note: any) => $div({textContent: note.title})),
            $vmForm({
              config: {
                firstName: {
                  type: 'text'
                },
                lastName: {
                  type: 'text'
                }
              },
              value: {firstName: 'string', lastName: 'string'},
              onSubmit: (things) => console.warn(things) as any,
              onChange: (things) => console.warn(things) as any,
              layout: [['firstName', 'lastName']]
            }),
          ] }) },
          { path: toolsPath, render: () => $div({ children: [$h1({ textContent: 'Tools' })] }) },
          { path: frameworkPath, render: () => $div({ children: [$h1({ textContent: 'Framework' })] }) },
          {
            path: librariesPath,
            render: () => $div({ textContent: 'libszzz', className: 'libs', children: [$div({ className: 'outlet' })] }),

            children: [
              // { path: '/libraries', loader: () => { }, render: () => $div({  }) },
              {
                path: `/:library`,
                render: ({ params }) => {
                  console.warn({ params })
                  return $section({
                    children: [$h1({ textContent: params?.library }), $div({className: 'outlet'})]
                  });
                },
                children: [
                  {
                    path: `/:version`,
                    render: ({ params }) => {
                      console.warn({ params })
                      return $section({
                        children: [$h1({ textContent: params?.version })]
                      });
                    },
                  },
                ]
              },
              {
                path: '',
                render: () => $div({
                  children: [
                    $h1({ textContent: 'Libraries' }),
                    $div({
                      className: 'flex flex-wrap flex-row gap-4 items-stretch justify-between',
                      children: libraries.map(_ =>
                        $a({
                          href: `${librariesPath}/${_}`,
                          children: [$div({
                            className: 'p-4 rounded-sm border border-primary',
                            textContent: `@vanilla-mint/${_}`
                          })]
                        }))
                    }),
                    $div({ className: 'outlet' })
                  ]
                })
              },
            ],
          }
        ],
      },
    ]
  }));