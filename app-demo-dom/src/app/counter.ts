import { $b, $button, $div } from "@vanilla-mint/dom";
import { signal, effect } from "@preact/signals-core";

const count = signal(0);

const label = $b({ style: { fontSize: '2rem' } });
effect(() => { label.textContent = `${count.value}`; });

const minus = $button({ style: { backgroundColor: 'red' }, textContent: '-' });
minus.onclick = () => count.value--; // declare handler outside  declaration optionally

// declare handler as part of declaration optionally
const plus = $button({ style: { backgroundColor: 'green' }, textContent: '+', onclick: () => count.value++ } as any);


document.querySelector<HTMLDivElement>('#app')!
  .appendChild(
    $div({
      className: 'main',
      style: {
        height: '100vh',
        display: 'grid',
        placeItems: 'center'
      },
      children: [
        $div({
          className: 'counter',
          style: {
            padding: '1rem',
            borderRadius: '.25rem',
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