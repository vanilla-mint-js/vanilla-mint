import { _$, $ } from "@vanilla-mint/core";
import { mint } from "./lib-v2";

const border = 'solid 1px orange';
const flex = { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' };

const fontSize = 32
const fontFamily = "Arial"



const $button = mint('but-ton', ['color'], {
  vmConnected(_) {
    const colors = ['red', 'orange', 'yellow'];
    let i = 1;
    _.vmSetStyles({ padding: '2rem' });
    _.vmOnChangedAttr('color', (backgroundColor) => {
      console.warn({ backgroundColor })
      _.vmSetStyles({ backgroundColor });
    });
    _.vmOnEvent('click', () => _.vmSetAttrs({ color: colors[i++ % colors.length] }))
  }
});

const $canvas = mint('can-vas', ['phrase', 'width', 'height'], {
  vmConnected(_) {
    const canvas = $<HTMLCanvasElement>({ tag: 'canvas' });
    // const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    (window as any).lee = canvas;
    _.vmAppendChild(canvas);

    _.vmOnChangedAttrs(['phrase', 'width', 'height'], ([text, w, h]) => {
      const width = Number(w);
      const height = Number(h);
      _.vmSetStyles({  width: `${w}px`, height: `${h}px` });
      // ___.textContent = _value;

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${canvas.width}px`;
      canvas.style.height = `${canvas.height}px`;
      console.warn({ _value: text, w, h, ctx, cw: canvas.width, ch: canvas.height });
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Calculate center position
      const x = canvas.width / 2;
      const y = canvas.height / 2;

      // Draw text
      ctx.fillText(text, x, y);

      // Optional: Add a border to visualize canvas bounds
      ctx.strokeStyle = '#dddddd';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

    });
  }
});

const $input = (props: Partial<HTMLInputElement>) => $<HTMLInputElement>({ tag: 'input', ...props });

const canvas = $canvas({ width: window.innerHeight * .8, height: window.innerWidth * .8 } as any);
const count = $input({ value: '337', onchange: (e: any) => { console.warn('$input.onchange', e.target?.value); handleChange(e.target?.value); } });

function inc() {
  handleChange((Number(count.value) + 1).toString());
}

function dec() {
  handleChange((Number(count.value) - 1).toString());
}

function handleChange(_value: string) {
  console.warn({ handleChange: _value });
  count.value = _value;
  canvas.setAttribute('phrase', _value);
  console.warn({ canvas })
}

_$(document.body,
  $({
    tag: 'div',
    styles: { height: '100vh', boxSizing: 'border-box', backgroundColor: 'navy', color: 'white', ...flex, flexDirection: 'column' },
    $$: [
      $({
        styles: { boxSizing: 'border-box', border, ...flex, padding: '1rem', flex: 1 },
        tag: 'div',
        $$: [
          $button({
            onclick: dec,
            textContent: '-',
          }),
          count,
          $button({
            onclick: inc,
            textContent: '+',
          }),
        ]
      }),
      canvas,
    ]
  })
);