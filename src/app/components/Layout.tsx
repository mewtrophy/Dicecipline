import { Outlet } from 'react-router';
import { Sidebar, BottomNav } from './Navigation';

export const Layout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar />

      <main className="flex-1 overflow-y-auto pb-24 lg:pb-0">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
};
