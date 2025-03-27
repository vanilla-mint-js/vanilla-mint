import { $router } from '@vanilla-mint/router-dom';
import {
  $a,
  $div,
  $footer,
  $h1,
  $h2,
  $header,
  $main,
  $section,
} from '@vanilla-mint/dom';
import { $navLink } from './components/nav-link.component';
import { $navBar } from './components/nav-bar.component';
import { notesPage } from './pages/notes.page';
import { landingPage } from './pages/landing.page';
import { formsPage } from './pages/forms.page';
import { sequencePage } from './pages/sequence.page';
const libraries = ['dom', 'router', 'dom-router', 'core'];
export const companyId = 'c2f57fb2-d19a-4f9f-b299-34ed310375fc';
const apiBase = `https://issessvim.hievilmath.org/api/company/${companyId}`;

export const basePath = '/';
export const frameworkPath = '/framework';
export const librariesPath = '/libraries';
export const notesPath = '/notes';
export const formsPath = '/forms';
export const sequencePath = '/sequence';


document.querySelector('#app')!.appendChild(
  $router({
    className:
      'min-h-[100vh] flex flex-col items-stretch justify-stretch w-full bg-neutral-300 text-neutral-300-contrast',
    children: [
      {
        path: basePath,
        render: () =>
          $div({
            className:
              'grow flex flex-col items-stretch justify-stretch w-full',
            children: [
              $header({
                className:
                  'sticky top-0 bg-neutral-100 text-neutral-100-contrast flex flex-row justify-between items-center p-4 drop-shadow-lg',
                children: [
                  $h1({
                    className: 'font-bold text-2xl text-primary',
                    textContent: 'VanillaMintJS',
                  }),
                  $navBar({
                    children: [
                      $navLink({ href: basePath, textContent: 'Home' }),
                      $navLink({ href: sequencePath, textContent: 'Sequence' }),
                      $navLink({ href: formsPath, textContent: 'Forms' }),
                      $navLink({
                        href: librariesPath,
                        textContent: 'Libraries',
                      }),
                      $navLink({ href: notesPath, textContent: 'Notes' }),
                    ],
                  }),
                ],
              }),
              $main({
                className: `grow flex flex-col justify-stretch items-stretch`,
                children: [$div({ className: `outlet grow flex flex-col justify-stretch items-stretch` })],
              }),
              $footer({
                className:
                  'bg-neutral-200 text-neutral-200-contrast flex flex-row justify-center items-center p-4',
                children: [
                  $div({
                    className: 'font-semibold text-primary',
                    textContent: 'VanillaMintJS 2025',
                  }),
                ],
              }),
            ],
          }),
        children: [
          {
            path: basePath,
            render: landingPage
          },
          {
            path: formsPath,
            render: formsPage
          },
          {
            path: sequencePath,
            render: sequencePage
          },
          {
            path: notesPath,
            render: notesPage,
            loader: async () => {
              const response = await fetch(`${apiBase}/note`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
              });
              const notes = await response.json();
              return { notes };
            },
          },
          {
            path: librariesPath,
            render: () =>
              $div({
                textContent: 'libszzz',
                className: 'libs',
                children: [$div({ className: 'outlet' })],
              }),

            children: [
              {
                path: `/:library`,
                render: ({ params }) => {
                  console.warn({ params });
                  return $section({
                    children: [
                      $h2({ textContent: params?.library }),
                      $div({ className: 'outlet' }),
                      ...[1, 2, 3].map((v) =>
                        $a({
                          className: 'p-2',
                          href: `/libraries/${params.library}/${v}`,
                          textContent: v.toString(),
                        })
                      ),
                    ],
                  });
                },
                children: [
                  {
                    path: `/:version`,
                    render: ({ params }) => {
                      console.warn({ params });
                      return $section({
                        children: [$h2({ textContent: params?.version })],
                      });
                    },
                  },
                ],
              },
              {
                path: '',
                render: () =>
                  $div({
                    children: [
                      $h2({ textContent: 'Libraries' }),
                      $div({
                        className:
                          'flex flex-wrap flex-row gap-4 items-stretch justify-between',
                        children: libraries.map((_) =>
                          $a({
                            href: `${librariesPath}/${_}`,
                            children: [
                              $div({
                                className:
                                  'p-4 rounded-sm border border-primary',
                                textContent: `@vanilla-mint/${_}`,
                              }),
                            ],
                          })
                        ),
                      }),
                      $div({ className: 'outlet' }),
                    ],
                  }),
              },
            ],
          },
        ],
      },
    ],
  })
);
