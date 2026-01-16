"use client";

import React from "react";
import { EmptyStateView } from "./EmptyStateView";

export const StakingView: React.FC = () => {
  return (
    <EmptyStateView
      title="Staking & Yield Farming"
      description="Earn passive income by staking your tokens. Browse available staking pools and start earning rewards."
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      }
    />
  );
};
