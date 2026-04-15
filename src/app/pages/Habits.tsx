import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Check, X, Plus } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const DAYS_FULL = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const Habits = () => {
  const { habits, addHabit, deleteHabit, completeHabit, todayProgress } = useApp();
  const [newHabit, setNewHabit] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'core' | 'hard'>('core');
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 2, 3, 4, 5]); // Mon-Fri default

  const todayDay = new Date().getDay();
  const todayHabits = habits.filter((h) => h.days.includes(todayDay));

  const handleAddHabit = () => {
    if (!newHabit.trim() || selectedDays.length === 0) return;

    addHabit({
      name: newHabit.trim(),
      difficulty,
      days: selectedDays,
    });

    setNewHabit('');
    setSelectedDays([1, 2, 3, 4, 5]);
    setDifficulty('core');
  };

  const toggleDay = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort()
    );
  };

  const handleComplete = (id: string) => {
    completeHabit(id);

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#7C3AED', '#FF0000', '#E8DCC8'],
    });
  };

  const getDifficultyColor = (diff: 'easy' | 'core' | 'hard') => {
    return {
      easy: { bg: 'bg-primary', text: 'text-primary-foreground' },
      core: { bg: 'bg-accent', text: 'text-accent-foreground' },
      hard: { bg: 'bg-danger', text: 'text-danger-foreground' },
    }[diff];
  };

  const getDifficultyPoints = (diff: 'easy' | 'core' | 'hard') => {
    return { easy: 5, core: 10, hard: 15 }[diff];
  };

  return (
    <div className="min-h-full p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-5xl md:text-6xl font-display leading-[0.9] text-accent mb-2">
          YOUR
          <br />
          HABITS
        </h1>
        <p className="text-sm font-body uppercase tracking-wide text-muted-foreground">
          {todayProgress.completed}/{todayProgress.total} Complete
        </p>
      </div>

      {/* Add Habit Section */}
      <div className="bg-accent text-accent-foreground p-6 brutalist-shadow">
        <h2 className="text-2xl font-display mb-4">NEW HABIT</h2>

        <div className="space-y-4">
          {/* Habit Name */}
          <div className="space-y-2">
            <label className="text-xs font-body uppercase tracking-widest">Name</label>
            <input
              type="text"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="Morning workout"
              className="w-full bg-black text-accent px-4 py-3 border-3 border-black focus:outline-none focus:border-primary font-body"
              onKeyPress={(e) => e.key === 'Enter' && handleAddHabit()}
            />
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <label className="text-xs font-body uppercase tracking-widest">Level</label>
            <div className="grid grid-cols-3 gap-3">
              {(['easy', 'core', 'hard'] as const).map((diff) => {
                const colors = getDifficultyColor(diff);
                const isSelected = difficulty === diff;

                return (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`
                      px-4 py-3 border-3 border-black transition-all uppercase font-display
                      ${isSelected ? `${colors.bg} ${colors.text}` : 'bg-black text-accent'}
                    `}
                  >
                    <div className="text-sm">{diff}</div>
                    <div className="text-xs opacity-70">+{getDifficultyPoints(diff)}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Days of Week */}
          <div className="space-y-2">
            <label className="text-xs font-body uppercase tracking-widest">Days</label>
            <div className="flex gap-2">
              {DAYS.map((day, index) => {
                const isSelected = selectedDays.includes(index);

                return (
                  <button
                    key={index}
                    onClick={() => toggleDay(index)}
                    className={`
                      w-10 h-10 border-3 border-black font-display transition-all
                      ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-black text-accent'}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddHabit}
            disabled={!newHabit.trim() || selectedDays.length === 0}
            className="
              w-full bg-black text-accent border-3 border-black
              px-6 py-4 font-display text-lg
              hover:translate-x-1 hover:translate-y-1 transition-transform
              disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0
              flex items-center justify-center gap-2
            "
          >
            <Plus className="w-5 h-5" />
            ADD HABIT
          </button>
        </div>
      </div>

      {/* Habit List */}
      <div className="space-y-3">
        <h2 className="text-3xl font-display">TODAY</h2>

        <AnimatePresence mode="popLayout">
          {todayHabits.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm font-body uppercase tracking-wide">
                No habits today
              </p>
            </div>
          ) : (
            todayHabits.map((habit) => {
              const colors = getDifficultyColor(habit.difficulty);

              return (
                <div
                  key={habit.id}
                  className={`
                    border-3 border-border p-4 transition-all
                    ${habit.completedToday ? 'opacity-40' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3
                          className={`text-lg font-display truncate ${
                            habit.completedToday ? 'line-through' : ''
                          }`}
                        >
                          {habit.name.toUpperCase()}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-display ${colors.bg} ${colors.text}`}
                        >
                          {habit.difficulty.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground font-body uppercase tracking-wide">
                        +{getDifficultyPoints(habit.difficulty)} • {habit.days.map((d) => DAYS_FULL[d]).join(', ')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleComplete(habit.id)}
                        disabled={habit.completedToday}
                        className={`
                          w-12 h-12 border-3 border-black transition-all
                          ${
                            habit.completedToday
                              ? 'bg-primary text-primary-foreground cursor-not-allowed'
                              : 'bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground'
                          }
                        `}
                      >
                        <Check className="w-5 h-5 mx-auto" />
                      </button>
                      <button
                        onClick={() => deleteHabit(habit.id)}
                        className="w-12 h-12 bg-danger text-danger-foreground border-3 border-black hover:translate-x-1 hover:translate-y-1 transition-transform"
                      >
                        <X className="w-5 h-5 mx-auto" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </AnimatePresence>

        {/* All Habits (not active today) */}
        {habits.filter((h) => !h.days.includes(todayDay)).length > 0 && (
          <div className="mt-8 space-y-3">
            <h2 className="text-2xl font-display text-muted-foreground">OTHER DAYS</h2>
            {habits
              .filter((h) => !h.days.includes(todayDay))
              .map((habit) => {
                const colors = getDifficultyColor(habit.difficulty);

                return (
                  <div
                    key={habit.id}
                    className="border-3 border-border p-4 opacity-40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-lg font-display truncate">
                            {habit.name.toUpperCase()}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs font-display ${colors.bg} ${colors.text}`}
                          >
                            {habit.difficulty.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground font-body uppercase tracking-wide">
                          +{getDifficultyPoints(habit.difficulty)} • {habit.days.map((d) => DAYS_FULL[d]).join(', ')}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteHabit(habit.id)}
                        className="w-12 h-12 bg-danger text-danger-foreground border-3 border-black hover:translate-x-1 hover:translate-y-1 transition-transform"
                      >
                        <X className="w-5 h-5 mx-auto" />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
