/**
 * VanillaRouter - An Angular-inspired router implementation for TypeScript
 */

import { isPromise } from "../functions/is-promise.function";

/**
 * Route parameter interface
 */
export interface Params {
  [key: string]: string;
}

/**
 * Route configuration interface
 */
export interface Route<TParams extends Record<string, string> = any, TData = any, TElement extends HTMLElement = HTMLElement> {
  path: string;
  render: (resolution: { params: TParams; data?: TData, search?: any }) => TElement;
  templateUrl?: string;
  redirectTo?: string;
  children?: Route[];
  fullPath?: string;
  paramNames?: string[];
  regex?: RegExp;
  parent?: Route;
  rendered?: HTMLElement;
  loader?: (params: TParams) => Promise<TData> | TData;
}

/**
 * Router configuration interface
 */
export interface RouterConfig {
  routes?: Route[];
  outlet?: string;
  useHash?: boolean;
  baseHref?: string;
}

/**
 * Navigation options interface
 */
export interface NavigationOptions {
  queryParams?: Record<string, string>;
  replaceUrl?: boolean;
}

/**
 * Navigation event detail interface
 */
export interface NavigationEvent {
  route: Route;
  params: Params;
  queryParams: Record<string, string>;
}

/**
 * Main router class
 */
export class VanillaRouter {
  private routes: Route[];
  private outlet: string;
  private useHash: boolean;
  private baseHref: string;
  private currentRoute: Route | null;
  private params: Params;
  private queryParams: Record<string, string>;
  private navigationEvents: EventTarget;

  /**
   * Create a new router instance
   * @param config - Configuration options
   */
  constructor(config: RouterConfig = {}) {
    this.routes = config.routes || [];
    this.outlet = config.outlet!;
    this.useHash = config.useHash || false;
    this.baseHref = config.baseHref || '/';
    this.currentRoute = null;
    this.params = {};
    this.queryParams = {};
    this.navigationEvents = new EventTarget();

    // Normalize routes and prepare regular expressions
    this._normalizeRoutes(this.routes);

    // Initialize router
    this._init();
  }

  /**
   * Initialize the router
   * @private
   */
  private _init(): void {
    // Set up event listeners for navigation
    if (this.useHash) {
      window.addEventListener('hashchange', this._handleLocationChange.bind(this));
    } else {
      // For history API based routing
      window.addEventListener('popstate', this._handleLocationChange.bind(this));

      // Intercept link clicks to use history API
      document.addEventListener('click', (event: MouseEvent) => {
        // Only handle links within the app
        const target = (event.target as Element).closest('a');
        if (target && target.getAttribute('href') && !target.getAttribute('target') &&
          target.hostname === window.location.hostname) {
          event.preventDefault();
          const href = target.getAttribute('href') as string;
          this.navigate(href);
        }
      });
    }

    // Initial navigation based on current URL
    this._handleLocationChange();
  }

  /**
   * Normalize routes and process path patterns
   * @param routes - Routes to normalize
   * @param parentPath - Parent path for nested routes
   * @private
   */
  private _normalizeRoutes(routes: Route[], parentPath: string = '', parentRoute: Route | undefined = undefined): void {
    routes.forEach(route => {
      // Combine parent path with route path for nested routes
      route.fullPath = parentPath + (route.path || '');

      // Convert route path to regular expression for matching
      const pathPattern = route.fullPath.replace(/\/+$/, '') || '/';
      const paramNames: string[] = [];

      // Convert path parameters to regex capture groups
      const regexPath = pathPattern
        .replace(/\/+/g, '\\/')
        .replace(/:[a-zA-Z0-9_]+/g, (match: string) => {
          paramNames.push(match.slice(1)); // Store parameter name without the colon
          return '([^\/]+)';
        });

      route.paramNames = paramNames;
      route.regex = new RegExp(`^${regexPath}($|\\?|\\/)`, 'i');
      route.parent = parentRoute;

      // Process child routes recursively
      if (route.children && Array.isArray(route.children)) {
        this._normalizeRoutes(route.children, route.fullPath + '/', route);
      }
    });
  }

  /**
   * Handle location changes (URL changes)
   * @private
   */
  private _handleLocationChange(): void {
    let path: string;

    if (this.useHash) {
      // Extract the path from hash (e.g., #/users/123 -> /users/123)
      path = window.location.hash.substring(1) || '/';
    } else {
      // Get the path from the URL with baseHref removed
      path = window.location.pathname;
      if (this.baseHref !== '/' && path.startsWith(this.baseHref)) {
        path = path.substring(this.baseHref.length);
      }

      // Ensure path starts with /
      if (!path.startsWith('/')) {
        path = '/' + path;
      }
    }

    // Extract query parameters
    const queryString = window.location.search.substring(1);
    this.queryParams = this._parseQueryParams(queryString);

    // Find matching route
    this._matchRoute(path);
  }

