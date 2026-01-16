export const EXCHANGE_RATES = {
  USD_TO_ZAR: 18.5,
} as const;

export const DEFAULT_PRICES = {
  ETH: 1889.01,
  DEFAULT_TOKEN: 100,
} as const;

export const NETWORK_CONFIG = {
  LOCALHOST_URL: process.env.NEXT_PUBLIC_LOCALHOST_URL || "http://127.0.0.1:8545",
  DEFAULT_PRIVATE_KEY: process.env.NEXT_PUBLIC_DEFAULT_PRIVATE_KEY || "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
} as const;

export const STORAGE_KEYS = {
  SAVED_ADDRESSES: "nolu_saved_addresses",
} as const;

export const UPDATE_INTERVALS = {
  PRICE_UPDATE: 2000,
} as const;

export const PRICE_SIMULATION = {
  HISTORY_LENGTH: 20,
  CHANGE_PERCENT: 0.05,
  AVG_BUY_PRICE_RANGE: { min: 0.8, max: 1.2 },
} as const;
