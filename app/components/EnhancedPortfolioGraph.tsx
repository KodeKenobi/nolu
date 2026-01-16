"use client";

import React, { useState, useMemo } from "react";

export type TimeRange = "1D" | "1W" | "1M" | "3M" | "1Y" | "ALL";
export type ChartType = "line" | "area" | "bar";

interface EnhancedPortfolioGraphProps {
  data: number[];
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  currencySymbol: string;
}

export const EnhancedPortfolioGraph: React.FC<EnhancedPortfolioGraphProps> = ({
  data,
  timeRange,
  onTimeRangeChange,
  currencySymbol,
}) => {
  const [chartType, setChartType] = React.useState<ChartType>("bar");

  const filteredData = useMemo(() => {
    if (data.length === 0) return [];
    
    const ranges: Record<TimeRange, number> = {
      "1D": 24,
      "1W": 7 * 24,
      "1M": 30 * 24,
      "3M": 90 * 24,
      "1Y": 365 * 24,
      "ALL": Infinity,
    };

    const maxPoints = ranges[timeRange];
    return data.slice(-maxPoints);
  }, [data, timeRange]);

  if (filteredData.length === 0) {
    return (
      <div className="h-56 flex items-center justify-center text-slate-400">
        <p>Loading chart data...</p>
      </div>
    );
  }

  const maxValue = Math.max(...filteredData);
  const minValue = Math.min(...filteredData);
  const range = maxValue - minValue || 1;
  const padding = range * 0.1;
  const adjustedMax = maxValue + padding;
  const adjustedMin = minValue - padding;
  const adjustedRange = adjustedMax - adjustedMin || 1;

  const pathData = filteredData
    .map((value, i) => {
      const x = (i / (filteredData.length - 1)) * 100;
      const y = 100 - ((value - adjustedMin) / adjustedRange) * 90 - 5;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const areaPath = `${pathData} L 100 95 L 0 95 Z`;

  const barWidth = 100 / filteredData.length;
  const bars = filteredData.map((value, i) => {
    const x = (i / filteredData.length) * 100;
    const height = ((value - adjustedMin) / adjustedRange) * 90;
    const y = 95 - height;
    return { x, y, width: barWidth * 0.8, height };
  });

  return (
    <div className="relative">
      <div className="flex flex-wrap justify-end gap-2 mb-2">
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value as ChartType)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
        >
          <option value="line">Line</option>
          <option value="area">Area</option>
          <option value="bar">Bar</option>
        </select>
        <select
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value as TimeRange)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-white focus:outline-none focus:border-orange-500 transition-colors"
        >
          <option value="1D">1D</option>
          <option value="1W">1W</option>
          <option value="1M">1M</option>
          <option value="3M">3M</option>
          <option value="1Y">1Y</option>
          <option value="ALL">All</option>
        </select>
      </div>

      <div className="relative h-48 sm:h-56 w-full">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient
              id="portfolioGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="barGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {chartType === "area" && (
            <>
              <path
                d={areaPath}
                fill="url(#portfolioGradient)"
              />
              <path
                d={pathData}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {chartType === "line" && (
            <path
              d={pathData}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {chartType === "bar" && (
            <>
              {bars.map((bar, i) => (
                <rect
                  key={i}
                  x={bar.x + bar.width * 0.1}
                  y={bar.y}
                  width={bar.width}
                  height={bar.height}
                  fill="url(#barGradient)"
                  rx="1"
                />
              ))}
            </>
          )}
        </svg>
      </div>
    </div>
  );
};