  /**
   * Match the current path to a defined route
   * @param path - Current URL path
   * @private
   */
  private _matchRoute(path: string): void {
    const pathWithoutQuery = path.split('?')[0];

    // Find matching route (check all routes including children)
    const allRoutes = this._getAllRoutes(this.routes);
    const matchedRoute = allRoutes.find(route => {
      if (!route.regex) return false;

      const match = pathWithoutQuery.match(route.regex);
      if (match && route.paramNames) {
        // Extract param values
        this.params = {};
        route.paramNames.forEach((name, index) => {
          this.params[name] = match[index + 1]; // +1 because the first match is the entire string
        });

        if (route.children?.find(child => ((!child.path) || child.path === '/') || (child.regex && pathWithoutQuery.match(child.regex)))) {
          return false;
        }
        return true;
      }
      return false;
    });

    if (matchedRoute) {
      this.currentRoute = matchedRoute;

      // Trigger navigation events
      const event = new CustomEvent('navigation', {
        detail: {
          route: matchedRoute,
          params: this.params,
          queryParams: this.queryParams
        }
      });
      this.navigationEvents.dispatchEvent(event);

      // Render the route component
      this._renderRoute(matchedRoute);
    } else {
      // If no route matches, try to find a wildcard route
      const wildcardRoute = allRoutes.find(route => route.path === '**');
      if (wildcardRoute) {
        this.currentRoute = wildcardRoute;
        this._renderRoute(wildcardRoute);
      } else {
        console.error(`No route found for path: ${path}`);
      }
    }
  }

  /**
   * Get a flattened array of all routes including children
   * @param routes - Routes to flatten
   * @returns Flattened array of routes
   * @private
   */
  private _getAllRoutes(routes: Route[]): Route[] {
    let allRoutes: Route[] = [];

    routes.forEach(route => {
      allRoutes.push(route);

      if (route.children && Array.isArray(route.children)) {
        allRoutes = allRoutes.concat(this._getAllRoutes(route.children));
      }
    });

    return allRoutes;
  }

  /**
   * Render the current route in the outlet
   * @param route - Route to render
   * @private
   */
  private async _renderRoute(route: Route) {
    if (typeof route.redirectTo === 'string') {
      this.navigate(route.redirectTo);
    } else if (typeof route.render === 'function') {

      try {

        let parent: Route['parent'] = route;
        const toRender: Route[] = [];

        while (parent) {
          toRender.unshift(parent);
          parent = parent.parent;
        }

        let lastRenderedRouteElement: HTMLElement | undefined = undefined;

        toRender.forEach(async (routeToRender) => {

          const routeHasParams = !!(routeToRender.paramNames?.filter(Boolean).length);
          if (!routeToRender.rendered || routeHasParams) {
            let data: any = {};
            if (typeof routeToRender.loader === 'function') {
              const dataResponse = routeToRender.loader(this.params);
              data = isPromise(dataResponse) ? await dataResponse : dataResponse;
            }
            routeToRender.rendered = routeToRender.render({ params: this.params, data, search: this.queryParams });
          }

          const host = !lastRenderedRouteElement ? document : lastRenderedRouteElement;
          const slot: HTMLElement = host.querySelector(this.outlet) as any;

          if (!slot) {
            throw new Error(`failed to find slot ${this.outlet} within ${(host as any)!.innerHTML}`)
          }


          if (typeof routeToRender.rendered === 'string') {
            slot.innerHTML = '';
            slot!.innerHTML = routeToRender.rendered;
          } else if (routeToRender.rendered instanceof HTMLElement) {
            slot.replaceChildren(routeToRender.rendered);
            slot!.appendChild(routeToRender.rendered);
          }

          lastRenderedRouteElement = routeToRender.rendered;
        });

      } catch (error) {
        console.error('Error rendering component:', error);
      }
    } else {
      console.error('Invalid route configuration', route);
    }
  }

  /**
   * Parse query parameters from a query string
   * @param queryString - Query string (without the leading ?)
   * @returns Object containing query parameters
   * @private
   */
  private _parseQueryParams(queryString: string): Record<string, string> {
    const params: Record<string, string> = {};
    if (!queryString) return params;

    const pairs = queryString.split('&');
    for (const pair of pairs) {
      const [key, value] = pair.split('=');
      if (key) {
        params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
      }
    }

    return params;
  }

  /**
   * Navigate to a new URL
   * @param path - Path to navigate to
   * @param options - Navigation options
   */
  public navigate(path: string, options: NavigationOptions = {}): void {
    const { queryParams = {}, replaceUrl = false } = options;

    // Build query string
    let queryString = '';
    if (Object.keys(queryParams).length > 0) {
      queryString = '?' + Object.entries(queryParams)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    }

    const fullPath = path + queryString;

    if (this.useHash) {
      // Hash-based navigation
      const hashPath = '#' + (fullPath.startsWith('/') ? fullPath : '/' + fullPath);
      if (replaceUrl) {
        window.location.replace(hashPath);
      } else {
        window.location.hash = hashPath;
      }
    } else {
      // History API navigation
      const url = this.baseHref + (fullPath.startsWith('/') ? fullPath.substring(1) : fullPath);
      if (replaceUrl) {
        window.history.replaceState({}, '', url);
      } else {
        window.history.pushState({}, '', url);
      }

      // Manually trigger route handling since pushState/replaceState doesn't fire popstate
      this._handleLocationChange();
    }
  }

  /**
   * Add an event listener for navigation events
   * @param callback - Callback to call when navigation occurs
   * @returns Function to remove the event listener
   */
  public onNavigation(callback: (event: NavigationEvent) => void): () => void {
    const listener = (event: Event) => {
      if (event instanceof CustomEvent) {
        callback(event.detail as NavigationEvent);
      }
    };
    this.navigationEvents.addEventListener('navigation', listener);
    return () => this.navigationEvents.removeEventListener('navigation', listener);
  }

  /**
   * Get the current active route
   * @returns Current route object
   */
  public getCurrentRoute(): Route | null {
    return this.currentRoute;
  }

  /**
   * Get the current route parameters
   * @returns Route parameters
   */
  public getParams(): Params {
    return { ...this.params };
  }

  /**
   * Get the current query parameters
   * @returns Query parameters
   */
  public getQueryParams(): Record<string, string> {
    return { ...this.queryParams };
  }
}