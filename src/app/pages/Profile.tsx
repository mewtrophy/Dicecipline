import { useApp } from '../context/AppContext';
import { FlameIcon } from '../components/FlameIcon';
import { TrophyIcon } from '../components/TrophyIcon';
import { CrownIcon } from '../components/CrownIcon';
import { Calendar, Zap, Target, Award } from 'lucide-react';

// Mock trophy data
interface Trophy {
  id: string;
  type: 'daily' | 'weekly';
  date: string;
  rank: number;
}

const mockTrophies: Trophy[] = [
  { id: '1', type: 'weekly', date: '2026-04-08', rank: 1 },
  { id: '2', type: 'daily', date: '2026-04-14', rank: 1 },
  { id: '3', type: 'daily', date: '2026-04-13', rank: 2 },
  { id: '4', type: 'weekly', date: '2026-04-01', rank: 3 },
  { id: '5', type: 'daily', date: '2026-04-10', rank: 1 },
];

const recentAchievements = [
  { icon: '🔥', text: '7-day streak achieved!', date: 'Apr 12' },
  { icon: '👑', text: 'Daily Champion', date: 'Apr 14' },
  { icon: '⚡', text: 'Elite status unlocked', date: 'Apr 11' },
  { icon: '🎯', text: 'Perfect week completed', date: 'Apr 8' },
];

