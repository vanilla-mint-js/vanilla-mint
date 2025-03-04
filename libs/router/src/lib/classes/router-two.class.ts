interface Route<TElement extends HTMLElement = HTMLElement> {
    path: string;
    render: (resolution: { params: Record<string, string>; data: any }) => TElement;
    children?: Route[];
    outlet?: string;
    loader?: (params: Record<string, string>) => any;
}

export class RouterTwo {
    private notFoundHandler: Route['render'];
    history: typeof window.history = window.history;
    location: typeof window.location = window.location;

    static forRoot(routes: Route[], hostElement: HTMLElement, history?: typeof window.history, location?: typeof window.location): RouterTwo {
        const router = new RouterTwo(routes, hostElement);
        if (history) { router.history = history; }
        if (location) { router.location = location; }
        console.log('[Router] Creating router instance with routes:', routes);
        return router;
    }

    constructor(public routes: Route[], public hostElement: HTMLElement) {
        console.log('[Router] Initializing with host element:', hostElement);
        this.notFoundHandler = () => {
            console.log('[Router] Using default 404 handler');
            const el = document.createElement('h1');
            el.textContent = '404 - Not Found';
            return el;
        };

        this.init();
    }

    private init(): void {
        console.log('[Router] Setting up event listeners');
        window.addEventListener('load', () => {
            console.log('[Router] Window load event triggered');
            this.navigate();
        });
        window.addEventListener('popstate', () => {
            console.log('[Router] Popstate event triggered');
            this.navigate();
        });
        document.addEventListener('click', this.handleLinkClick.bind(this));
    }

    private handleLinkClick(event: Event): void {
        console.log('[Router] Click event detected');
        const target = event.target as HTMLElement;
        const link = target.closest('a');

        if (link) {
            const href = link.getAttribute('href');
            console.log('[Router] Found link with href:', href);
            if (href?.startsWith('/')) {
                console.log('[Router] Internal link detected, preventing default');
                event.preventDefault();
                this.go(href);
            } else {
                console.log('[Router] External link, letting browser handle it');
            }
        } else {
            console.log('[Router] No link found in click target');
        }
    }

    public async go(path: string): Promise<void> {
        console.log('[Router] Navigating to path:', path);
        window.history.pushState({}, '', path);
        await this.navigate();
    }

    private async navigate(): Promise<void> {
        const currentPath = window.location.pathname;
        console.log('[Router] Starting navigation for path:', currentPath);
        const content = await this.resolveRoutes(this.routes, this.splitPath(currentPath));
        console.log('[Router] Navigation resolved, rendering content');
        this.renderContent(content);
    }

    private async resolveRoutes(routes: Route[], requestedSegments: string[], traversedSegments: string[] = []): Promise<HTMLElement> {
        const params: any = {};
        const data: any = {};
        let matchingRoute: Route | undefined = undefined;

        for (let route of routes) {
            const segments = [...traversedSegments, ...this.splitPath(route.path)];
            const requestedSegmentsLength = requestedSegments?.length || 0;
            let thisRouteMatches = true;

            if (segments?.length === requestedSegmentsLength) {
                for (let r = 0; r < requestedSegmentsLength; r++) {
                    const requestedSegment = requestedSegments[r];
                    const segment = segments[r];

                    if(requestedSegment === segment) {
                        continue;
                    }

                    if(requestedSegment.includes(':')) {
                        params[requestedSegment.replace(':', '')] = decodeURIComponent(segments[r]);
                        continue;
                    }

                    break;
                }
            } else {
                thisRouteMatches = false;
            }


        }

        return this.notFoundHandler({ params: {}, data: {} });
    }

    private async processChildRoute(route: Route, basePath: string, parentParams: Record<string, string>): Promise<HTMLElement> {
        console.log('[Router] Processing child route:', route.path, 'with basePath:', basePath);
        const data = await this.loadData(route, { ...parentParams });
        return route.render({ params: parentParams, data });
    }

