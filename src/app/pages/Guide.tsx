import { ArrowRight } from "lucide-react";

export const Guide = () => {
  return (
    <div className="min-h-full p-6 max-w-5xl mx-auto space-y-6 pb-24">

      {/* HEADER */}
      <h1 className="text-6xl font-display">SYSTEM</h1>

      {/* INTRO */}
      <div className="bg-black text-accent p-6 border-4 border-accent">
        Dicecipline is a system where everything you do turns into points,
        but points only matter if you’re consistent.
      </div>

      {/* HABITS */}
      <div className="bg-accent text-black p-6 border-4 border-black space-y-3">
        <div className="font-display text-xl">HABITS</div>

        <p>You start with habits. That’s your base.</p>

        <div className="flex items-center gap-2 text-sm font-display">
          Habits <ArrowRight size={14} /> Points
        </div>

        <p>
          Every day, you complete what you scheduled. If you complete them,
          you get points.
        </p>
      </div>

      {/* POINTS */}
      <div className="bg-danger text-white p-6 border-4 border-black space-y-3">
        <div className="font-display text-xl">POINTS</div>

        <p>Points measure everything you do.</p>

        <div className="flex items-center gap-2 text-sm font-display">
          Points <ArrowRight size={14} /> Total Score
        </div>

        <p>
          Your total score never resets. It’s your lifetime effort.
        </p>
      </div>

      {/* STREAK */}
      <div className="bg-primary text-white p-6 border-4 border-black space-y-3">
        <div className="font-display text-xl">STREAK</div>

        <p>Streak is more important than points.</p>

        <div className="flex items-center gap-2 text-sm font-display">
          Complete ALL habits <ArrowRight size={14} /> Streak increases
        </div>

        <p>
          If you miss anything, it resets. Not most. Everything.
        </p>
      </div>

      {/* UNLOCK */}
      <div className="bg-black text-accent border-4 border-accent p-6 space-y-3">
        <div className="font-display text-xl">COMPETITION ACCESS</div>

        <div className="flex items-center gap-2 text-sm font-display">
          Streak &lt; 2 <ArrowRight size={14} /> Locked
        </div>

        <div className="flex items-center gap-2 text-sm font-display">
          Streak ≥ 2 <ArrowRight size={14} /> Leaderboard unlocked
        </div>

        <p>
          You can earn points immediately, but you can’t compete until you’re consistent.
        </p>
      </div>

      {/* DICE */}
      <div className="bg-danger text-white p-6 border-4 border-black space-y-3">
        <div className="font-display text-xl">DICE</div>

        <div className="flex items-center gap-2 text-sm font-display">
          Roll <ArrowRight size={14} /> Challenge <ArrowRight size={14} /> Extra points
        </div>

        <p>
          Optional, but high reward. This is how you push ahead.
        </p>
      </div>

      {/* LEADERBOARD */}
      <div className="bg-accent text-black p-6 border-4 border-black space-y-3">
        <div className="font-display text-xl">LEADERBOARD</div>

        <div className="flex items-center gap-2 text-sm font-display">
          Daily <ArrowRight size={14} /> resets every day
        </div>

        <div className="flex items-center gap-2 text-sm font-display">
          Weekly <ArrowRight size={14} /> consistency wins
        </div>

        <p>
          You compete using the points you earn.
        </p>
      </div>

      {/* ELITE */}
      <div className="bg-primary text-white p-6 border-4 border-black space-y-3">
        <div className="font-display text-xl">ELITE</div>

        <div className="flex items-center gap-2 text-sm font-display">
          Streak ≥ 7 <ArrowRight size={14} /> Elite
        </div>

        <p>
          High streak = harder to beat.
        </p>
      </div>

      {/* WIN */}
      <div className="bg-black text-accent border-4 border-accent p-6 space-y-3">
        <div className="font-display text-xl">WINNING</div>

        <div className="flex items-center gap-2 text-sm font-display">
          Habits <ArrowRight size={14} /> Streak <ArrowRight size={14} /> Points <ArrowRight size={14} /> Win
        </div>

        <p>
          To win, you:
          don’t miss days,
          complete everything,
          and push ahead with challenges.
        </p>

        <p>
          If you break your streak, you lose access to competition.
        </p>
      </div>

      {/* TROPHIES */}
      <div className="bg-danger text-white p-6 border-4 border-black space-y-3">
        <div className="font-display text-xl">TROPHIES</div>

        <div className="flex items-center gap-2 text-sm font-display">
          Win leaderboard <ArrowRight size={14} /> Trophy
        </div>

        <p>
          Trophies stay on your profile permanently.
        </p>
      </div>

    </div>
  );
};