import { Router, Route } from './router.class'; // Adjust import path as needed

// Mock window and document methods
const originalHistoryPushState = window.history.pushState;
const originalWindowAddEventListener = window.addEventListener;
const originalDocumentAddEventListener = document.addEventListener;
const originalQuerySelector = Element.prototype.querySelector;

describe('Router', () => {
  let hostElement: HTMLElement;

  beforeEach(() => {
    // Create a clean host element for each test
    hostElement = document.createElement('div');
    document.body.appendChild(hostElement);

    // Mock navigation functions
    window.history.pushState = jest.fn();
    window.addEventListener = jest.fn();
    document.addEventListener = jest.fn() as jest.Mock;

    // Reset location pathname
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/'
      },
      writable: true
    });

    // Restore original querySelector before mocking
    Element.prototype.querySelector = originalQuerySelector;

    // Spy on console.log
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    // Clean up DOM
    if (document.body.contains(hostElement)) {
      document.body.removeChild(hostElement);
    }

    // Restore original methods
    window.history.pushState = originalHistoryPushState;
    window.addEventListener = originalWindowAddEventListener;
    document.addEventListener = originalDocumentAddEventListener;
    Element.prototype.querySelector = originalQuerySelector;

    jest.clearAllMocks();
  });

  // Test helper to create elements with unique content
  const createTestElement = (text: string): HTMLElement => {
    const element = document.createElement('div');
    element.setAttribute('data-testid', text);
    element.textContent = text;
    return element;
  };

  // Test 1: Basic routing with a single route
  test('should handle basic routing with a single route', async () => {
    // Setup
    const homeRoute: Route = {
      path: '/',
      render: ({ params, data }) => createTestElement('home')
    };

    window.location.pathname = '/';

    // Create router instance
    const router = Router.forRoot([homeRoute], hostElement);

    // Trigger navigation
    await router['navigate']();

    // Assert
    expect(hostElement.innerHTML).toContain('home');
    expect(hostElement.querySelector('[data-testid="home"]')).not.toBeNull();
  });

  // Test 2: Multiple routes
  test('should match the correct route among multiple routes', async () => {
    // Setup
    const routes: Route[] = [
      {
        path: '/',
        render: ({ params, data }) => createTestElement('home')
      },
      {
        path: '/about',
        render: ({ params, data }) => createTestElement('about')
      },
      {
        path: '/contact',
        render: ({ params, data }) => createTestElement('contact')
      }
    ];

    window.location.pathname = '/about';

    // Create router instance
    const router = Router.forRoot(routes, hostElement);

    // Trigger navigation
    await router['navigate']();

    // Assert
    expect(hostElement.innerHTML).toContain('about');
    expect(hostElement.querySelector('[data-testid="about"]')).not.toBeNull();
    expect(hostElement.querySelector('[data-testid="home"]')).toBeNull();
  });

  // Test 3: Parameterized routes
  test('should extract parameters from parameterized routes', async () => {
    // Setup - Create a route with a parameter
    const userRoute: Route = {
      path: '/users/:id',
      render: ({ params, data }) => {
        const element = createTestElement(`user-${params['id']}`);
        element.setAttribute('data-param-id', params['id']);
        return element;
      }
    };

    window.location.pathname = '/users/123';

    // Create router instance
    const router = Router.forRoot([userRoute], hostElement);

    // Trigger navigation
    await router['navigate']();

    // Assert
    expect(hostElement.innerHTML).toContain('user-123');
    expect(hostElement.querySelector('[data-testid="user-123"]')).not.toBeNull();
    expect(hostElement.querySelector('[data-param-id="123"]')).not.toBeNull();
  });

  // Test 4: Nested routes with parent/child relationship
  test('should handle nested routes with parent/child relationship', async () => {
    // Set up a mock implementation for Element.querySelector
    // that maintains a reference to the actual nested elements
    let dashboardElement: HTMLElement | null = null;

    Element.prototype.querySelector = function(selector: string): Element | null {
      // For the host element, return our tracked dashboard element
      if (this === hostElement && dashboardElement && selector === '[data-testid="dashboard"]') {
        return dashboardElement;
      }

      // For the dashboard element, find the actual outlet
      if (dashboardElement && this === dashboardElement && selector === '[data-outlet-id="dashboard-outlet"]') {
        return dashboardElement.querySelector('[data-outlet-id="dashboard-outlet"]');
      }

      // Default behavior
      return originalQuerySelector.call(this, selector);
    };

    // Setup
    const routes: Route[] = [
      {
        path: '/dashboard',
        render: ({ params, data }) => {
          // Create dashboard element with outlet
          const element = createTestElement('dashboard');
          const outlet = document.createElement('div');
          outlet.setAttribute('data-outlet-id', 'dashboard-outlet');
          element.appendChild(outlet);

          // Save reference to dashboard element
          dashboardElement = element;

          return element;
        },
        outlet: '[data-outlet-id="dashboard-outlet"]',
        children: [
          {
            path: '/settings',
            render: ({ params, data }) => createTestElement('settings')
          }
        ]
      }
    ];

    window.location.pathname = '/dashboard/settings';

    // Create router instance
    const router = Router.forRoot(routes, hostElement);

    // Trigger navigation
    await router['navigate']();

    // Output the HTML content for debugging
    console.log('Host element HTML:', hostElement.innerHTML);

    // Assert
    expect(hostElement.querySelector('[data-testid="dashboard"]')).not.toBeNull();

    // Verify child route content is rendered
    const dashboardOutlet = hostElement.querySelector('[data-outlet-id="dashboard-outlet"]');
    expect(dashboardOutlet).not.toBeNull();
    expect(dashboardOutlet?.innerHTML).toContain('settings');
  });

  // Test 5: Empty path child routes (index routes)
  test('should render index routes (empty path child routes)', async () => {
    // Set up a mock implementation for Element.querySelector
    // that maintains a reference to the actual nested elements
    let productsElement: HTMLElement | null = null;

    Element.prototype.querySelector = function(selector: string): Element | null {
      // For the host element, return our tracked products element
      if (this === hostElement && productsElement && selector === '[data-testid="products"]') {
        return productsElement;
      }

      // For the products element, find the actual outlet
      if (productsElement && this === productsElement && selector === '[data-outlet-id="products-outlet"]') {
        return productsElement.querySelector('[data-outlet-id="products-outlet"]');
      }

      // Default behavior
      return originalQuerySelector.call(this, selector);
    };

    // Setup
    const routes: Route[] = [
      {
        path: '/products',
        render: ({ params, data }) => {
          // Create products element with outlet
          const element = createTestElement('products');
          const outlet = document.createElement('div');
          outlet.setAttribute('data-outlet-id', 'products-outlet');
          element.appendChild(outlet);

          // Save reference to products element
          productsElement = element;

          return element;
        },
        outlet: '[data-outlet-id="products-outlet"]',
        children: [
          {
            path: '', // Empty path = index route
            render: ({ params, data }) => createTestElement('products-index')
          },
          {
            path: '/details',
            render: ({ params, data }) => createTestElement('products-details')
          }
        ]
      }
    ];

    window.location.pathname = '/products';

    // Create router instance
    const router = Router.forRoot(routes, hostElement);

    // Trigger navigation
    await router['navigate']();

    // Output the HTML content for debugging
    console.log('Host element HTML:', hostElement.innerHTML);

    // Assert
    expect(hostElement.querySelector('[data-testid="products"]')).not.toBeNull();

    // Verify index route content is rendered
    const productsOutlet = hostElement.querySelector('[data-outlet-id="products-outlet"]');
    expect(productsOutlet).not.toBeNull();
    expect(productsOutlet?.innerHTML).toContain('products-index');
    expect(productsOutlet?.innerHTML).not.toContain('products-details');
  });

  // Test 6: Navigation API
  test('should navigate to a new route with go() method', async () => {
    // Setup
    const routes: Route[] = [
      {
        path: '/',
        render: ({ params, data }) => createTestElement('home')
      },
      {
        path: '/about',
        render: ({ params, data }) => createTestElement('about')
      }
    ];

    window.location.pathname = '/';

    // Create router instance
    const router = Router.forRoot(routes, hostElement);

    // Trigger initial navigation
    await router['navigate']();

    // Assert initial state
    expect(hostElement.innerHTML).toContain('home');

    // Mock location change when go() is called
    window.location.pathname = '/about';

    // Navigate programmatically
    await router.go('/about');

    // Assert new state
    expect(hostElement.innerHTML).toContain('about');
    expect(hostElement.querySelector('[data-testid="about"]')).not.toBeNull();
    expect(window.history.pushState).toHaveBeenCalledWith({}, '', '/about');
  });

  // Test 7: 404 Not Found
  test('should render 404 page when no route matches', async () => {
    // Setup
    const routes: Route[] = [
      {
        path: '/',
        render: ({ params, data }) => createTestElement('home')
      },
      {
        path: '/about',
        render: ({ params, data }) => createTestElement('about')
      }
    ];

    window.location.pathname = '/nonexistent';

    // Create router instance
    const router = Router.forRoot(routes, hostElement);

    // Trigger navigation
    await router['navigate']();

    // Assert
    expect(hostElement.innerHTML).toContain('404 - Not Found');
  });

  // Test 8: Data loading with loaders
  test('should load data using route loaders', async () => {
    // Setup - Create a route with a loader
    const dataRoute: Route = {
      path: '/data',
      loader: (params) => ({ message: 'Data loaded successfully' }),
      render: ({ params, data }) => {
        const element = createTestElement('data-page');
        element.setAttribute('data-message', data.message);
        return element;
      }
    };

    window.location.pathname = '/data';

    // Create router instance
    const router = Router.forRoot([dataRoute], hostElement);

    // Trigger navigation
    await router['navigate']();

    // Assert
    expect(hostElement.innerHTML).toContain('data-page');
    expect(hostElement.querySelector('[data-message="Data loaded successfully"]')).not.toBeNull();
  });

  // Test 9: Multiple levels of nesting
  test('should handle multiple levels of nesting', async () => {
    // Set up tracked elements for our test
    let appElement: HTMLElement | null = null;
    let dashboardElement: HTMLElement | null = null;

    // Custom implementation of querySelector that can find our nested elements
    Element.prototype.querySelector = function(selector: string): Element | null {
      // Root level - find app
      if (this === hostElement && selector === '[data-testid="app"]') {
        return appElement;
      }

      // App level - find outlet or dashboard
      if (this === appElement) {
        if (selector === '[data-outlet-id="app-outlet"]') {
          return appElement?.querySelector('[data-outlet-id="app-outlet"]');
        }
        if (selector === '[data-testid="dashboard"]') {
          return dashboardElement;
        }
      }

      // Dashboard level - find outlet
      if (this === dashboardElement && selector === '[data-outlet-id="dashboard-outlet"]') {
        return dashboardElement?.querySelector('[data-outlet-id="dashboard-outlet"]');
      }

      // Default
      return originalQuerySelector.call(this, selector);
    };

    // Setup - Create a deeply nested route structure
    const routes: Route[] = [
      {
        path: '/app',
        render: ({ params, data }) => {
          const element = createTestElement('app');
          const outlet = document.createElement('div');
          outlet.setAttribute('data-outlet-id', 'app-outlet');
          element.appendChild(outlet);

          // Save reference
          appElement = element;

          return element;
        },
        outlet: '[data-outlet-id="app-outlet"]',
        children: [
          {
            path: '/dashboard',
            render: ({ params, data }) => {
              const element = createTestElement('dashboard');
              const outlet = document.createElement('div');
              outlet.setAttribute('data-outlet-id', 'dashboard-outlet');
              element.appendChild(outlet);

              // Save reference
              dashboardElement = element;

              return element;
            },
            outlet: '[data-outlet-id="dashboard-outlet"]',
            children: [
              {
                path: '/widgets',
                render: ({ params, data }) => createTestElement('widgets')
              }
            ]
          }
        ]
      }
    ];

    window.location.pathname = '/app/dashboard/widgets';

    // Create router instance
    const router = Router.forRoot(routes, hostElement);

    // Trigger navigation
    await router['navigate']();

    // Output the HTML content for debugging
    console.log('Host element HTML:', hostElement.innerHTML);

    // Assert - Check all levels of nesting
    expect(hostElement.querySelector('[data-testid="app"]')).not.toBeNull();

    const appOutlet = hostElement.querySelector('[data-outlet-id="app-outlet"]');
    expect(appOutlet).not.toBeNull();
    expect(appOutlet?.innerHTML).toContain('dashboard');

    const dashboardOutlet = hostElement.querySelector('[data-outlet-id="dashboard-outlet"]');
    expect(dashboardOutlet).not.toBeNull();
    expect(dashboardOutlet?.innerHTML).toContain('widgets');
  });

  // Test 10: Test click handler for links
  test('should handle link clicks and prevent default', () => {
    // Setup
    const routes: Route[] = [
      {
        path: '/',
        render: ({ params, data }) => createTestElement('home')
      }
    ];

    // Create router instance
    const router = Router.forRoot(routes, hostElement);

    // Get the click handler function
    const clickHandlerCall = (document.addEventListener as jest.Mock).mock.calls.find(
      (call: any[]) => call[0] === 'click'
    );
    if (!clickHandlerCall) {
      throw new Error('Click handler not found');
    }
    const clickHandler = clickHandlerCall[1];

    // Create a link element
    const link = document.createElement('a');
    link.setAttribute('href', '/about');
    document.body.appendChild(link);

    // Create a mock event
    const mockEvent = {
      preventDefault: jest.fn(),
      target: link
    } as unknown as Event;

    // Mock router's go method
    router.go = jest.fn() as jest.MockedFunction<typeof router.go>;

    // Trigger the click handler
    clickHandler(mockEvent);

    // Assert
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(router.go).toHaveBeenCalledWith('/about');

    // Clean up
    document.body.removeChild(link);
  });
});