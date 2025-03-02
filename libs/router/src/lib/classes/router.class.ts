export interface Route<TElement extends HTMLElement = HTMLElement> {
    path: string;
    render: (resolution: { params: any, data: any }) => TElement;
    children?: Route[];
    outlet?: string;
    loader?: (params: any) => any
}

export class Router {
    private notFoundHandler: Route['render'];

    static forRoot(routes: Route[], hostElement: HTMLElement): Router {
        return new Router(routes, hostElement)
    }

    constructor(public routes: Route[], public hostElement: HTMLElement) {
        this.notFoundHandler = () => document.createElement('h1');
        this.init();
    }

    public register(route: Route): void {
        this.routes.push(route);
    }

    private init(): void {
        window.addEventListener('load', () => this.navigate());
        window.addEventListener('popstate', () => this.navigate());
        document.addEventListener('click', this.handleLinkClick.bind(this));
    }

    private handleLinkClick(event: Event): void {
        const target = event.target as HTMLElement;
        const link = target.closest('a');

        if (link) {
            event.preventDefault();
            const href = link.getAttribute('href');
            if (href) {
                this.go(href);
            }
        }
    }

    public async go(path: string): Promise<void> {
        window.history.pushState({}, '', path);
        await this.navigate();
    }

    private async navigate(): Promise<void> {
        const currentPath = window.location.pathname;
        const content = await this.resolveRoute(this.routes, currentPath, '', false);

        this.createRoot(content);
    }

    private async resolveRoute(routes: Route[], currentPath: string, basePath: string, disable404: boolean) {
        const matchingRoutes = routes.map(route => {
            const fullPath = `${basePath}${route.path}`.replace('//', '/');
            const match = this.matchRoute(fullPath, currentPath);
            return { route, match };
        }).sort((r1, r2) => r1.route.path.lastIndexOf('/') < r2.route.path.lastIndexOf('/') ? 1 : -1);

        const pathMatch = matchingRoutes.find(m => m.match.matches);

        if (!pathMatch) {
            return disable404 ? '' : this.notFoundHandler({ params: {}, data: {} });
        }

        const { route, match } = pathMatch;
        const remainingPath = currentPath.slice(match.matchedLength);

        let data: any = {};
        const params = match.params || {};

        if (typeof route.loader === 'function') {
            const assertOutput = route.loader(params)
            data = isPromise(assertOutput) ? await assertOutput : assertOutput;
        }

        let parentContent = route.render({ params, data: {} });

        if (route.children && remainingPath) {
            const fullPath = `${basePath}${route.path}`.replace('//', '/');
            const nestedContent = await this.resolveRoute(route.children, remainingPath, fullPath, true);
            console.warn({ nestedContent })

            // If there's an outlet specified and nested content, handle the insertion
            if (route.outlet && nestedContent) {

                const outletElement = parentContent.querySelector(route.outlet);
                if (outletElement) {
                    if (typeof nestedContent === 'string') {
                        outletElement.innerHTML = nestedContent;
                    } else {
                        outletElement.innerHTML = '';
                        outletElement.appendChild(nestedContent);
                    }
                }
            }
        }

        return parentContent;
    }

    private matchRoute(routePath: string, currentPath: string): {
        matches: boolean;
        params?: Record<string, string>;
        matchedLength: number;
    } {
        const routeParts = routePath.split('/').filter(Boolean);
        const currentParts = currentPath.split('/').filter(Boolean);

        if (routeParts.length > currentParts.length) {
            return { matches: false, matchedLength: 0 };
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

        return {
            matches,
            params: Object.keys(params).length ? params : undefined,
            matchedLength: matches ? routeParts.length : 0
        };
    }

    private createRoot<TElement extends HTMLElement>(content: string | TElement): void {
        const app = this.hostElement;
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

function isPromise(value: any) {
    return (typeof value?.then) === 'function';
}