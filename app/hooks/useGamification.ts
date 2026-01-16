import { useState } from "react";

export const useGamification = () => {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [showAchievement, setShowAchievement] = useState<string | null>(null);

  const addPoints = (amount: number) => {
    setPoints((prev) => {
      const newPoints = prev + amount;
      const newLevel = Math.floor(newPoints / 1000) + 1;
      if (newLevel > level) {
        setLevel(newLevel);
        setAchievements((prev) => [...prev, `Level ${newLevel} Reached!`]);
      }
      return newPoints;
    });
  };

  const addAchievement = (achievement: string) => {
    setAchievements((prev) => {
      if (!prev.includes(achievement)) {
        setShowAchievement(achievement);
        setTimeout(() => setShowAchievement(null), 3000);
        return [...prev, achievement];
      }
      return prev;
    });
  };

  const incrementTransaction = () => {
    const newCount = totalTransactions + 1;
    setTotalTransactions(newCount);

    if (newCount === 1) {
      addAchievement("First Transaction");
    } else if (newCount === 10) {
      addAchievement("10 Transactions");
    } else if (newCount === 50) {
      addAchievement("50 Transactions");
    }
  };

  return {
    points,
    level,
    streak,
    achievements,
    totalTransactions,
    showAchievement,
    setStreak,
    addPoints,
    addAchievement,
    incrementTransaction,
  };
};
