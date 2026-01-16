import { EXCHANGE_RATES } from "../constants";

export const getCurrencySymbol = (currency: "USD" | "ZAR"): string => {
  return currency === "ZAR" ? "R" : "$";
};

export const convertToCurrency = (
  amount: number,
  currency: "USD" | "ZAR"
): number => {
  return currency === "ZAR" ? amount * EXCHANGE_RATES.USD_TO_ZAR : amount;
};
