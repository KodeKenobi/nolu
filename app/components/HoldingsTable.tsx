"use client";

import React from "react";
import { Token, TokenPrice } from "./types";
import { TokenIcon } from "./TokenIcon";
import { Sparkline, SparklineWithData } from "./Sparkline";

interface HoldingsTableProps {
  tokens: Token[];
  tokenPrices: Record<string, TokenPrice>;
  totalBalance: number;
  currency: "USD" | "ZAR";
  exchangeRate: number;
  getCurrencySymbol: () => string;
  onSendClick: (tokenIndex: number) => void;
  onAddToken: () => void;
}

export const HoldingsTable: React.FC<HoldingsTableProps> = ({
  tokens,
  tokenPrices,
  totalBalance,
  currency,
  exchangeRate,
  getCurrencySymbol,
  onSendClick,
  onAddToken,
}) => {
  if (tokens.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700">
        <div className="p-12 text-center">
          <p className="text-slate-400 mb-4">No tokens found</p>
          <button
            onClick={onAddToken}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Add Token
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700">
      <div className="p-3 sm:p-4 border-b border-slate-700 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <select className="bg-slate-900 border border-slate-700 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-white focus:outline-none flex-1 sm:flex-none">
            <option>Holdings</option>
          </select>
        </div>
        <div className="relative flex-1 sm:flex-none">
          <input
            type="text"
            placeholder="Search..."
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 pl-8 sm:pl-10 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-orange-500 w-full sm:w-48"
          />
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400 absolute left-2 sm:left-3 top-2 sm:top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="overflow-x-auto -mx-3 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-slate-400">
                  Name
                </th>
                <th className="text-right py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-slate-400 hidden sm:table-cell">
                  Amount
                </th>
                <th className="text-right py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-slate-400 hidden md:table-cell">
                  Avg. Buy
                </th>
                <th className="text-right py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-slate-400 hidden lg:table-cell">
                  Allocation
                </th>
                <th className="text-right py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-slate-400 hidden sm:table-cell">
                  Price
                </th>
                <th className="text-right py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-slate-400">
                  Total
                </th>
                <th className="text-right py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-slate-400 hidden md:table-cell">
                  24h P/L
                </th>
                <th className="text-center py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-slate-400">
                  Action
                </th>
              </tr>
            </thead>
          <tbody>
            {tokens.map((token, index) => {
              const balance = parseFloat(token.balance || "0");
              const priceData = tokenPrices[token.address] || {
                current: token.symbol === "ETH" ? 1889.01 : 100,
                previous: token.symbol === "ETH" ? 1889.01 : 100,
                history: [],
                avgBuyPrice: token.symbol === "ETH" ? 1889.01 : 100,
              };
              const price = priceData.current;
              const total = balance * price;
              const allocation =
                totalBalance > 0 ? (total / totalBalance) * 100 : 0;
              const change24h =
                priceData.previous > 0
                  ? ((priceData.current - priceData.previous) /
                      priceData.previous) *
                    100
                  : 0;
              const isPositive = change24h >= 0;
              const avgBuyPrice = priceData.avgBuyPrice;

              return (
                <tr
                  key={token.address}
                  className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                >
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <TokenIcon token={token} size={28} className="sm:w-8 sm:h-8" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-semibold text-white truncate">
                          {token.symbol}
                        </p>
                        <p className="text-[10px] sm:text-xs text-slate-400 truncate hidden sm:block">{token.name}</p>
                        <p className="text-[10px] sm:text-xs text-slate-400 sm:hidden">{balance.toFixed(2)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-right py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-white hidden sm:table-cell">
                    {balance.toFixed(4)}
                  </td>
                  <td className="text-right py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-white hidden md:table-cell">
                    {getCurrencySymbol()}
                    {(currency === "ZAR"
                      ? avgBuyPrice * exchangeRate
                      : avgBuyPrice
                    ).toFixed(2)}
                  </td>
                  <td className="text-right py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-white hidden lg:table-cell">
                    {allocation.toFixed(1)}%
                  </td>
                  <td className="text-right py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-white hidden sm:table-cell">
                    {getCurrencySymbol()}
                    {(currency === "ZAR" ? price * exchangeRate : price).toFixed(
                      2
                    )}
                  </td>
                  <td className="text-right py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold text-white">
                    {getCurrencySymbol()}
                    {(currency === "ZAR" ? total * exchangeRate : total).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </td>
                  <td className="text-right py-3 sm:py-4 px-2 sm:px-4 hidden md:table-cell">
                    <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                      <div className="text-right">
                        <p
                          className={`text-xs sm:text-sm font-semibold ${
                            isPositive ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {isPositive ? "+" : ""}
                          {change24h.toFixed(2)}%
                        </p>
                      </div>
                      {priceData.history.length > 0 ? (
                        <SparklineWithData
                          data={priceData.history}
                          isPositive={isPositive}
                        />
                      ) : (
                        <Sparkline isPositive={isPositive} />
                      )}
                    </div>
                  </td>
                  <td className="py-3 sm:py-4 px-2 sm:px-4">
                    <button
                      onClick={() => onSendClick(index)}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 bg-orange-500 text-white text-[10px] sm:text-xs rounded-lg hover:bg-orange-600 transition-colors font-medium w-full sm:w-auto"
                    >
                      Send
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};
