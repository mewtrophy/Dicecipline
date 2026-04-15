import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { ArrowRight, Users, Trophy as TrophyLucide } from 'lucide-react';
import { SnakeDice } from '../components/SnakeDice';
import { FlameIcon } from '../components/FlameIcon';

export const Home = () => {
  const navigate = useNavigate();
  const { currentStreak, totalScore, todayProgress, dayCounter } = useApp();

  const completionPercentage =
    todayProgress.total > 0 ? (todayProgress.completed / todayProgress.total) * 100 : 0;

  const habitsLeft = todayProgress.total - todayProgress.completed;

  return (
    <div className="min-h-full p-4 md:p-6 lg:p-8 max-w-4xl mx-auto relative">
      {/* Day Counter - Top Right */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-primary text-primary-foreground px-4 py-2 rotate-3 brutalist-shadow">
        <div className="text-xs font-body uppercase tracking-wide">Day</div>
        <div className="text-3xl font-display leading-none">{dayCounter}</div>
      </div>

      <div className="space-y-6 md:space-y-8 pt-16 md:pt-4">
        {/* Hero Title with Snake/Dice */}
        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-display leading-[0.85] text-accent tracking-tight">
                DICECIPLINE
              </h1>
              <p className="text-xs md:text-sm font-body mt-2 text-muted-foreground uppercase tracking-widest">
                Roll Habits. Level up. Win.
              </p>
            </div>
            <div className="hidden md:block">
              <SnakeDice className="w-32 h-32 lg:w-40 lg:h-40 text-foreground -rotate-6" />
            </div>
          </div>
        </div>

        {/* Stats Grid - Brutalist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Current Streak Card - Purple */}
          <div className="bg-primary text-primary-foreground p-6 relative -rotate-1 brutalist-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="text-xs font-body uppercase tracking-widest">Current Streak</div>
              <FlameIcon className="w-10 h-10" />
            </div>
            <div className="text-6xl md:text-7xl font-display leading-none">
              {currentStreak.toString().padStart(2, '0')}
            </div>
          </div>

          {/* Total Score Card - Red */}
          <div className="bg-danger text-danger-foreground p-6 relative rotate-1 brutalist-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="text-xs font-body uppercase tracking-widest">Total Score</div>
              <div className="text-sm font-body uppercase rotate-90 origin-center mt-4">
                Vertical
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-6xl md:text-7xl font-display leading-none">{totalScore}</div>
              <div className="text-xl font-display">PTS</div>
            </div>
          </div>
        </div>

        {/* Today Progress Card - Beige */}
        <div className="bg-accent text-accent-foreground p-6 relative brutalist-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-body uppercase tracking-widest">Today</div>
            <SnakeDice className="w-12 h-12 md:hidden" />
          </div>
          <div className="text-6xl md:text-7xl font-display leading-none mb-4">
            {Math.round(completionPercentage)}%
          </div>

          {/* Progress Bar */}
          <div className="h-3 bg-black mb-3 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-primary transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          <div className="text-sm font-body uppercase">
            {habitsLeft} habit{habitsLeft !== 1 ? 's' : ''} left
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/habits')}
            className="bg-accent text-accent-foreground p-6 relative hover:translate-x-1 hover:translate-y-1 transition-transform border-3 border-black"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="text-2xl md:text-3xl font-display leading-none mb-1">
                  GO TO
                  <br />
                  HABITS
                </div>
              </div>
              <ArrowRight className="w-8 h-8 md:w-10 md:h-10" />
            </div>
          </button>

          <button
            onClick={() => navigate('/dice')}
            className="bg-black text-accent p-6 relative hover:translate-x-1 hover:translate-y-1 transition-transform border-3 border-accent brutalist-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="text-2xl md:text-3xl font-display leading-none mb-1">
                  ROLL THE
                  <br />
                  DICE
                </div>
              </div>
              <ArrowRight className="w-8 h-8 md:w-10 md:h-10" />
            </div>
          </button>
        </div>

        {/* Competition Section */}
        <div className="bg-primary text-primary-foreground p-6 md:p-8 relative rotate-1 brutalist-shadow border-3 border-black">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="text-xs font-body uppercase tracking-widest mb-2">New Feature</div>
              <h2 className="text-4xl md:text-5xl font-display leading-[0.9] mb-3">
                COMPETE WITH FRIENDS
              </h2>
              <p className="font-body text-sm md:text-base mb-4 opacity-90">
                {currentStreak >= 2 
                  ? `You're in! Compete on leaderboards and win trophies!`
                  : `Maintain a 2-day streak to unlock leaderboards. Win daily and weekly competitions!`
                }
              </p>
              {currentStreak < 2 && (
                <div className="inline-flex items-center gap-2 bg-black text-primary px-3 py-2 text-sm font-body">
                  <FlameIcon className="w-5 h-5" />
                  <span>{currentStreak}/2 days - Keep going!</span>
                </div>
              )}
              {currentStreak >= 2 && (
                <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-3 py-2 text-sm font-display">
                  ✓ UNLOCKED
                </div>
              )}
            </div>
            <TrophyLucide className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/leaderboard')}
              className="bg-black text-primary p-4 hover:translate-x-1 hover:translate-y-1 transition-transform border-2 border-primary flex items-center justify-between gap-2"
            >
              <Users className="w-6 h-6 flex-shrink-0" />
              <span className="font-display text-lg">LEADERBOARD</span>
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="bg-accent text-accent-foreground p-4 hover:translate-x-1 hover:translate-y-1 transition-transform border-2 border-black flex items-center justify-between gap-2"
            >
              <TrophyLucide className="w-6 h-6 flex-shrink-0" />
              <span className="font-display text-lg">PROFILE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};