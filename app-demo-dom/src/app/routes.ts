import { Router } from '@vanilla-mint/router';
import { $counter } from './counter';
import { $a, $div, $h1, $section } from '@vanilla-mint/dom';

const router = new Router();

const homePage = () => `
  <div>
    <h1>Home</h1>
    <nav>
      <a href="/about" data-nav>About</a>
      <a href="/contact" data-nav>Contact</a>
      <a href="/counter/3" data-nav>Counter 3</a>
      <a href="/counter" data-nav>Counter 0</a>
    </nav>
  </div>
`;

const contactPage = () => `
  <div>
    <h1>Contact</h1>
    <a href="/" data-nav>Home</a>
  </div>
`;

router.route('/', homePage);

router.route(
  '/about',
  // () => $section({
  //   children: [
  //     $h1({ textContent: 'About' }),
  //     $a({ href: 'about/hours', textContent: 'Click to see our hours' })
  //   ]
  // }),
  () => `<h1>ABout</h1> <a href="/about/hours" data-nav>Click to see our hours</a><div data-outlet></div>`,
  [{
    path: '/hours',
    render:   () => $section({
      children: [
        $h1({ textContent: 'Hours' }),
        $a({ href: 'about/hours', textContent: '24/7' })
      ]
    }),
  }], '[data-outlet]'
);
router.route('/contact', contactPage);
router.route('/counter/:count', ({ count }) => $counter(count));
router.route('/counter', () => $counter(0));

