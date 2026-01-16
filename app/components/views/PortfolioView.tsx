"use client";

import React from "react";
import { PortfolioBalance } from "../PortfolioBalance";
import { HoldingsTable } from "../HoldingsTable";
import { Token, TokenPrice } from "../types";

interface PortfolioViewProps {
  tokens: Token[];
  tokenPrices: Record<string, TokenPrice>;
  totalBalance: number;
  currency: "USD" | "ZAR";
  exchangeRate: number;
  portfolioGraphData: number[];
  convertedBalance: number;
  convertedBalanceChange: number;
  balanceChangePercent: number;
  balanceChange: number;
  getCurrencySymbol: () => string;
  onSendClick: (index: number) => void;
  onAddToken: () => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  tokens,
  tokenPrices,
  totalBalance,
  currency,
  exchangeRate,
  portfolioGraphData,
  convertedBalance,
  convertedBalanceChange,
  balanceChangePercent,
  balanceChange,
  getCurrencySymbol,
  onSendClick,
  onAddToken,
}) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <PortfolioBalance
        convertedBalance={convertedBalance}
        convertedBalanceChange={convertedBalanceChange}
        balanceChangePercent={balanceChangePercent}
        balanceChange={balanceChange}
        portfolioGraphData={portfolioGraphData}
        getCurrencySymbol={getCurrencySymbol}
      />
      <HoldingsTable
        tokens={tokens}
        tokenPrices={tokenPrices}
        totalBalance={totalBalance}
        currency={currency}
        exchangeRate={exchangeRate}
        getCurrencySymbol={getCurrencySymbol}
        onSendClick={onSendClick}
        onAddToken={onAddToken}
      />
    </div>
  );
};
