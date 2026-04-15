import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FlameIcon } from '../components/FlameIcon';
import { TrophyIcon } from '../components/TrophyIcon';
import { CrownIcon } from '../components/CrownIcon';
import { Lock, Zap } from 'lucide-react';

// Mock data for leaderboard users
interface LeaderboardUser {
  id: string;
  username: string;
  avatar: string;
  dailyPoints: number;
  weeklyPoints: number;
  streak: number;
  trophies: number;
  isElite: boolean;
}

const mockUsers: LeaderboardUser[] = [
  {
    id: '1',
    username: 'DisciplineMaster',
    avatar: '🎯',
    dailyPoints: 85,
    weeklyPoints: 520,
    streak: 12,
    trophies: 8,
    isElite: true,
  },
  {
    id: '2',
    username: 'HabitHero',
    avatar: '⚡',
    dailyPoints: 75,
    weeklyPoints: 490,
    streak: 9,
    trophies: 5,
    isElite: true,
  },
  {
    id: '3',
    username: 'StreakSeeker',
    avatar: '🔥',
    dailyPoints: 70,
    weeklyPoints: 465,
    streak: 7,
    trophies: 3,
    isElite: true,
  },
  {
    id: '4',
    username: 'GoalGetter',
    avatar: '🎲',
    dailyPoints: 60,
    weeklyPoints: 420,
    streak: 5,
    trophies: 2,
    isElite: false,
  },
  {
    id: '5',
    username: 'ConsistencyKing',
    avatar: '👑',
    dailyPoints: 55,
    weeklyPoints: 390,
    streak: 4,
    trophies: 1,
    isElite: false,
  },
  {
    id: '6',
    username: 'You',
    avatar: '😎',
    dailyPoints: 45,
    weeklyPoints: 320,
    streak: 3,
    trophies: 0,
    isElite: false,
  },
];

const yesterdaysChampion = {
  username: 'DisciplineMaster',
  avatar: '🎯',
  points: 90,
};

