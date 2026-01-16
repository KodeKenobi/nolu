import { useState, useEffect } from "react";
import { Token, TokenPrice } from "../components/types";
import { generateTokenPrice, updateTokenPrice } from "../utils/tokenPrice";
import { UPDATE_INTERVALS } from "../constants";

export const useTokenPrices = (tokens: Token[]) => {
  const [tokenPrices, setTokenPrices] = useState<Record<string, TokenPrice>>(
    {}
  );

  useEffect(() => {
    if (tokens.length > 0) {
      const newPrices: Record<string, TokenPrice> = {};
      tokens.forEach((token) => {
        if (!tokenPrices[token.address]) {
          newPrices[token.address] = generateTokenPrice(token.symbol);
        }
      });
      if (Object.keys(newPrices).length > 0) {
        setTokenPrices((prev) => ({ ...prev, ...newPrices }));
      }
    }
  }, [tokens]);

  useEffect(() => {
    if (tokens.length === 0) return;

    const updatePrices = () => {
      setTokenPrices((prev) => {
        const updated: typeof prev = {};
        Object.keys(prev).forEach((address) => {
          const token = tokens.find((t) => t.address === address);
          if (token) {
            const { newPrice, newHistory } = updateTokenPrice(
              prev[address].current,
              prev[address].history
            );

            updated[address] = {
              current: newPrice,
              previous: prev[address].current,
              history: newHistory,
              avgBuyPrice: prev[address].avgBuyPrice,
            };
          }
        });
        return { ...prev, ...updated };
      });
    };

    const interval = setInterval(updatePrices, UPDATE_INTERVALS.PRICE_UPDATE);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [tokens, tokenPrices]);

  const initializePriceForToken = (address: string, symbol: string) => {
    setTokenPrices((prev) => ({
      ...prev,
      [address]: generateTokenPrice(symbol, prev[address]),
    }));
  };

  return { tokenPrices, setTokenPrices, initializePriceForToken };
};
