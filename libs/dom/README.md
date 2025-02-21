# @vanilla-mint/dom

## Quick Start

```
import { $b, $button, $div, TElementProps } from "@vanilla-mint/dom";
import { signal, effect } from "@preact/signals"; // optional

const count = signal(0);

const label = $b();
effect(() => { label.textContent = `${count.value}`; });

const minus = $button(style: { backgroundColor: 'red' });
minus.onclick = () => count.value--;

const plus = $button(style: { backgroundColor: 'green' });
plus.onclick = () => count.value++;

document.querySelector<HTMLDivElement>('#app')!
  .appendChild(
    $div({
      style: {
        className: 'p-8',
        border: 'solid 1px orange',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
      },
      children: [
        minus, label, plus
      ]
    })
  );


```