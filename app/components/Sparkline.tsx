"use client";

import React from "react";

interface SparklineProps {
  isPositive: boolean;
}

export const Sparkline: React.FC<SparklineProps> = ({ isPositive }) => {
  const points = 20;
  const data = React.useMemo(() => {
    const values = [];
    let current = 50;
    for (let i = 0; i < points; i++) {
      current += (Math.random() - 0.5) * 10;
      current = Math.max(10, Math.min(90, current));
      values.push(current);
    }
    return values;
  }, []);

  const pathData = data
    .map((value, i) => {
      const x = (i / (points - 1)) * 100;
      const y = 100 - value;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const color = isPositive ? "#10b981" : "#ef4444";

  return (
    <div className="w-16 h-6">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

interface SparklineWithDataProps {
  data: number[];
  isPositive: boolean;
}

export const SparklineWithData: React.FC<SparklineWithDataProps> = ({
  data,
  isPositive,
}) => {
  if (data.length === 0) return <Sparkline isPositive={isPositive} />;

  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;

  const pathData = data
    .map((value, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((value - minValue) / range) * 90 - 5;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const color = isPositive ? "#10b981" : "#ef4444";

  return (
    <div className="w-16 h-6">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
