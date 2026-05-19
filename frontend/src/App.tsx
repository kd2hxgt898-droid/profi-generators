import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { BlackoutDemoUiProvider } from './features/hero/blackout-demo-ui-context';
import { AppLayout } from './components/layout/app-layout';
import { HomePage } from './pages/home';
import { BoutiquePage } from './pages/boutique';
import { BoutiqueProductPage } from './pages/boutique-product';
import { ServicesPage } from './pages/services';
import { AboutPage } from './pages/about';
import { FaqPage } from './pages/faq';
import { ContactsPage } from './pages/contacts';
import { QuizPage } from './pages/quiz';
import { PrivacyPage } from './pages/privacy';
import { NotFoundPage } from './pages/not-found';
import { ROUTES } from './lib/constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: ROUTES.home, element: <HomePage /> },
      { path: ROUTES.boutique, element: <BoutiquePage /> },
      { path: `${ROUTES.boutique}/:productId`, element: <BoutiqueProductPage /> },
      { path: ROUTES.services, element: <ServicesPage /> },
      { path: ROUTES.about, element: <AboutPage /> },
      { path: ROUTES.faq, element: <FaqPage /> },
      { path: ROUTES.contacts, element: <ContactsPage /> },
      { path: ROUTES.quiz, element: <QuizPage /> },
      { path: ROUTES.privacy, element: <PrivacyPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export const App = (): JSX.Element => (
  <HelmetProvider>
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <BlackoutDemoUiProvider>
          <RouterProvider router={router} />
        </BlackoutDemoUiProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);
