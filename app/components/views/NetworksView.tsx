"use client";

import React from "react";

export const NetworksView: React.FC = () => {
  const networks = [
    { name: "Ethereum", chainId: 1, status: "active" },
    { name: "Polygon", chainId: 137, status: "inactive" },
    { name: "BNB Chain", chainId: 56, status: "inactive" },
    { name: "Arbitrum", chainId: 42161, status: "inactive" },
    { name: "Optimism", chainId: 10, status: "inactive" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-xl font-bold text-white mb-6">Network Management</h2>
        <div className="space-y-3">
          {networks.map((network) => (
            <div
              key={network.chainId}
              className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30 flex items-center justify-between"
            >
              <div>
                <h3 className="text-white font-medium">{network.name}</h3>
                <p className="text-slate-400 text-sm">Chain ID: {network.chainId}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    network.status === "active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-slate-600/50 text-slate-400"
                  }`}
                >
                  {network.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
