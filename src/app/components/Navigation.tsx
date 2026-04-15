import { Link, useLocation } from 'react-router';
import { Home, ListChecks, Dices, Trophy, Users, User, BookOpen } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/habits', label: 'Habits', icon: ListChecks },
  { path: '/dice', label: 'Dice', icon: Dices },
  { path: '/scores', label: 'Scores', icon: Trophy },
  { path: '/leaderboard', label: 'Compete', icon: Users },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/guide', label: 'Guide', icon: BookOpen }, // ✅ NEW
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r-4 border-border bg-sidebar p-6 gap-8">
      {/* Logo */}
      <div>
        <h1 className="text-3xl font-display leading-[0.9] text-accent">
          DICE
          <br />
          CIPLINE
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-3 uppercase font-display text-lg transition-all
                ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-muted'
                }
              `}
            >
              <Icon className="w-6 h-6" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto p-4 bg-accent text-accent-foreground">
        <p className="text-xs font-body uppercase tracking-wide">
          Build discipline. Roll dice. Level up.
        </p>
      </div>
    </aside>
  );
};

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-sidebar border-t-4 border-border z-50 overflow-x-auto">
      <div className="flex justify-between items-center h-20 px-1 min-w-max">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center justify-center gap-1 px-2 py-2 transition-all min-w-[55px]
                ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-display uppercase leading-tight text-center">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};