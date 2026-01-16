import { ethers } from "ethers";
import { Token } from "../components/types";
import { CONTRACT_ABI } from "../config";

export const refreshTokenBalances = async (
  tokens: Token[],
  signer: ethers.Signer
): Promise<Token[]> => {
  const address = await signer.getAddress();
  const updatedTokens = await Promise.all(
    tokens.map(async (token) => {
      if (token.isNative) {
        const provider = signer.provider;
        if (!provider) return token;
        const balance = await provider.getBalance(address);
        const balanceInEth = ethers.formatEther(balance);
        return {
          ...token,
          balance: parseFloat(balanceInEth).toFixed(4),
        };
      } else {
        try {
          const contract = new ethers.Contract(
            token.address,
            CONTRACT_ABI,
            signer
          );
          const balance = await contract.balanceOf(address);
          const formattedBalance = ethers.formatUnits(balance, token.decimals);
          return {
            ...token,
            balance: parseFloat(formattedBalance).toFixed(4),
          };
        } catch (err) {
          return token;
        }
      }
    })
  );
  return updatedTokens;
};

export const addEthereumToken = async (
  signer: ethers.Signer
): Promise<Token> => {
  const provider = signer.provider;
  if (!provider) throw new Error("Provider not available");
  const address = await signer.getAddress();
  const balance = await provider.getBalance(address);
  const balanceInEth = ethers.formatEther(balance);

  return {
    address: "0x0000000000000000000000000000000000000000",
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    balance: parseFloat(balanceInEth).toFixed(4),
    isNative: true,
  };
};

export const addERC20Token = async (
  addressOrSymbol: string,
  signer: ethers.Signer,
  tokenData?: Partial<Token>
): Promise<Token> => {
  if (tokenData && tokenData.name && tokenData.symbol && tokenData.decimals) {
    try {
      const contract = new ethers.Contract(
        addressOrSymbol,
        CONTRACT_ABI,
        signer
      );
      const address = await signer.getAddress();
      const balance = await contract.balanceOf(address);
      const formattedBalance = ethers.formatUnits(balance, tokenData.decimals);

      return {
        address: addressOrSymbol,
        name: tokenData.name,
        symbol: tokenData.symbol,
        decimals: tokenData.decimals,
        balance: parseFloat(formattedBalance).toFixed(4),
        isNative: tokenData.isNative || false,
      };
    } catch (err: any) {
      console.warn(`Could not fetch balance for ${addressOrSymbol}:`, err.message);
      return {
        address: addressOrSymbol,
        name: tokenData.name,
        symbol: tokenData.symbol,
        decimals: tokenData.decimals,
        balance: "0.0000",
        isNative: tokenData.isNative || false,
      };
    }
  }

  try {
    const contract = new ethers.Contract(
      addressOrSymbol,
      CONTRACT_ABI,
      signer
    );
    const [name, symbol, decimals] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.decimals(),
    ]);

    const address = await signer.getAddress();
    const balance = await contract.balanceOf(address);
    const formattedBalance = ethers.formatUnits(balance, decimals);

    return {
      address: addressOrSymbol,
      name,
      symbol,
      decimals: Number(decimals),
      balance: parseFloat(formattedBalance).toFixed(4),
    };
  } catch (err: any) {
    throw new Error(
      `Failed to load token: ${err.message}. Make sure the address is a valid ERC-20 token contract.`
    );
  }
};
