// router.ts
export interface Route<TElement extends HTMLElement = HTMLElement> {
    path: string;
    render: (params?: any) => string | TElement; // Returns HTML string for simplicity
}

// Main Router class
export class Router {
    private routes: Route[] = [];
    private notFoundHandler: () => string;

    constructor(notFoundHandler: () => string = () => '<h1>404 - Page Not Found</h1>') {
        this.notFoundHandler = notFoundHandler;
        this.init();
    }

    // Add a route
    public route<TElement extends HTMLElement>(path: string, render: Route['render']): void {
        this.routes.push({ path, render });
    }

    // Initialize router and event listeners
    private init(): void {
        // Handle initial page load
        window.addEventListener('load', () => this.navigate());
        // Handle popstate (back/forward buttons)
        window.addEventListener('popstate', () => this.navigate());
        // Handle link clicks
        document.addEventListener('click', this.handleLinkClick.bind(this));
    }

    // Handle navigation link clicks
    private handleLinkClick(event: Event): void {
        const target = event.target as HTMLElement;
        const link = target.closest('a[data-nav]');

        if (link) {
            event.preventDefault();
            const href = link.getAttribute('href');
            if (href) {
                this.go(href);
            }
        }
    }

    // Navigate to a path
    public go(path: string): void {
        window.history.pushState({}, '', path);
        this.navigate();
    }

    // Match route and render
    private navigate(): void {
        const currentPath = window.location.pathname;
        const match = this.routes.map(route => ({
          route,
          result: this.matchRoute(route.path, currentPath)
        })).find(m => m.result.matches);

        const content = match
          ? match.route.render(match.result.params)
          : this.notFoundHandler();
        this.render(content);
      }

    private matchRoute(routePath: string, currentPath: string): { matches: boolean; params?: Record<string, string> } {
        const routeParts = routePath.split('/').filter(Boolean);
        const currentParts = currentPath.split('/').filter(Boolean);
        console.warn({routeParts, currentParts})

        if (routeParts.length !== currentParts.length) {
          return { matches: false };
        }

        const params: Record<string, string> = {};
        let matches = true;

        routeParts.forEach((part, index) => {
          if (part.startsWith(':')) {
            params[part.slice(1)] = currentParts[index];
          } else if (part !== currentParts[index]) {
            matches = false;
          }
        });

        const things = { matches, params: Object.keys(params).length ? params : undefined };
        console.warn({things})
        return things;
      }

    // Render content to the DOM
    private render<TElement extends HTMLElement>(content: string | TElement): void {
        const app = document.getElementById('app');
        if (app) {
            if (typeof content === 'string') {
                app.innerHTML = content;
            } else {
                app.innerHTML = '';
                app.appendChild(content);
            }
        }
    }
}
