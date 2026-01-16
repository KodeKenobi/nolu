import { useState } from "react";
import { ethers } from "ethers";
import { DEFAULT_TOKENS, CONTRACT_ABI } from "../config";
import { Token } from "../components/types";
import { NETWORK_CONFIG } from "../constants";

export const useWallet = () => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(
    null
  );
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const connectLocalNetwork = async () => {
    try {
      setError("");
      const provider = new ethers.JsonRpcProvider(NETWORK_CONFIG.LOCALHOST_URL);
      const defaultPrivateKey =
        process.env.NEXT_PUBLIC_DEFAULT_PRIVATE_KEY ||
        NETWORK_CONFIG.DEFAULT_PRIVATE_KEY;
      const signer = new ethers.Wallet(defaultPrivateKey, provider);
      const address = await signer.getAddress();

      setProvider(provider as any);
      setSigner(signer as any);
      setAccount(address);

      return { signer, address };
    } catch (err: any) {
      setError(err.message || "Failed to connect to local network");
      throw err;
    }
  };

  const connectBrowserWallet = async () => {
    try {
      setError("");
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum!);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        setProvider(provider);
        setSigner(signer);
        setAccount(address);

        return { signer, address };
      } else {
        setError(
          "No Web3 wallet detected. Please install MetaMask, Trust Wallet, or another Web3 wallet to continue."
        );
        throw new Error("No wallet detected");
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet");
      throw err;
    }
  };

  const loadDefaultTokens = async (
    signer: ethers.Signer,
    userAddress: string
  ): Promise<Token[]> => {
    try {
      setLoading(true);
      const tokenPromises = DEFAULT_TOKENS.map(async (tokenConfig) => {
        if ((tokenConfig as any).isNative) {
          const provider = signer.provider;
          if (!provider) return null;
          const balance = await provider.getBalance(userAddress);
          const balanceInEth = ethers.formatEther(balance);
          return {
            ...tokenConfig,
            balance: parseFloat(balanceInEth).toFixed(4),
          };
        } else {
          try {
            const contract = new ethers.Contract(
              tokenConfig.address,
              CONTRACT_ABI,
              signer
            );
            const balance = await contract.balanceOf(userAddress);
            const decimals = await contract.decimals();
            const formattedBalance = ethers.formatUnits(balance, decimals);
            return {
              ...tokenConfig,
              balance: parseFloat(formattedBalance).toFixed(4),
            };
          } catch (err) {
            console.error(`Error loading token ${tokenConfig.symbol}:`, err);
            return {
              ...tokenConfig,
              balance: "0",
            };
          }
        }
      });

      const loadedTokens = (await Promise.all(tokenPromises)).filter(
        (token) => token !== null
      ) as Token[];
      return loadedTokens;
    } catch (err: any) {
      setError(err.message || "Failed to load tokens");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    provider,
    signer,
    account,
    loading,
    error,
    success,
    setError,
    setSuccess,
    setLoading,
    connectLocalNetwork,
    connectBrowserWallet,
    loadDefaultTokens,
  };
};