    private insertNestedContent(parentContent: HTMLElement, outlet: string | undefined, childContent: HTMLElement): void {
        if (outlet) {
            console.log('[Router] Route has outlet:', outlet);
            const outletElement = parentContent.querySelector(outlet);
            if (outletElement) {
                console.log('[Router] Found outlet element, inserting nested content');
                outletElement.innerHTML = '';
                outletElement.appendChild(childContent);
            } else {
                console.log('[Router] No outlet element found for:', outlet);
            }
        } else {
            console.log('[Router] No outlet specified, appending nested content');
            parentContent.appendChild(childContent);
        }
    }

    private findMatchingRoute(routes: Route[], currentPath: string, basePath: string) {
        console.log('[Router] Finding matching route among:', routes.map(r => r.path));

        // Map routes to their matches
        const matchingRoutes = routes.map(route => {
            let fullPath = `${basePath}/${route.path}`.replace('//', '/');

            // Handle empty path special case
            if (route.path === '' || route.path === '/') {
                fullPath = basePath || '/';
            }

            const match = this.matchRoute(fullPath, currentPath);
            console.log('[Router] Checking route:', fullPath, 'Match result:', match);
            return { route, match };
        }).filter(m => m.match.matches);

        console.log('[Router] Found matching routes:', matchingRoutes.map(m => m.route.path));

        // Sort by specificity - longest match first
        matchingRoutes.sort((a, b) => b.match.matchedLength - a.match.matchedLength);

        const selectedMatch = matchingRoutes[0];
        console.log('[Router] Selected most specific match:', selectedMatch?.route.path);
        return selectedMatch;
    }

    private matchRoute(routePath: string, currentPath: string): {
        matches: boolean;
        params: Record<string, string>;
        matchedLength: number;
    } {
        console.log('[Router] Matching route path:', routePath, 'against:', currentPath);

        // Special case for root path
        if (routePath === '/' && (currentPath === '/' || currentPath === '')) {
            return { matches: true, params: {}, matchedLength: 1 };
        }

        // Special case for empty path (index routes)
        if (routePath === '') {
            return { matches: true, params: {}, matchedLength: 0 };
        }

        const routeParts = this.splitPath(routePath);
        const currentParts = this.splitPath(currentPath);
        console.log('[Router] Route parts:', routeParts, 'Current parts:', currentParts);

        const params: Record<string, string> = {};
        let matches = true;
        let matchedLength = 0;

        for (let i = 0; i < routeParts.length; i++) {
            const routePart = routeParts[i];
            const currentPart = currentParts[i];

            // If we've reached the end of the current path parts but still have route parts,
            // only continue matching if the current path exactly matches the route path so far
            if (currentPart === undefined) {
                matches = false;
                break;
            }

            if (routePart.startsWith(':')) {
                console.log('[Router] Found param at position', i, ':', routePart.slice(1));
                params[routePart.slice(1)] = currentPart;
                matchedLength += currentPart.length + 1;
            } else if (routePart !== currentPart) {
                console.log('[Router] Path segments don\'t match:', routePart, '!=', currentPart);
                matches = false;
                break;
            } else {
                console.log('[Router] Path segments match:', routePart);
                matchedLength += currentPart.length + 1;
            }
        }

        console.log('[Router] Match result:', { matches, params, matchedLength });
        return { matches, params, matchedLength };
    }

    private async loadData(route: Route, params: Record<string, string>): Promise<any> {
        console.log('[Router] Loading data for route:', route.path);
        if (typeof route.loader === 'function') {
            console.log('[Router] Route has loader, executing');
            const result = route.loader(params);
            const data = isPromise(result) ? await result : result;
            console.log('[Router] Loader returned:', data);
            return data;
        }
        console.log('[Router] No loader defined, returning empty data');
        return {};
    }

    private splitPath(path: string): string[] {
        const parts = path.split('/').filter(Boolean);
        console.log('[Router] Split path:', path, 'into:', parts);
        return parts;
    }

    private renderContent(content: HTMLElement): void {
        console.log('[Router] Rendering content to host element');
        this.hostElement.innerHTML = '';
        this.hostElement.appendChild(content);
    }
}

function isPromise(value: any): value is Promise<any> {
    return typeof value?.then === 'function';
}