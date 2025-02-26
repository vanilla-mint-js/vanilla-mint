// router.ts
export interface Route<TElement extends HTMLElement = HTMLElement> {
    path: string;
    render: () => string | TElement; // Returns HTML string for simplicity
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
    public route<TElement extends HTMLElement>(path: string, render: () => string | TElement): void {
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
        const matchedRoute = this.routes.find(route =>
            this.matchRoute(route.path, currentPath)
        );

        const content = matchedRoute ? matchedRoute.render() : this.notFoundHandler();
        this.render(content);
    }

    // Basic route matching (no params yet)
    private matchRoute(routePath: string, currentPath: string): boolean {
        return routePath === currentPath;
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
