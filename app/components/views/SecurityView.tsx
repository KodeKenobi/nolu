"use client";

import React from "react";

export const SecurityView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-xl font-bold text-white mb-6">Security Center</h2>
        <div className="space-y-4">
          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30">
            <h3 className="text-white font-medium mb-2">Connected Wallets</h3>
            <p className="text-slate-400 text-sm">Manage your connected wallets and permissions.</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30">
            <h3 className="text-white font-medium mb-2">Address Book</h3>
            <p className="text-slate-400 text-sm">Manage your saved addresses and whitelist.</p>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700/30">
            <h3 className="text-white font-medium mb-2">Transaction Preferences</h3>
            <p className="text-slate-400 text-sm">Configure transaction signing and security settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
