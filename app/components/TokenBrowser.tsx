"use client";

import React, { useState, useMemo } from "react";
import { Token } from "./types";
import { POPULAR_TOKENS, MAINNET_TOKENS } from "../config";
import { TokenIcon } from "./TokenIcon";

interface TokenBrowserProps {
  onSelectToken: (token: Token) => void;
  onClose: () => void;
  existingTokens: Token[];
}

export const TokenBrowser: React.FC<TokenBrowserProps> = ({
  onSelectToken,
  onClose,
  existingTokens,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const allTokens = useMemo(() => {
    try {
      const popular = Array.isArray(POPULAR_TOKENS) ? POPULAR_TOKENS : [];
      const mainnet = Array.isArray(MAINNET_TOKENS) ? MAINNET_TOKENS : [];
      const combined = [
        ...popular,
        ...mainnet.filter(
          (token) => !popular.find((t) => t.address === token.address)
        ),
      ];
      return combined;
    } catch (error) {
      console.error("Error loading tokens:", error);
      return [];
    }
  }, []);

  const categories = [
    { value: "all", label: "All Tokens" },
    { value: "stablecoins", label: "Stablecoins" },
    { value: "defi", label: "DeFi" },
    { value: "layer2", label: "Layer 2" },
    { value: "gaming", label: "Gaming" },
    { value: "meme", label: "Meme Coins" },
  ];

  const isTokenAdded = (token: Token) => {
    return existingTokens.some(
      (t) => t.address.toLowerCase() === token.address.toLowerCase()
    );
  };

  const availableTokens = allTokens.filter((token) => !isTokenAdded(token));

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-slate-800 rounded-xl sm:rounded-2xl border border-slate-700 max-w-lg w-full max-h-[85vh] sm:max-h-[80vh] flex flex-col">
        <div className="p-4 sm:p-6 border-b border-slate-700">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-white">Select Token to Add</h3>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          {availableTokens.length === 0 ? (
            <div className="text-center py-8 sm:py-12 text-slate-400">
              <p className="text-base sm:text-lg mb-2">All tokens added</p>
              <p className="text-xs sm:text-sm text-slate-500">
                You've already added all available tokens.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {availableTokens.map((token) => (
                <button
                  key={token.address}
                  onClick={() => onSelectToken(token)}
                  className="w-full flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-lg border border-slate-700 bg-slate-900 hover:border-orange-500 hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <TokenIcon token={token} size={40} className="sm:w-12 sm:h-12 flex-shrink-0" />
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm sm:text-base font-semibold text-white truncate">
                      {token.symbol}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-400 truncate">{token.name}</p>
                  </div>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-3 sm:p-4 border-t border-slate-700">
          <div className="bg-slate-900 rounded-lg p-2 sm:p-3">
            <p className="text-[10px] sm:text-xs text-slate-400">
              Showing {availableTokens.length} of {allTokens.length} available tokens
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
