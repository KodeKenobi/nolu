import { Token, TokenPrice } from "../components/types";
import { DEFAULT_PRICES } from "../constants";

export const calculateTotalBalance = (
  tokens: Token[],
  tokenPrices: Record<string, TokenPrice>
): number => {
  return tokens.reduce((sum, token) => {
    const price =
      tokenPrices[token.address]?.current ||
      (token.symbol === "ETH" ? DEFAULT_PRICES.ETH : DEFAULT_PRICES.DEFAULT_TOKEN);
    return sum + parseFloat(token.balance || "0") * price;
  }, 0);
};

export const calculatePortfolioGraphData = (
  tokens: Token[],
  tokenPrices: Record<string, TokenPrice>,
  previousData: number[] = []
): number[] => {
  const total = calculateTotalBalance(tokens, tokenPrices);
  return [...previousData.slice(-29), total].slice(-30);
};
