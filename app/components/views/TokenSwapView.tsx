"use client";

import React from "react";
import { EmptyStateView } from "./EmptyStateView";

export const TokenSwapView: React.FC = () => {
  return (
    <EmptyStateView
      title="Token Swap"
      description="Swap tokens directly from your wallet using DEX integration. Connect your wallet to get started."
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
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      }
    />
  );
};
