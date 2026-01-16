export const NATIVE_TOKEN = {
  address: "0x0000000000000000000000000000000000000000",
  name: "Ethereum",
  symbol: "ETH",
  decimals: 18,
  isNative: true,
};

export const DEFAULT_TOKENS = [
  NATIVE_TOKEN,
  {
    address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    name: "MyToken",
    symbol: "MTK",
    decimals: 18,
  },
];

export const POPULAR_TOKENS = [
  {
    address: "0x0000000000000000000000000000000000000000",
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    isNative: true,
  },
  {
    address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    name: "MyToken",
    symbol: "MTK",
    decimals: 18,
  },
];

export const MAINNET_TOKENS = [
  {
    address: "0x0000000000000000000000000000000000000000",
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    isNative: true,
  },

  {
    address: "0xA0b86a33E6441e88C5F2712C3E9b74Ec6f3c6dA8",
    name: "USD Coin",
    symbol: "USDC",
    decimals: 6,
  },
  {
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    name: "Tether USD",
    symbol: "USDT",
    decimals: 6,
  },
  {
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    name: "Dai Stablecoin",
    symbol: "DAI",
    decimals: 18,
  },
  {
    address: "0x853d955aCEf822Db058eb8505911ED77F175b99e",
    name: "Frax",
    symbol: "FRAX",
    decimals: 18,
  },
  {
    address: "0x956F47F50A910163D8BF957Cf5846D573E7f87CA",
    name: "Fei USD",
    symbol: "FEI",
    decimals: 18,
  },

  {
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    name: "Uniswap",
    symbol: "UNI",
    decimals: 18,
  },
  {
    address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    name: "Aave",
    symbol: "AAVE",
    decimals: 18,
  },
  {
    address: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
    name: "Compound",
    symbol: "COMP",
    decimals: 18,
  },
  {
    address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    name: "ChainLink Token",
    symbol: "LINK",
    decimals: 18,
  },
  {
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    decimals: 8,
  },
  {
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    name: "Wrapped Ethereum",
    symbol: "WETH",
    decimals: 18,
  },
  {
    address: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
    name: "yearn.finance",
    symbol: "YFI",
    decimals: 18,
  },
  {
    address: "0xD533a949740bb3306d119CC777fa900bA034cd52a",
    name: "Curve DAO Token",
    symbol: "CRV",
    decimals: 18,
  },
  {
    address: "0xba100000625a3754423978a60c9317c58a5Ee5FF9",
    name: "Balancer",
    symbol: "BAL",
    decimals: 18,
  },

  {
    address: "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32",
    name: "Lido DAO Token",
    symbol: "LDO",
    decimals: 18,
  },
  {
    address: "0x111111111117dC0aa78b770fA6A738034120C302",
    name: "1inch",
    symbol: "1INCH",
    decimals: 18,
  },
  {
    address: "0x4d224452801ACEd8B2F0aebE155379bb5D594381",
    name: "ApeCoin",
    symbol: "APE",
    decimals: 18,
  },

  {
    address: "0x3845badAde8e6dFF049820680d1F14bD3903a5d0",
    name: "The Sandbox",
    symbol: "SAND",
    decimals: 18,
  },
  {
    address: "0x6C8c6b02E7b2BE14d4fA6022Dfd6d75921D90E4E",
    name: "Axie Infinity",
    symbol: "AXS",
    decimals: 18,
  },
  {
    address: "0xCC8Fa225D80b9c7D42F96e9570156c65D6cAAa25",
    name: "Smooth Love Potion",
    symbol: "SLP",
    decimals: 0,
  },

  {
    address: "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
    name: "Pepe",
    symbol: "PEPE",
    decimals: 18,
  },
  {
    address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    name: "Matic Token",
    symbol: "MATIC",
    decimals: 18,
  },

  {
    address: "0x0F5D2fB29fb7d3CFeE444a200298f468908cC942",
    name: "Decentraland",
    symbol: "MANA",
    decimals: 18,
  },
  {
    address: "0x967da4048cD07aB37855c090aAF366e4ce1b9F48",
    name: "Ocean Token",
    symbol: "OCEAN",
    decimals: 18,
  },

  {
    address: "0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671",
    name: "Numeraire",
    symbol: "NMR",
    decimals: 18,
  },
];

export const TOKEN_CATEGORIES = {
  native: [MAINNET_TOKENS[0]],
  stablecoins: MAINNET_TOKENS.slice(1, 7),
  defi: MAINNET_TOKENS.slice(7, 18),
  infrastructure: MAINNET_TOKENS.slice(18, 21),
  gaming: MAINNET_TOKENS.slice(21, 24),
  meme: MAINNET_TOKENS.slice(24, 26),
  other: MAINNET_TOKENS.slice(26),
};

export const CONTRACT_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
] as const;

export const TOKEN_LIST_SOURCES = {
  uniswap: "https://tokens.uniswap.org/",
  oneinch: "https://tokens.1inch.io/v1.1/",
  coingecko: "https://tokens.coingecko.com/",
  custom: [],
};

