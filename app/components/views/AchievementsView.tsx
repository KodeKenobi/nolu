"use client";

import React from "react";

interface AchievementsViewProps {
  points: number;
  level: number;
  achievements: string[];
  streak: number;
  totalTransactions: number;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  points,
  level,
  achievements,
  streak,
  totalTransactions,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-xl font-bold text-white mb-6">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-lg p-4 border border-orange-500/30">
            <p className="text-slate-400 text-sm mb-1">Level</p>
            <p className="text-3xl font-bold text-white">{level}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-lg p-4 border border-orange-500/30">
            <p className="text-slate-400 text-sm mb-1">Points</p>
            <p className="text-3xl font-bold text-white">{points.toLocaleString()}</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30">
            <p className="text-slate-400 text-sm mb-1">Streak</p>
            <p className="text-2xl font-bold text-white">{streak} days</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30">
            <p className="text-slate-400 text-sm mb-1">Transactions</p>
            <p className="text-2xl font-bold text-white">{totalTransactions}</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Unlocked Achievements</h3>
          <div className="space-y-2">
            {achievements.length > 0 ? (
              achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-slate-700/30 rounded-lg p-3 border border-slate-700/30 flex items-center space-x-3"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-white font-medium">{achievement}</span>
                </div>
              ))
            ) : (
              <p className="text-slate-400 text-sm">No achievements unlocked yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
