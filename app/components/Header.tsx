"use client";

import React from "react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currency: "USD" | "ZAR";
  setCurrency: (currency: "USD" | "ZAR") => void;
  account: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  account,
}) => {
  return (
    <header className="bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 px-3 sm:px-4 md:px-6 py-3 sm:py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-8">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <span className="text-base sm:text-lg font-bold text-white drop-shadow-lg">
              Nolu
            </span>
          </div>

          <nav className="hidden sm:flex items-center space-x-4 md:space-x-6">
            <button
              onClick={() => setActiveTab("portfolio")}
              className={`pb-2 text-xs sm:text-sm font-medium transition-all duration-300 relative group ${
                activeTab === "portfolio"
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span className="relative z-10">Portfolio</span>
              {activeTab === "portfolio" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"></span>
              )}
              <span className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></span>
            </button>
          </nav>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as "USD" | "ZAR")}
            className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-lg px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500/80 focus:ring-2 focus:ring-orange-500/20 min-w-[70px] sm:min-w-[90px] md:min-w-[100px] cursor-pointer transition-all duration-300 hover:bg-slate-900/80 hover:border-slate-600/60 hover:shadow-[0_0_15px_rgba(249,115,22,0.2)]"
          >
            <option value="USD" className="bg-slate-900 py-2">
              USD
            </option>
            <option value="ZAR" className="bg-slate-900 py-2">
              ZAR
            </option>
          </select>
          {account && (
            <div className="hidden sm:flex items-center space-x-2 md:space-x-3 px-2 md:px-3 py-1.5 md:py-2 bg-slate-900/60 backdrop-blur-md rounded-lg border border-slate-700/50 transition-all duration-300 hover:bg-slate-800/80 hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:scale-105 group">
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-orange-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-[0_0_15px_rgba(249,115,22,0.6)] transition-shadow duration-300">
                <span className="text-white text-[10px] sm:text-xs font-bold">IM</span>
              </div>
              <span className="text-xs sm:text-sm text-white group-hover:text-orange-300 transition-colors duration-300 hidden md:inline">
                Ignatius Mutizwa
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
