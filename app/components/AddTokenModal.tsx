"use client";

import React from "react";

interface AddTokenModalProps {
  show: boolean;
  loading: boolean;
  newTokenAddress: string;
  onClose: () => void;
  onAddToken: () => void;
  onAddressChange: (address: string) => void;
}

export const AddTokenModal: React.FC<AddTokenModalProps> = ({
  show,
  loading,
  newTokenAddress,
  onClose,
  onAddToken,
  onAddressChange,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-slate-800 rounded-xl sm:rounded-2xl border border-slate-700 p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-white">Add Token</h3>
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
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
              Token Contract Address or Symbol
            </label>
            <input
              type="text"
              value={newTokenAddress}
              onChange={(e) => onAddressChange(e.target.value)}
              placeholder="0x... or 'ETH' for Ethereum"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-white placeholder:text-slate-400 text-sm sm:text-base"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={onAddToken}
              disabled={loading || !newTokenAddress}
              className="flex-1 bg-orange-500 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
            >
              {loading ? "Adding..." : "Add Token"}
            </button>
            <button
              onClick={onClose}
              className="px-4 sm:px-6 py-2.5 sm:py-3 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
