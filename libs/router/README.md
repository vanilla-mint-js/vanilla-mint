# @vanilla-mint/router

## Design goals

- DRYness
- Simplicity
- No language server or magic compilation (outside of TypeScript)
- Type safety
- Flexibility
- Portability
- Familiarity

## Example counter app

### Signals, tailwind, and a button functional component

```js
import { $b, $button, $div, TElementProps } from "@vanilla-mint/router";
import { signal, effect } from "@preact/signals";

// button.component.ts
type TBtnProps = Pick<TElementProps, 'textContent'> & {onclick: Function, variant: 'plus' | 'minus'};

const $btn = ({variant, ...props}: TBtnProps) => $button({
  ...props,
  className: `${{plus: 'bg-green-800 rounded-r-2xl', minus: 'bg-red-800 rounded-l-2xl'}[variant]} p-8 rounded text-2xl font-bold hover:opacity-100 opacity-50 cursor-pointer hover:scale-[102%]`,
});



// main.ts
const count = signal(0);

const label = $b({ style: { fontSize: '8rem' } });
effect(() => { label.textContent = `${count.value}`; });

document.querySelector<HTMLDivElement>('#app')!
  .appendChild(
    $div({
      className: 'bg-teal-400 min-h-screen grid place-items-center',
      children: [
        $div({
          className: 'w-[50%] flex flex-row justify-between items-center gap-16 rounded-xl',
          children: [
            $btn({onclick: () => count.value--, textContent: '-', variant: 'minus'}),
            label,
            $btn({onclick: () => count.value++, textContent: '+', variant: 'plus'}),
          ]
        })
      ]
    })
  );
```

### Signals and inline styles

```js
import { $b, $button, $div } from "@vanilla-mint/router";
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
```

### Signals and tailwind

```js
import { $b, $button, $div } from "@vanilla-mint/router";
import { signal, effect } from "@preact/signals";

const count = signal(0);

const buttonClassName = 'p-8 rounded text-2xl font-bold hover:opacity-100 opacity-50 cursor-pointer hover:scale-[102%]';

const label = $b({ style: { fontSize: '8rem' } });
effect(() => { label.textContent = `${count.value}`; });

const minus = $button({ textContent: '-', className: `${buttonClassName} bg-red-800 rounded-l-2xl` });
minus.onclick = () => count.value--; // declare handler outside  declaration

const plus = $button({
  textContent: '+',
  className: `${buttonClassName} bg-green-800 rounded-r-2xl`,
  onclick: () => count.value++ // declare handler as part of declaration
});

document.querySelector<HTMLDivElement>('#app')!
  .appendChild(
    $div({
      className: 'bg-teal-400 min-h-screen grid place-items-center',
      children: [
        $div({
          className: 'w-[50%] flex flex-row justify-between items-center gap-16 rounded-xl',
          children: [
            minus, label, plus
          ]
        })
      ]
    })
  );
```