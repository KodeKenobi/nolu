"use client";

import React from "react";

export const SettingsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-xl font-bold text-white mb-6">Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Theme
            </label>
            <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white">
              <option>Dark</option>
              <option>Light</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Default Currency
            </label>
            <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white">
              <option>USD</option>
              <option>ZAR</option>
              <option>EUR</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Language
            </label>
            <select className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white">
              <option>English</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
