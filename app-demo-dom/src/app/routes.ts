import { Router } from '@vanilla-mint/router';
import {$counter} from './counter';

const router = new Router();

const homePage = () => `
  <div>
    <h1>Home</h1>
    <nav>
      <a href="/about" data-nav>About</a>
      <a href="/contact" data-nav>Contact</a>
      <a href="/counter" data-nav>Counter</a>
    </nav>
  </div>
`;

const aboutPage = () => `
  <div>
    <h1>About</h1>
    <a href="/" data-nav>Home</a>
  </div>
`;

const contactPage = () => `
  <div>
    <h1>Contact</h1>
    <a href="/" data-nav>Home</a>
  </div>
`;

router.route('/', homePage);
router.route('/about', aboutPage);
router.route('/contact', contactPage);
router.route('/counter', () => $counter());