export const POPULAR_PAIRS = [
  { base: "ETH", quote: "USDC" },
  { base: "ETH", quote: "USDT" },
  { base: "WBTC", quote: "ETH" },
  { base: "UNI", quote: "ETH" },
  { base: "AAVE", quote: "ETH" },
  { base: "LINK", quote: "ETH" },
];

export const TRUST_WALLET_ICON_BASE =
  "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets";

export const TOKEN_ICONS: Record<string, string> = {
  "0x0000000000000000000000000000000000000000": `${TRUST_WALLET_ICON_BASE}/0x0000000000000000000000000000000000000000/logo.png`,

  "0xA0b86a33E6441e88C5F2712C3E9b74Ec6f3c6dA8": `${TRUST_WALLET_ICON_BASE}/0xA0b86a33E6441e88C5F2712C3E9b74Ec6f3c6dA8/logo.png`,
  "0xdAC17F958D2ee523a2206206994597C13D831ec7": `${TRUST_WALLET_ICON_BASE}/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png`,
  "0x6B175474E89094C44Da98b954EedeAC495271d0F": `${TRUST_WALLET_ICON_BASE}/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png`,
  "0x853d955aCEf822Db058eb8505911ED77F175b99e": `${TRUST_WALLET_ICON_BASE}/0x853d955aCEf822Db058eb8505911ED77F175b99e/logo.png`,
  "0x956F47F50A910163D8BF957Cf5846D573E7f87CA": `${TRUST_WALLET_ICON_BASE}/0x956F47F50A910163D8BF957Cf5846D573E7f87CA/logo.png`,
  "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984": `${TRUST_WALLET_ICON_BASE}/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png`,
  "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9": `${TRUST_WALLET_ICON_BASE}/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png`,
  "0xc00e94Cb662C3520282E6f5717214004A7f26888": `${TRUST_WALLET_ICON_BASE}/0xc00e94Cb662C3520282E6f5717214004A7f26888/logo.png`,
  "0x514910771AF9Ca656af840dff83E8264EcF986CA": `${TRUST_WALLET_ICON_BASE}/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png`,
  "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599": `${TRUST_WALLET_ICON_BASE}/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png`,
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2": `${TRUST_WALLET_ICON_BASE}/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png`,
  "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e": `${TRUST_WALLET_ICON_BASE}/0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e/logo.png`,
  "0xD533a949740bb3306d119CC777fa900bA034cd52a": `${TRUST_WALLET_ICON_BASE}/0xD533a949740bb3306d119CC777fa900bA034cd52a/logo.png`,
  "0xba100000625a3754423978a60c9317c58a5Ee5FF9": `${TRUST_WALLET_ICON_BASE}/0xba100000625a3754423978a60c9317c58a5Ee5FF9/logo.png`,
  "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32": `${TRUST_WALLET_ICON_BASE}/0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32/logo.png`,
  "0x111111111117dC0aa78b770fA6A738034120C302": `${TRUST_WALLET_ICON_BASE}/0x111111111117dC0aa78b770fA6A738034120C302/logo.png`,
  "0x4d224452801ACEd8B2F0aebE155379bb5D594381": `${TRUST_WALLET_ICON_BASE}/0x4d224452801ACEd8B2F0aebE155379bb5D594381/logo.png`,
  "0x3845badAde8e6dFF049820680d1F14bD3903a5d0": `${TRUST_WALLET_ICON_BASE}/0x3845badAde8e6dFF049820680d1F14bD3903a5d0/logo.png`,
  "0x6C8c6b02E7b2BE14d4fA6022Dfd6d75921D90E4E": `${TRUST_WALLET_ICON_BASE}/0x6C8c6b02E7b2BE14d4fA6022Dfd6d75921D90E4E/logo.png`,
  "0xCC8Fa225D80b9c7D42F96e9570156c65D6cAAa25": `${TRUST_WALLET_ICON_BASE}/0xCC8Fa225D80b9c7D42F96e9570156c65D6cAAa25/logo.png`,
  "0x6982508145454Ce325dDbE47a25d4ec3d2311933": `${TRUST_WALLET_ICON_BASE}/0x6982508145454Ce325dDbE47a25d4ec3d2311933/logo.png`,
  "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0": `${TRUST_WALLET_ICON_BASE}/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png`,
  "0x0F5D2fB29fb7d3CFeE444a200298f468908cC942": `${TRUST_WALLET_ICON_BASE}/0x0F5D2fB29fb7d3CFeE444a200298f468908cC942/logo.png`,
  "0x967da4048cD07aB37855c090aAF366e4ce1b9F48": `${TRUST_WALLET_ICON_BASE}/0x967da4048cD07aB37855c090aAF366e4ce1b9F48/logo.png`,
  "0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671": `${TRUST_WALLET_ICON_BASE}/0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671/logo.png`,
};

export const getTokenIcon = (address: string): string => {
  const icon = TOKEN_ICONS[address.toLowerCase()];
  if (icon) return icon;

  if (address === "0x0000000000000000000000000000000000000000" || !address) {
    return "https://assets.coingecko.com/coins/images/279/small/ethereum.png";
  }

  return "";
};

export const NETWORKS = {
  ethereum: {
    chainId: 1,
    name: "Ethereum",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
    blockExplorer: "https://etherscan.io",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
};
