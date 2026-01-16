"use client";

import React from "react";

interface OnboardingScreenProps {
  mounted: boolean;
  isLocalDevelopment: boolean;
  onConnectWallet: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  mounted,
  isLocalDevelopment,
  onConnectWallet,
}) => {
  return (
    <div className="max-w-md mx-auto mt-8 sm:mt-12 md:mt-20 px-4">
      <div className="bg-slate-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-slate-700">
        <div className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {mounted && isLocalDevelopment
              ? "Connecting to Network"
              : "Welcome to Nolu"}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mb-6 sm:mb-8">
            {mounted && isLocalDevelopment
              ? "Setting up your secure blockchain connection..."
              : "Connect your wallet to access your portfolio"}
          </p>
          {mounted && !isLocalDevelopment && (
            <button
              onClick={onConnectWallet}
              className="w-full bg-orange-500 text-white py-3 sm:py-4 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm sm:text-base"
            >
              Connect Wallet
            </button>
          )}
          {mounted && isLocalDevelopment && (
            <div className="flex items-center justify-center space-x-2 text-slate-300">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent"></div>
              <span className="text-xs sm:text-sm">Connecting...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
