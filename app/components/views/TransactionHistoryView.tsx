"use client";

import React, { useState } from "react";
import { EmptyStateView } from "./EmptyStateView";

export const TransactionHistoryView: React.FC = () => {
  const [transactions] = useState<any[]>([]);

  if (transactions.length === 0) {
    return (
      <EmptyStateView
        title="No Transactions Yet"
        description="Your transaction history will appear here once you start making transfers, swaps, or other blockchain interactions."
        icon={
          <svg
            className="w-8 h-8 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-xl font-bold text-white mb-4">Transaction History</h2>
        <div className="space-y-2">
          {transactions.map((tx, index) => (
            <div
              key={index}
              className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{tx.type}</p>
                  <p className="text-slate-400 text-sm">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{tx.amount}</p>
                  <p className="text-slate-400 text-sm">{tx.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
