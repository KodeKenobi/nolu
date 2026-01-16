"use client";

import React from "react";

interface StatusMessagesProps {
  error: string;
  success: string;
  onCloseError?: () => void;
  onCloseSuccess?: () => void;
}

export const StatusMessages: React.FC<StatusMessagesProps> = ({
  error,
  success,
  onCloseError,
  onCloseSuccess,
}) => {
  return (
    <>
      {error && (
        <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 bg-red-500/20 border border-red-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-xl z-50 min-w-[280px] sm:min-w-[300px] max-w-[calc(100vw-24px)] sm:max-w-md">
          <div className="flex items-start space-x-3">
            <svg
              className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-red-300 break-words flex-1">{error}</p>
            {onCloseError && (
              <button
                onClick={onCloseError}
                className="text-red-400 hover:text-red-300 transition-colors flex-shrink-0"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {success && (
        <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 bg-green-500/20 border border-green-500/30 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-xl z-50 min-w-[280px] sm:min-w-[300px] max-w-[calc(100vw-24px)] sm:max-w-md">
          <div className="flex items-start space-x-3">
            <svg
              className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-green-300 break-words flex-1">{success}</p>
            {onCloseSuccess && (
              <button
                onClick={onCloseSuccess}
                className="text-green-400 hover:text-green-300 transition-colors flex-shrink-0"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
