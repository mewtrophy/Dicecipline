import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Habit {
  id: string;
  name: string;
  difficulty: 'easy' | 'core' | 'hard';
  days: number[]; // 0-6 for Sun-Sat
  completedToday: boolean;
  createdAt: string;
}

export interface Challenge {
  id: string;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  points: number;
  completed: boolean;
}

interface AppState {
  habits: Habit[];
  challenges: Challenge[];
  currentStreak: number;
  totalScore: number;
  lastCompletedDate: string | null;
  todayProgress: { completed: number; total: number };
  startDate: string;
}

interface AppContextType extends AppState {
  addHabit: (habit: Omit<Habit, 'id' | 'completedToday' | 'createdAt'>) => void;
  deleteHabit: (id: string) => void;
  completeHabit: (id: string) => void;
  addChallenge: (challenge: Omit<Challenge, 'id' | 'completed'>) => void;
  completeChallenge: (id: string) => void;
  clearChallenges: () => void;
  weekProgress: boolean[];
  dayCounter: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'dicecipline_data';

const getTodayString = () => new Date().toISOString().split('T')[0];
const getTodayDayOfWeek = () => new Date().getDay();

const getDifficultyPoints = (difficulty: 'easy' | 'core' | 'hard') => {
  const points = { easy: 5, core: 10, hard: 15 };
  return points[difficulty];
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Ensure startDate exists for migrated data
      if (!parsed.startDate) {
        parsed.startDate = new Date().toISOString();
      }
      return parsed;
    }
    return {
      habits: [],
      challenges: [],
      currentStreak: 0,
      totalScore: 0,
      lastCompletedDate: null,
      todayProgress: { completed: 0, total: 0 },
      startDate: new Date().toISOString(),
    };
  });

  // Daily reset check
  useEffect(() => {
    const checkDailyReset = () => {
      const today = getTodayString();
      const lastReset = localStorage.getItem('last_reset');

      if (lastReset !== today) {
        setState((prev) => {
          const todayDay = getTodayDayOfWeek();
          const todayHabits = prev.habits.filter((h) => h.days.includes(todayDay));

          return {
            ...prev,
            habits: prev.habits.map((h) => ({ ...h, completedToday: false })),
            todayProgress: { completed: 0, total: todayHabits.length },
          };
        });
        localStorage.setItem('last_reset', today);
      }
    };

    checkDailyReset();
    const interval = setInterval(checkDailyReset, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Persist state
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addHabit = (habit: Omit<Habit, 'id' | 'completedToday' | 'createdAt'>) => {
    setState((prev) => {
      const newHabit: Habit = {
        ...habit,
        id: Date.now().toString(),
        completedToday: false,
        createdAt: new Date().toISOString(),
      };
      const todayDay = getTodayDayOfWeek();
      const newHabits = [...prev.habits, newHabit];
      const todayHabits = newHabits.filter((h) => h.days.includes(todayDay));

      return {
        ...prev,
        habits: newHabits,
        todayProgress: {
          completed: prev.todayProgress.completed,
          total: todayHabits.length,
        },
      };
    });
  };

  const deleteHabit = (id: string) => {
    setState((prev) => {
      const todayDay = getTodayDayOfWeek();
      const newHabits = prev.habits.filter((h) => h.id !== id);
      const todayHabits = newHabits.filter((h) => h.days.includes(todayDay));
      const completedToday = todayHabits.filter((h) => h.completedToday).length;

      return {
        ...prev,
        habits: newHabits,
        todayProgress: { completed: completedToday, total: todayHabits.length },
      };
    });
  };

  const completeHabit = (id: string) => {
    setState((prev) => {
      const habit = prev.habits.find((h) => h.id === id);
      if (!habit || habit.completedToday) return prev;

      const points = getDifficultyPoints(habit.difficulty);
      const newHabits = prev.habits.map((h) =>
        h.id === id ? { ...h, completedToday: true } : h
      );

      const todayDay = getTodayDayOfWeek();
      const todayHabits = newHabits.filter((h) => h.days.includes(todayDay));
      const completedCount = todayHabits.filter((h) => h.completedToday).length;
      const allCompleted = completedCount === todayHabits.length && todayHabits.length > 0;

      const today = getTodayString();
      let newStreak = prev.currentStreak;
      let bonusPoints = 0;

      if (allCompleted) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split('T')[0];

        if (prev.lastCompletedDate === yesterdayString) {
          newStreak = prev.currentStreak + 1;
        } else if (prev.lastCompletedDate !== today) {
          newStreak = 1;
        }

        // Weekly bonus
        if (newStreak % 7 === 0) {
          bonusPoints = 100;
        }
      }

      return {
        ...prev,
        habits: newHabits,
        totalScore: prev.totalScore + points + bonusPoints,
        currentStreak: newStreak,
        lastCompletedDate: allCompleted ? today : prev.lastCompletedDate,
        todayProgress: { completed: completedCount, total: todayHabits.length },
      };
    });
  };

  const addChallenge = (challenge: Omit<Challenge, 'id' | 'completed'>) => {
    setState((prev) => ({
      ...prev,
      challenges: [
        ...prev.challenges,
        { ...challenge, id: Date.now().toString(), completed: false },
      ],
    }));
  };

  const completeChallenge = (id: string) => {
    setState((prev) => {
      const challenge = prev.challenges.find((c) => c.id === id);
      if (!challenge || challenge.completed) return prev;

      return {
        ...prev,
        challenges: prev.challenges.map((c) =>
          c.id === id ? { ...c, completed: true } : c
        ),
        totalScore: prev.totalScore + challenge.points,
      };
    });
  };

  const clearChallenges = () => {
    setState((prev) => ({ ...prev, challenges: [] }));
  };

  // Calculate week progress (last 7 days)
  const weekProgress = React.useMemo(() => {
    const progress: boolean[] = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];

      // Simplified: assume completed if it was the last completed date or within streak
      if (state.lastCompletedDate) {
        const lastCompleted = new Date(state.lastCompletedDate);
        const diffDays = Math.floor(
          (date.getTime() - lastCompleted.getTime()) / (1000 * 60 * 60 * 24)
        );
        progress.push(diffDays <= 0 && diffDays > -state.currentStreak);
      } else {
        progress.push(false);
      }
    }

    return progress;
  }, [state.currentStreak, state.lastCompletedDate]);

  // Calculate day counter (days since start)
  const dayCounter = React.useMemo(() => {
    const start = new Date(state.startDate);
    const today = new Date();
    const diffTime = today.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(1, diffDays);
  }, [state.startDate]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        addHabit,
        deleteHabit,
        completeHabit,
        addChallenge,
        completeChallenge,
        clearChallenges,
        weekProgress,
        dayCounter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
