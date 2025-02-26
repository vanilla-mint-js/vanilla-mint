import { $b, $button, $canvas, $div, $link, $main, CSSProperties } from "@vanilla-mint/dom";
import { signal, effect } from "@preact/signals-core";

const baseStyles: CSSProperties = { padding: '1rem', borderRadius: '.5rem', boxSizing: 'border-box' };

const count = signal(0);

const label = $canvas({ style: { width: '8rem', height: '4rem' } });
const ctx = label.getContext('2d')!;

effect(() => {
  ctx.reset();
  ctx.font = '10rem Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'darkgray';
  ctx.fillText(count.value.toString(), label.width/2, label.height/2);
});

const minus = $button({ style: { ...baseStyles,  }, textContent: '-', onclick: () => count.value-- });
const plus = $button({ style: { ...baseStyles,  }, textContent: '+', onclick: () => count.value++ });

document.head.appendChild($link({
  rel: 'stylesheet',
  href: 'https://cdn.jsdelivr.net/gh/kimeiga/bahunya/dist/bahunya.min.css'
}));

document.querySelector<HTMLDivElement>('#app')!
  .appendChild(
    $main({
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
    })
  );