export const Leaderboard = () => {
  const { currentStreak } = useApp();
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('weekly');
  const isLocked = currentStreak < 2;

  const sortedUsers = [...mockUsers].sort((a, b) => {
    const pointsA = activeTab === 'daily' ? a.dailyPoints : a.weeklyPoints;
    const pointsB = activeTab === 'daily' ? b.dailyPoints : b.weeklyPoints;
    return pointsB - pointsA;
  });

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-[#FFD700] text-black'; // Gold
    if (rank === 2) return 'bg-[#C0C0C0] text-black'; // Silver
    if (rank === 3) return 'bg-[#CD7F32] text-black'; // Bronze
    return 'bg-muted text-foreground';
  };

  const getRankSize = (rank: number) => {
    if (rank === 1) return 'scale-105';
    if (rank === 2) return 'scale-102';
    if (rank === 3) return 'scale-101';
    return '';
  };

  return (
    <div className="min-h-full p-4 md:p-6 lg:p-8 max-w-4xl mx-auto pb-24 lg:pb-8">
      {/* Friend Group Header */}
      <div className="mb-6 bg-accent text-accent-foreground p-4 -rotate-1 brutalist-shadow">
        <div className="text-xs font-body uppercase tracking-widest mb-1">Friend Group</div>
        <h2 className="text-3xl font-display leading-none">THE GRINDERS</h2>
      </div>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-5xl md:text-6xl font-display leading-[0.85] text-foreground">
          COMPETITION
        </h1>
        <p className="text-xs md:text-sm font-body mt-2 text-muted-foreground uppercase tracking-widest">
          Consistency unlocks competition
        </p>
      </div>

      {/* Daily/Weekly Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('daily')}
          className={`flex-1 py-4 font-display text-xl uppercase transition-all border-3 border-black ${
            activeTab === 'daily'
              ? 'bg-primary text-primary-foreground brutalist-shadow'
              : 'bg-card text-foreground hover:bg-muted'
          }`}
        >
          Daily
        </button>
        <button
          onClick={() => setActiveTab('weekly')}
          className={`flex-1 py-4 font-display text-xl uppercase transition-all border-3 border-black ${
            activeTab === 'weekly'
              ? 'bg-primary text-primary-foreground brutalist-shadow'
              : 'bg-card text-foreground hover:bg-muted'
          }`}
        >
          Weekly
        </button>
      </div>

      {/* Yesterday's Champion Banner (only in daily mode) */}
      {activeTab === 'daily' && (
        <div className="mb-6 bg-danger text-danger-foreground p-4 rotate-1 brutalist-shadow">
          <div className="flex items-center gap-4">
            <CrownIcon className="w-12 h-12 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs font-body uppercase tracking-widest mb-1">
                Yesterday's Champion
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{yesterdaysChampion.avatar}</span>
                <div>
                  <div className="font-display text-xl leading-none">
                    {yesterdaysChampion.username}
                  </div>
                  <div className="text-sm font-body">{yesterdaysChampion.points} points</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Locked State */}
      {isLocked ? (
        <div className="relative">
          {/* Blurred background */}
          <div className="filter blur-sm opacity-40 pointer-events-none">
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-card p-4 border-3 border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted w-32 rounded" />
                      <div className="h-3 bg-muted w-20 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lock overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background p-8 border-4 border-danger max-w-md w-full mx-4 brutalist-shadow">
              <div className="flex flex-col items-center text-center gap-4">
                <Lock className="w-16 h-16 text-danger" />
                <h3 className="text-3xl font-display text-danger leading-tight">
                  LOCKED
                </h3>
                <p className="font-body text-foreground">
                  Maintain a <span className="font-bold text-primary">2-day streak</span> to unlock
                  competition
                </p>

                {/* Progress indicator */}
                <div className="w-full bg-muted h-12 relative overflow-hidden border-2 border-foreground">
                  <div
                    className="absolute inset-y-0 left-0 bg-primary transition-all duration-500"
                    style={{ width: `${(currentStreak / 2) * 100}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-xl text-foreground mix-blend-difference">
                      {currentStreak}/2 DAYS
                    </span>
                  </div>
                </div>

                <p className="text-sm font-body text-muted-foreground">
                  Complete all your habits today to build your streak
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Leaderboard List */
        <div className="space-y-3">
          {sortedUsers.map((user, index) => {
            const rank = index + 1;
            const points = activeTab === 'daily' ? user.dailyPoints : user.weeklyPoints;
            const isTopThree = rank <= 3;
            const isCurrentUser = user.username === 'You';

            return (
              <div
                key={user.id}
                className={`
                  ${getRankStyle(rank)}
                  ${getRankSize(rank)}
                  ${isCurrentUser ? 'border-4 border-primary' : 'border-3 border-black'}
                  p-4 relative transition-all
                  ${isTopThree ? 'brutalist-shadow' : ''}
                `}
                style={{
                  transform: isTopThree
                    ? `rotate(${rank === 1 ? '-1deg' : rank === 2 ? '1deg' : '-0.5deg'})`
                    : 'none',
                }}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div
                    className={`
                    flex items-center justify-center w-12 h-12 flex-shrink-0
                    ${isTopThree ? 'font-display text-3xl' : 'font-display text-2xl'}
                  `}
                  >
                    {rank === 1 && '🥇'}
                    {rank === 2 && '🥈'}
                    {rank === 3 && '🥉'}
                    {rank > 3 && `#${rank}`}
                  </div>

                  {/* Avatar */}
                  <div className="flex items-center justify-center w-14 h-14 text-3xl flex-shrink-0 bg-black/10 rounded-full">
                    {user.avatar}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-display text-lg leading-none truncate">
                        {user.username}
                      </span>
                      {user.isElite && (
                        <span className="bg-black text-primary px-2 py-0.5 text-xs font-display uppercase flex items-center gap-1 flex-shrink-0">
                          <Zap className="w-3 h-3" />
                          Elite
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm font-body">
                      <div className="flex items-center gap-1">
                        <FlameIcon className="w-4 h-4" />
                        <span>{user.streak} day streak</span>
                      </div>
                      {user.trophies > 0 && (
                        <div className="flex items-center gap-1">
                          <TrophyIcon className="w-4 h-4" />
                          <span>{user.trophies}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right flex-shrink-0">
                    <div className="font-display text-3xl leading-none">{points}</div>
                    <div className="text-xs font-body uppercase">pts</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Info Card */}
      {!isLocked && (
        <div className="mt-8 bg-card text-foreground p-6 border-3 border-border rotate-1">
          <h3 className="font-display text-xl mb-3 text-accent">HOW IT WORKS</h3>
          <ul className="space-y-2 font-body text-sm">
            <li className="flex items-start gap-2">
              <FlameIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
              <span>Maintain a 2+ day streak to appear on leaderboards</span>
            </li>
            <li className="flex items-start gap-2">
              <Zap className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
              <span>7+ day streaks earn you "Elite" status</span>
            </li>
            <li className="flex items-start gap-2">
              <TrophyIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" />
              <span>Win daily or weekly competitions to earn trophies</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
