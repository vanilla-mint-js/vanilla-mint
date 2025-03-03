import { $button, $div, $label, $main, CSSProperties } from "@vanilla-mint/dom";
import { signal, effect } from "@preact/signals-core";

const baseStyles: CSSProperties = { padding: '1rem', borderRadius: '.5rem', boxSizing: 'border-box' };

export const $counter = (_count = 0) => {

  const count = signal(_count);

  const label = $label();

  effect(() => {
    label.textContent = count.value.toString();
  });

  const minus = $button({ style: { ...baseStyles, }, textContent: '-', onclick: () => count.value-- });
  const plus = $button({ style: { ...baseStyles, }, textContent: '+', onclick: () => count.value++ });

  return $main({
    className: 'blah tailwind-goes-here-instead-of-inline-css-ideally',
    style: {
      height: '100vh',
      display: 'grid',
      placeItems: 'center'
    },
    children: [
      $div({
        style: {
          ...baseStyles,
          border: 'solid 1px black',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem'
        },
        children: [
          minus, label, plus
        ]
      })
    ]
  });
};