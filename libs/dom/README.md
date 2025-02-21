# @vanilla-mint/dom

## Counter App

```js
import { $b, $button, $div } from "@vanilla-mint/dom";
import { signal, effect } from "@preact/signals"; // optional

const count = signal(0);

const label = $b({ style: { fontSize: '2rem' } });
effect(() => { label.textContent = `${count.value}`; });

const minus = $button({ style: { backgroundColor: 'red' }, textContent: '-' });
minus.onclick = () => count.value--;

const plus = $button({ style: { backgroundColor: 'green' }, textContent: '+' });
plus.onclick = () => count.value++;

document.querySelector<HTMLDivElement>('#app')!
  .appendChild(
    $div({
      className: 'main', // tailwind classes ideally would go here
      style: {
        height: '100vh', // inline is OK too... using same type-safety as React
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
```