"use client";

import React from "react";

interface EmptyStateViewProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyStateView: React.FC<EmptyStateViewProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <div className="bg-slate-800/50 rounded-2xl p-8 max-w-md w-full text-center border border-slate-700/50">
        {icon && (
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-full flex items-center justify-center">
              {icon}
            </div>
          </div>
        )}
        <h2 className="text-2xl font-bold text-white mb-3">{title}</h2>
        <p className="text-slate-400 mb-6">{description}</p>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};
