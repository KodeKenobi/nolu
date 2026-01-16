"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Token, SavedAddress } from "./types";

interface TransferModalProps {
  show: boolean;
  tokens: Token[];
  selectedTokenIndex: number;
  transferTo: string;
  transferAmount: string;
  loading: boolean;
  savedAddresses: SavedAddress[];
  onClose: () => void;
  onTransfer: () => void;
  onTokenSelect: (index: number) => void;
  onRecipientChange: (address: string) => void;
  onAmountChange: (amount: string) => void;
  onSaveAddress: (address: string, name: string) => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({
  show,
  tokens,
  selectedTokenIndex,
  transferTo,
  transferAmount,
  loading,
  savedAddresses,
  onClose,
  onTransfer,
  onTokenSelect,
  onRecipientChange,
  onAmountChange,
  onSaveAddress,
}) => {
  const [showAddressList, setShowAddressList] = useState(false);
  const [newAddressName, setNewAddressName] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".address-list-container")) {
        setShowAddressList(false);
      }
    };

    if (showAddressList) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showAddressList]);

  if (!show || tokens.length === 0) return null;

  const handleSaveAddress = () => {
    if (transferTo && ethers.isAddress(transferTo)) {
      const name = newAddressName.trim() || `Address ${savedAddresses.length + 1}`;
      onSaveAddress(transferTo, name);
      setNewAddressName("");
      setShowAddressList(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-slate-800 rounded-xl sm:rounded-2xl border border-slate-700 p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-white">Transfer Funds</h3>
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
              Select Token
            </label>
            <select
              value={selectedTokenIndex}
              onChange={(e) => onTokenSelect(Number(e.target.value))}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-900 border border-slate-700 rounded-lg text-sm sm:text-base text-white focus:outline-none focus:border-orange-500"
            >
              {tokens.map((token, idx) => (
                <option key={token.address} value={idx} className="bg-slate-900">
                  {token.symbol} - Balance: {token.balance}
                </option>
              ))}
            </select>
          </div>

          <div className="relative address-list-container">
            <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
              Recipient Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={transferTo}
                onChange={(e) => onRecipientChange(e.target.value)}
                onFocus={() => setShowAddressList(true)}
                placeholder="0x... or select from saved"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-white placeholder:text-slate-400 font-mono text-xs sm:text-sm pr-8 sm:pr-10"
              />
              <button
                onClick={() => setShowAddressList(!showAddressList)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {showAddressList && (
              <div className="absolute z-10 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                {savedAddresses.length > 0 ? (
                  <div className="py-2">
                    {savedAddresses.map((saved, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          onRecipientChange(saved.address);
                          setShowAddressList(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors flex items-center justify-between"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">
                            {saved.name}
                          </p>
                          <p className="text-xs text-slate-400 font-mono truncate">
                            {saved.address}
                          </p>
                          {saved.label && (
                            <p className="text-xs text-slate-500 mt-0.5">
                              {saved.label}
                            </p>
                          )}
                        </div>
                        <svg
                          className="w-4 h-4 text-slate-400 ml-2 flex-shrink-0"
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
                ) : (
                  <div className="px-4 py-3 text-sm text-slate-400 text-center">
                    No saved addresses
                  </div>
                )}
                <div className="border-t border-slate-700 p-2">
                  <button
                    onClick={handleSaveAddress}
                    disabled={!transferTo || !ethers.isAddress(transferTo)}
                    className="w-full px-3 py-2 text-xs bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Save Current Address
                  </button>
                  {transferTo && ethers.isAddress(transferTo) && (
                    <input
                      type="text"
                      value={newAddressName}
                      onChange={(e) => setNewAddressName(e.target.value)}
                      placeholder="Name for this address"
                      className="w-full mt-2 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs placeholder:text-slate-400 focus:outline-none focus:border-orange-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
              Amount
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={transferAmount}
                onChange={(e) => onAmountChange(e.target.value)}
                placeholder="0.0"
                step="any"
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-white placeholder:text-slate-400 text-sm sm:text-base"
              />
              <button
                onClick={() => {
                  const selectedToken = tokens[selectedTokenIndex];
                  if (selectedToken) {
                    onAmountChange(selectedToken.balance || "0");
                  }
                }}
                className="px-2 sm:px-3 py-2 sm:py-3 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg transition-colors font-medium"
              >
                MAX
              </button>
            </div>
            {tokens[selectedTokenIndex] && (
              <p className="text-xs text-slate-400 mt-1">
                Available: {tokens[selectedTokenIndex].balance}{" "}
                {tokens[selectedTokenIndex].symbol}
              </p>
            )}
          </div>

          {transferAmount && transferTo && tokens[selectedTokenIndex] && (
            <div className="bg-slate-900 rounded-lg p-3 sm:p-4 border border-slate-700">
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">You're sending:</span>
                  <span className="text-white font-semibold">
                    {transferAmount} {tokens[selectedTokenIndex].symbol}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">To:</span>
                  <span className="text-white font-mono text-xs">
                    {transferTo.slice(0, 6)}...{transferTo.slice(-4)}
                  </span>
                </div>
                {tokens[selectedTokenIndex].isNative && (
                  <div className="flex justify-between pt-2 border-t border-slate-700">
                    <span className="text-slate-400">Network Fee:</span>
                    <span className="text-slate-300 text-xs">~0.000021 ETH</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={onTransfer}
              disabled={loading || !transferTo || !transferAmount || tokens.length === 0}
              className="flex-1 bg-orange-500 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
            >
              {loading ? "Processing..." : "Send Transfer"}
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