export const Profile = () => {
  const { currentStreak, totalScore, dayCounter } = useApp();

  const totalTrophies = mockTrophies.length;
  const dailyWins = mockTrophies.filter((t) => t.type === 'daily').length;
  const weeklyWins = mockTrophies.filter((t) => t.type === 'weekly').length;

  const getTrophyColor = (rank: number) => {
    if (rank === 1) return 'text-[#FFD700]'; // Gold
    if (rank === 2) return 'text-[#C0C0C0]'; // Silver
    if (rank === 3) return 'text-[#CD7F32]'; // Bronze
    return 'text-muted-foreground';
  };

  const getTrophyLabel = (rank: number) => {
    if (rank === 1) return '1ST';
    if (rank === 2) return '2ND';
    if (rank === 3) return '3RD';
    return `${rank}TH`;
  };

  return (
    <div className="min-h-full p-4 md:p-6 lg:p-8 max-w-4xl mx-auto pb-24 lg:pb-8">
      {/* Profile Header */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-primary text-primary-foreground flex items-center justify-center text-5xl md:text-6xl brutalist-shadow -rotate-3">
            😎
          </div>
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-display leading-[0.85] text-foreground">
              YOUR PROFILE
            </h1>
            <p className="text-xs md:text-sm font-body mt-2 text-muted-foreground uppercase tracking-widest">
              Track your journey
            </p>
          </div>
        </div>
      </div>

      {/* Lifetime Score - Hero Card */}
      <div className="mb-6 bg-danger text-danger-foreground p-8 relative -rotate-1 brutalist-shadow">
        <div className="text-xs font-body uppercase tracking-widest mb-2">Lifetime Score</div>
        <div className="flex items-baseline gap-3">
          <div className="text-7xl md:text-8xl font-display leading-none">{totalScore}</div>
          <div className="text-3xl font-display">PTS</div>
        </div>
        <div className="mt-3 text-sm font-body opacity-90">
          Earned over {dayCounter} days of discipline
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Current Streak */}
        <div className="bg-primary text-primary-foreground p-6 relative rotate-1 brutalist-shadow">
          <FlameIcon className="w-10 h-10 mb-3" />
          <div className="text-4xl md:text-5xl font-display leading-none mb-2">
            {currentStreak.toString().padStart(2, '0')}
          </div>
          <div className="text-xs font-body uppercase tracking-widest">Day Streak</div>
        </div>

        {/* Total Trophies */}
        <div className="bg-accent text-accent-foreground p-6 relative -rotate-1 brutalist-shadow">
          <TrophyIcon className="w-10 h-10 mb-3" />
          <div className="text-4xl md:text-5xl font-display leading-none mb-2">
            {totalTrophies.toString().padStart(2, '0')}
          </div>
          <div className="text-xs font-body uppercase tracking-widest">Trophies</div>
        </div>
      </div>

      {/* Trophy Breakdown */}
      <div className="mb-6 bg-card text-foreground p-6 border-3 border-border">
        <h2 className="font-display text-2xl mb-4 text-accent">TROPHY CABINET</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-muted/30 border-2 border-border">
            <Calendar className="w-8 h-8 text-primary" />
            <div>
              <div className="font-display text-2xl leading-none">{dailyWins}</div>
              <div className="text-xs font-body uppercase text-muted-foreground">Daily Wins</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/30 border-2 border-border">
            <Target className="w-8 h-8 text-primary" />
            <div>
              <div className="font-display text-2xl leading-none">{weeklyWins}</div>
              <div className="text-xs font-body uppercase text-muted-foreground">Weekly Wins</div>
            </div>
          </div>
        </div>

        {/* Recent Trophies */}
        {mockTrophies.length > 0 && (
          <div>
            <h3 className="font-display text-lg mb-3 text-muted-foreground uppercase">
              Recent Trophies
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {mockTrophies.slice(0, 5).map((trophy) => (
                <div
                  key={trophy.id}
                  className="flex flex-col items-center gap-2 p-3 bg-background border-2 border-border"
                >
                  <TrophyIcon className={`w-10 h-10 ${getTrophyColor(trophy.rank)}`} />
                  <div className="text-center">
                    <div className="font-display text-sm leading-none mb-1">
                      {getTrophyLabel(trophy.rank)}
                    </div>
                    <div className="text-xs font-body text-muted-foreground capitalize">
                      {trophy.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recent Achievements */}
      <div className="mb-6 bg-card text-foreground p-6 border-3 border-border rotate-1">
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-6 h-6 text-primary" />
          <h2 className="font-display text-2xl text-accent">RECENT ACHIEVEMENTS</h2>
        </div>
        <div className="space-y-3">
          {recentAchievements.map((achievement, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 bg-background border-2 border-border"
            >
              <div className="text-3xl flex-shrink-0">{achievement.icon}</div>
              <div className="flex-1">
                <div className="font-body font-bold">{achievement.text}</div>
                <div className="text-sm text-muted-foreground font-body">{achievement.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Elite Status Card */}
      {currentStreak >= 7 && (
        <div className="bg-black text-primary p-6 relative -rotate-1 brutalist-shadow border-3 border-primary">
          <div className="flex items-center gap-4">
            <Zap className="w-12 h-12 flex-shrink-0" />
            <div>
              <h3 className="font-display text-2xl leading-tight mb-1">ELITE STATUS</h3>
              <p className="font-body text-sm text-accent">
                You've maintained a {currentStreak}-day streak! Keep it up!
              </p>
            </div>
            <CrownIcon className="w-16 h-16 text-primary flex-shrink-0" />
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className="mt-8 bg-accent text-accent-foreground p-6 border-3 border-black">
        <h3 className="font-display text-xl mb-4">YOUR STATS</h3>
        <div className="grid grid-cols-2 gap-4 font-body text-sm">
          <div>
            <div className="text-xs uppercase text-black/60 mb-1">Days Active</div>
            <div className="font-display text-2xl">{dayCounter}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-black/60 mb-1">Avg Points/Day</div>
            <div className="font-display text-2xl">
              {dayCounter > 0 ? Math.round(totalScore / dayCounter) : 0}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase text-black/60 mb-1">Best Streak</div>
            <div className="font-display text-2xl">{currentStreak}</div>
          </div>
          <div>
            <div className="text-xs uppercase text-black/60 mb-1">Rank</div>
            <div className="font-display text-2xl">#6</div>
          </div>
        </div>
      </div>
    </div>
  );
};
