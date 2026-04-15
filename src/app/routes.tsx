import { createHashRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Habits } from './pages/Habits';
import { DiceChallenge } from './pages/DiceChallenge';
import { Scores } from './pages/Scores';
import { Leaderboard } from './pages/Leaderboard';
import { Profile } from './pages/Profile';
import { Guide } from './pages/Guide'; // ✅ ADD THIS

export const router = createHashRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'habits', Component: Habits },
      { path: 'dice', Component: DiceChallenge },
      { path: 'scores', Component: Scores },
      { path: 'leaderboard', Component: Leaderboard },
      { path: 'profile', Component: Profile },
      { path: 'guide', Component: Guide }, // ✅ ADD THIS

      {
        path: '*',
        Component: () => (
          <div className="flex items-center justify-center min-h-full">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-display">404</h1>
              <p className="text-muted-foreground">Page not found</p>
            </div>
          </div>
        ),
      },
    ],
  },
]);
