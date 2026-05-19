import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Header } from './header';
import { Footer } from './footer';

export const AppLayout = (): JSX.Element => (
  <div className="relative flex min-h-screen flex-col bg-background text-foreground">
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 grid-spotlight opacity-60 [mask-image:radial-gradient(circle_at_50%_25%,black,transparent_70%)]"
    />
    <Header />
    <main className="relative flex-1">
      <Outlet />
    </main>
    <Footer />
    <Toaster />
    <ScrollRestoration />
  </div>
);
