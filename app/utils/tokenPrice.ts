import { DEFAULT_PRICES, PRICE_SIMULATION } from "../constants";

export const generateTokenPrice = (
  symbol: string,
  existingPrice?: { current: number; avgBuyPrice: number }
) => {
  const basePrice =
    symbol === "ETH"
      ? DEFAULT_PRICES.ETH
      : existingPrice?.current || DEFAULT_PRICES.DEFAULT_TOKEN;

  const history = Array.from(
    { length: PRICE_SIMULATION.HISTORY_LENGTH },
    () => basePrice + (Math.random() - 0.5) * basePrice * PRICE_SIMULATION.CHANGE_PERCENT
  );

  const avgBuyPrice =
    existingPrice?.avgBuyPrice ||
    basePrice *
      (PRICE_SIMULATION.AVG_BUY_PRICE_RANGE.min +
        Math.random() *
          (PRICE_SIMULATION.AVG_BUY_PRICE_RANGE.max -
            PRICE_SIMULATION.AVG_BUY_PRICE_RANGE.min));

  return {
    current: basePrice,
    previous: history[history.length - 2] || basePrice,
    history: history,
    avgBuyPrice: avgBuyPrice,
  };
};

export const updateTokenPrice = (
  currentPrice: number,
  previousHistory: number[]
) => {
  const changePercent =
    (Math.random() - 0.5) * PRICE_SIMULATION.CHANGE_PERCENT;
  const newPrice = Math.max(0.01, currentPrice * (1 + changePercent));
  const newHistory = [...previousHistory.slice(1), newPrice].slice(
    -PRICE_SIMULATION.HISTORY_LENGTH
  );

  return {
    newPrice,
    newHistory,
  };
};
