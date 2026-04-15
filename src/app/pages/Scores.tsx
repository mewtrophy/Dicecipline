import { useApp } from '../context/AppContext';
import { FlameIcon } from '../components/FlameIcon';

export const Scores = () => {
  const { currentStreak, totalScore, todayProgress, weekProgress } = useApp();

  const completedThisWeek = weekProgress.filter(Boolean).length;
  const weekPercentage = (completedThisWeek / 7) * 100;

  const getStreakLevel = () => {
    if (currentStreak >= 30) return { level: 'LEGENDARY', color: 'bg-danger' };
    if (currentStreak >= 14) return { level: 'MASTER', color: 'bg-primary' };
    if (currentStreak >= 7) return { level: 'WARRIOR', color: 'bg-accent' };
    if (currentStreak >= 3) return { level: 'RISING', color: 'bg-primary' };
    return { level: 'BEGINNER', color: 'bg-muted' };
  };

  const streakLevel = getStreakLevel();

  return (
    <div className="min-h-full p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-5xl md:text-6xl font-display leading-[0.9] text-accent">
          YOUR
          <br />
          SCORES
        </h1>
        <p className="text-xs md:text-sm font-body uppercase tracking-widest text-muted-foreground mt-2">
          Track your progress
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current Streak */}
        <div className="bg-primary text-primary-foreground p-6 brutalist-shadow -rotate-1">
          <div className="flex items-start justify-between mb-4">
            <div className="text-xs font-body uppercase tracking-widest">Streak</div>
            <FlameIcon className="w-12 h-12" />
          </div>
          <div className="text-6xl md:text-7xl font-display leading-none mb-2">
            {currentStreak.toString().padStart(2, '0')}
          </div>
          <div className="text-sm font-body uppercase tracking-wide">
            Days • {streakLevel.level}
          </div>
        </div>

        {/* Total Score */}
        <div className="bg-danger text-danger-foreground p-6 brutalist-shadow rotate-1">
          <div className="flex items-start justify-between mb-4">
            <div className="text-xs font-body uppercase tracking-widest">Total</div>
            <div className="text-2xl font-display">★</div>
          </div>
          <div className="text-6xl md:text-7xl font-display leading-none mb-2">
            {totalScore}
          </div>
          <div className="text-sm font-body uppercase tracking-wide">Points</div>
        </div>

        {/* Today */}
        <div className="bg-accent text-accent-foreground p-6 brutalist-shadow rotate-1">
          <div className="flex items-start justify-between mb-4">
            <div className="text-xs font-body uppercase tracking-widest">Today</div>
            <div className="text-2xl font-display">◆</div>
          </div>
          <div className="text-6xl md:text-7xl font-display leading-none mb-2">
            {todayProgress.completed}/{todayProgress.total}
          </div>
          <div className="text-sm font-body uppercase tracking-wide">
            {todayProgress.total - todayProgress.completed} Left
          </div>
        </div>

        {/* This Week */}
        <div className="bg-black text-accent p-6 border-4 border-accent brutalist-shadow -rotate-1">
          <div className="flex items-start justify-between mb-4">
            <div className="text-xs font-body uppercase tracking-widest">Week</div>
            <div className="text-2xl font-display">▲</div>
          </div>
          <div className="text-6xl md:text-7xl font-display leading-none mb-2">
            {completedThisWeek}/7
          </div>
          <div className="text-sm font-body uppercase tracking-wide">
            {Math.round(weekPercentage)}% Done
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-accent text-accent-foreground p-6 border-4 border-black space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-display">7 DAYS</h2>
          <span className="text-4xl font-display">{Math.round(weekPercentage)}%</span>
        </div>

        <div className="flex gap-2">
          {weekProgress.map((completed, index) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - index));
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);

            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div
                  className={`
                    w-full aspect-square border-3 border-black transition-all
                    flex items-center justify-center
                    ${completed ? 'bg-primary text-primary-foreground' : 'bg-black text-accent'}
                  `}
                >
                  {completed ? (
                    <FlameIcon className="w-6 h-6 md:w-8 md:h-8" />
                  ) : (
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-accent" />
                  )}
                </div>
                <span className="text-xs font-display uppercase">{dayName}</span>
              </div>
            );
          })}
        </div>

        <div className="h-4 bg-black">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${weekPercentage}%` }}
          />
        </div>
      </div>

      {/* Bonus System */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-primary text-primary-foreground p-5 border-3 border-black">
          <div className="text-xs font-body uppercase tracking-widest mb-3">
            7-Day Bonus
          </div>
          <div className="text-4xl md:text-5xl font-display leading-none mb-2">+100</div>
          <div className="text-sm font-body">
            {currentStreak >= 7
              ? currentStreak % 7 === 0
                ? 'EARNED!'
                : `${7 - (currentStreak % 7)} days left`
              : `${7 - currentStreak} days left`}
          </div>
        </div>

        <div className="bg-accent text-accent-foreground p-5 border-3 border-black">
          <div className="text-xs font-body uppercase tracking-widest mb-3">
            Perfect Day
          </div>
          <div className="text-4xl md:text-5xl font-display leading-none mb-2">+1</div>
          <div className="text-sm font-body">
            {todayProgress.completed === todayProgress.total && todayProgress.total > 0
              ? 'COMPLETE!'
              : 'Finish all habits'}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-black text-accent p-4 border-3 border-accent">
        <p className="text-xs font-body uppercase tracking-wide">
          Complete all daily habits to build your streak. Every 7 days earns +100 bonus points.
        </p>
      </div>
    </div>
  );
};
