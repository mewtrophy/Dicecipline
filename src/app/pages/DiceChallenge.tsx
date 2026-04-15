import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Dices, Check, Trash2 } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { SnakeDice } from '../components/SnakeDice';

const CHALLENGES = {
  easy: [
    'Drink 8 glasses of water today',
    'Take a 10-minute walk',
    'Write 3 things you\'re grateful for',
    'Make your bed perfectly',
    'Read 10 pages of a book',
    'Do 20 push-ups',
    'Meditate for 5 minutes',
    'Clean your desk workspace',
  ],
  medium: [
    'No social media for 4 hours',
    'Cook a healthy meal from scratch',
    'Do a 30-minute workout',
    'Learn something new for 30 minutes',
    'Call a friend or family member',
    'Complete a task you\'ve been avoiding',
    'Organize one area of your home',
    'Journal for 15 minutes',
  ],
  hard: [
    'No phone for 6 hours',
    'Complete a full workout routine',
    'Fast for 16 hours',
    'Wake up at 5 AM tomorrow',
    'Finish a difficult task today',
    'Learn a new skill for 2 hours',
    'Deep clean an entire room',
    'Create something from scratch',
  ],
  extreme: [
    'No screens for 24 hours',
    'Run 5 kilometers',
    'Complete an entire project today',
    'Cold shower only for 3 days',
    'No sugar for 48 hours',
    'Master a new skill in one day',
    'Complete 100 burpees',
    'No complaints for 24 hours',
  ],
};

const DIFFICULTY_POINTS = {
  easy: 15,
  medium: 30,
  hard: 60,
  extreme: 100,
};

export const DiceChallenge = () => {
  const { challenges, addChallenge, completeChallenge, clearChallenges } = useApp();
  const [isRolling, setIsRolling] = useState(false);

  const handleRoll = () => {
    if (isRolling) return;

    setIsRolling(true);

    // Animation duration
    setTimeout(() => {
      const difficulties: Array<keyof typeof CHALLENGES> = ['easy', 'medium', 'hard', 'extreme'];
      const weights = [40, 35, 20, 5];
      const totalWeight = weights.reduce((a, b) => a + b, 0);
      const random = Math.random() * totalWeight;

      let cumulative = 0;
      let selectedDifficulty: keyof typeof CHALLENGES = 'easy';

      for (let i = 0; i < difficulties.length; i++) {
        cumulative += weights[i];
        if (random <= cumulative) {
          selectedDifficulty = difficulties[i];
          break;
        }
      }

      const challengeList = CHALLENGES[selectedDifficulty];
      const randomChallenge =
        challengeList[Math.floor(Math.random() * challengeList.length)];

      addChallenge({
        text: randomChallenge,
        difficulty: selectedDifficulty,
        points: DIFFICULTY_POINTS[selectedDifficulty],
      });

      // Confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#8b5cf6', '#ffd700', '#ff2e63'],
      });

      setIsRolling(false);
    }, 1000);
  };

  const handleComplete = (id: string) => {
    completeChallenge(id);
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7C3AED', '#FF0000', '#E8DCC8'],
    });
  };

  const getDifficultyColor = (diff: 'easy' | 'medium' | 'hard' | 'extreme') => {
    return {
      easy: { bg: 'bg-primary', text: 'text-primary-foreground', label: 'EASY' },
      medium: { bg: 'bg-accent', text: 'text-accent-foreground', label: 'MEDIUM' },
      hard: { bg: 'bg-danger', text: 'text-danger-foreground', label: 'HARD' },
      extreme: { bg: 'bg-black', text: 'text-accent', label: 'EXTREME' },
    }[diff];
  };

  const activeChallenges = challenges.filter((c) => !c.completed);
  const completedChallenges = challenges.filter((c) => c.completed);

  return (
    <div className="min-h-full p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-5xl md:text-6xl font-display leading-[0.9] text-accent">
            ROLL THE
            <br />
            DICE
          </h1>
          <p className="text-xs md:text-sm font-body uppercase tracking-widest text-muted-foreground mt-2">
            Click to generate challenge
          </p>
        </div>
        <SnakeDice className="hidden md:block w-24 h-24 lg:w-32 lg:h-32 text-foreground rotate-6" />
      </div>

      {/* Dice Button */}
      <div className="flex flex-col items-center justify-center py-8 md:py-12 space-y-6">
        <button
          onClick={handleRoll}
          className={`
            relative w-40 h-40 md:w-48 md:h-48 bg-danger text-danger-foreground
            flex items-center justify-center border-8 border-black
            transition-all duration-200 cursor-pointer brutalist-shadow
            ${isRolling ? 'animate-spin bg-primary text-primary-foreground' : ''}
          `}
          disabled={isRolling}
        >
          <Dices className="w-20 h-20 md:w-24 md:h-24" />
        </button>

        <div className="text-center space-y-1">
          <p className="text-2xl md:text-3xl font-display">
            {isRolling ? 'ROLLING...' : 'ROLL'}
          </p>
          <p className="text-sm font-body uppercase tracking-widest text-muted-foreground">
            Click to roll the dice
          </p>
        </div>
      </div>

      {/* Active Challenges */}
      {activeChallenges.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-display">
              ACTIVE ({activeChallenges.length})
            </h2>
            <button
              onClick={clearChallenges}
              className="flex items-center gap-2 px-4 py-2 bg-danger text-danger-foreground border-3 border-black hover:translate-x-1 hover:translate-y-1 transition-transform font-display text-sm"
            >
              <Trash2 className="w-4 h-4" />
              CLEAR
            </button>
          </div>

          <AnimatePresence mode="popLayout">
            {activeChallenges.map((challenge, index) => {
              const colors = getDifficultyColor(challenge.difficulty);
              const rotation = index % 2 === 0 ? 'rotate-1' : '-rotate-1';

              return (
                <div
                  key={challenge.id}
                  className={`${colors.bg} ${colors.text} border-4 border-black p-5 md:p-6 brutalist-shadow ${rotation}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="px-3 py-1 bg-black text-accent text-xs font-display">
                          {colors.label}
                        </span>
                        <span className="text-sm font-display">
                          +{challenge.points} PTS
                        </span>
                      </div>
                      <p className="text-base md:text-lg font-body leading-tight">
                        {challenge.text}
                      </p>
                    </div>

                    <button
                      onClick={() => handleComplete(challenge.id)}
                      className="w-12 h-12 bg-primary text-primary-foreground border-3 border-black hover:translate-x-1 hover:translate-y-1 transition-transform flex-shrink-0"
                    >
                      <Check className="w-5 h-5 mx-auto" />
                    </button>
                  </div>
                </div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Completed Challenges */}
      {completedChallenges.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-2xl font-display text-muted-foreground">
            DONE ({completedChallenges.length})
          </h2>

          <div className="space-y-2">
            {completedChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="border-3 border-border p-4 opacity-40"
              >
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-body line-through">
                      {challenge.text}
                    </p>
                  </div>
                  <span className="text-xs font-display uppercase tracking-wide">
                    +{challenge.points}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {challenges.length === 0 && (
        <div className="text-center py-12 space-y-4">
          <SnakeDice className="w-24 h-24 md:w-32 md:h-32 mx-auto text-muted-foreground opacity-30" />
          <div>
            <p className="text-lg font-display uppercase">No Challenges</p>
            <p className="text-sm font-body text-muted-foreground mt-1">
              Roll the dice to get started
            </p>
          </div>
        </div>
      )}
    </div>
  );
};