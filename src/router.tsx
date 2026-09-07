import { QueryClient } from '@tanstack/react-query';
import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import AppShell from './components/shell/AppShell.tsx';
import SitesList from './components/sites/SitesList.tsx';

export const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: AppShell,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <div>Pick a section from the sidebar.</div>,
});

// Placeholder page components — replaced with real list/detail views in later turns.
const stubRoute = (path: string, label: string) =>
  createRoute({ getParentRoute: () => rootRoute, path, component: () => <div>{label} — coming soon.</div> });

const sitesRoute = createRoute({ getParentRoute: () => rootRoute, path: '/sites', component: SitesList });
const workcentresRoute = stubRoute('/workcentres', 'Workcentres');
const productsRoute = stubRoute('/products', 'Products');
const customersRoute = stubRoute('/customers', 'Customers');
const ordersRoute = stubRoute('/orders', 'Sales orders');
const scheduleRoute = stubRoute('/schedule', 'Schedule');

const routeTree = rootRoute.addChildren([
  indexRoute,
  sitesRoute,
  workcentresRoute,
  productsRoute,
  customersRoute,
  ordersRoute,
  scheduleRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
