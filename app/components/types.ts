export interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  balance?: string;
  totalSupply?: string;
  isNative?: boolean;
}

export interface SavedAddress {
  address: string;
  name: string;
  label?: string;
}

export interface TokenPrice {
  current: number;
  previous: number;
  history: number[];
  avgBuyPrice: number;
}
