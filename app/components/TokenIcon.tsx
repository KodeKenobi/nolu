"use client";

import React, { useState } from "react";
import { getTokenIcon } from "../config";
import { Token } from "./types";

interface TokenIconProps {
  token: Token;
  size?: number;
  className?: string;
}

const POPULAR_TOKEN_ICONS: Record<string, string> = {
  ETH: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  WETH: "https://assets.coingecko.com/coins/images/2518/small/weth.png",
  USDC: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  USDT: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
  DAI: "https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png",
  WBTC: "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png",
  UNI: "https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png",
  LINK: "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
  AAVE: "https://assets.coingecko.com/coins/images/12645/small/AAVE.png",
  MATIC: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
  CRV: "https://assets.coingecko.com/coins/images/12124/small/curve.png",
  MKR: "https://assets.coingecko.com/coins/images/1364/small/Mark_Maker.png",
  SNX: "https://assets.coingecko.com/coins/images/3406/small/SNX.png",
  COMP: "https://assets.coingecko.com/coins/images/10775/small/COMP.png",
  YFI: "https://assets.coingecko.com/coins/images/11849/small/yfi-192x192.png",
};

export const TokenIcon: React.FC<TokenIconProps> = ({
  token,
  size = 40,
  className = "",
}) => {
  const [imgError, setImgError] = useState(false);
  
  let iconUrl = getTokenIcon(token.address);
  
  if (!iconUrl && POPULAR_TOKEN_ICONS[token.symbol.toUpperCase()]) {
    iconUrl = POPULAR_TOKEN_ICONS[token.symbol.toUpperCase()];
  }
  
  if (!iconUrl && token.isNative) {
    iconUrl = POPULAR_TOKEN_ICONS.ETH;
  }
  
  if (!iconUrl && !token.isNative) {
    iconUrl = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${token.address}/logo.png`;
  }

  if (iconUrl && !imgError) {
    return (
      <img
        src={iconUrl}
        alt={token.symbol}
        className={`${className} rounded-full`}
        style={{ width: size, height: size, objectFit: "cover" }}
        onError={() => setImgError(true)}
      />
    );
  }
  
  return (
    <div
      className={`${className} bg-gradient-to-br from-orange-500/20 to-blue-500/20 border border-slate-700 rounded-full flex items-center justify-center text-white font-bold`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {token.isNative ? "⟠" : token.symbol.charAt(0).toUpperCase()}
    </div>
  );
};
