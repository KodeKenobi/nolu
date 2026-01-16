"use client";

import React, { useState } from "react";
import { EnhancedPortfolioGraph, TimeRange } from "./EnhancedPortfolioGraph";

interface PortfolioBalanceProps {
  convertedBalance: number;
  convertedBalanceChange: number;
  balanceChangePercent: number;
  balanceChange: number;
  portfolioGraphData: number[];
  getCurrencySymbol: () => string;
}

export const PortfolioBalance: React.FC<PortfolioBalanceProps> = ({
  convertedBalance,
  convertedBalanceChange,
  balanceChangePercent,
  portfolioGraphData,
  getCurrencySymbol,
}) => {
  const [timeRange, setTimeRange] = useState<TimeRange>("1W");

  return (
    <div className="bg-slate-800 rounded-xl p-3 sm:p-4 md:p-6 border border-slate-700">
      <div className="flex items-start sm:items-center justify-between mb-3 sm:mb-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-base sm:text-lg font-semibold text-white mb-1">
            Portfolio Balance
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-white break-words">
            {getCurrencySymbol()}
            {convertedBalance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p
            className={`text-xs sm:text-sm mt-1 ${
              convertedBalanceChange >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {convertedBalanceChange >= 0 ? "+" : ""}
            {getCurrencySymbol()}
            {convertedBalanceChange.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            ({balanceChangePercent >= 0 ? "+" : ""}
            {balanceChangePercent.toFixed(2)}%) 24h
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-400">Live</span>
            </div>
          </div>
        </div>
      </div>
      {portfolioGraphData.length > 1 ? (
        <EnhancedPortfolioGraph
          data={portfolioGraphData}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          currencySymbol={getCurrencySymbol()}
        />
      ) : (
        <div className="h-64 flex items-center justify-center text-slate-400">
          <p>Loading chart data...</p>
        </div>
      )}
    </div>
  );
};
