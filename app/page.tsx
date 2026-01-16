"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  DEFAULT_TOKENS,
  POPULAR_TOKENS,
  MAINNET_TOKENS,
  TOKEN_CATEGORIES,
  CONTRACT_ABI,
} from "./config";
import {
  Header,
  Sidebar,
  PortfolioBalance,
  HoldingsTable,
  OnboardingScreen,
  TransferModal,
  AddTokenModal,
  TokenBrowser,
  StatusMessages,
  type Token,
} from "./components";
import {
  PortfolioView,
  AnalyticsView,
  TokenSwapView,
  StakingView,
  NFTView,
  MarketView,
  TransactionHistoryView,
  SettingsView,
  SecurityView,
  NetworksView,
  AchievementsView,
  EmptyStateView,
} from "./components/views";
import { useWallet } from "./hooks/useWallet";
import { useTokenPrices } from "./hooks/useTokenPrices";
import { useSavedAddresses } from "./hooks/useSavedAddresses";
import { useGamification } from "./hooks/useGamification";
import { getCurrencySymbol, convertToCurrency } from "./utils/currency";
import { isLocalDevelopment } from "./utils/network";
import {
  calculateTotalBalance,
  calculatePortfolioGraphData,
} from "./utils/portfolio";
import {
  addEthereumToken,
  addERC20Token,
  refreshTokenBalances,
} from "./utils/tokenOperations";
import { getFilteredTokens } from "./utils/tokenFilter";
import { EXCHANGE_RATES } from "./constants";

export default function Dashboard() {
  const [tokens, setTokens] = useState<Token[]>([]);

  const {
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
  } = useWallet();

  const { tokenPrices, initializePriceForToken } = useTokenPrices(tokens);
  const { savedAddresses, setSavedAddresses, saveAddress } =
    useSavedAddresses();
  const {
    points,
    level,
    streak,
    achievements,
    totalTransactions,
    showAchievement,
    setStreak,
    addPoints,
    addAchievement,
    incrementTransaction,
  } = useGamification();

  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0);
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [showAddToken, setShowAddToken] = useState(false);
  const [showTokenBrowser, setShowTokenBrowser] = useState(false);
  const [newTokenAddress, setNewTokenAddress] = useState("");
  const [showTokenSearch, setShowTokenSearch] = useState(false);
  const [tokenSearchQuery, setTokenSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("portfolio");
  const [activeView, setActiveView] = useState("portfolio");
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [currency, setCurrency] = useState<"USD" | "ZAR">("USD");

  const [portfolioGraphData, setPortfolioGraphData] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (tokens.length === 0 || Object.keys(tokenPrices).length === 0) return;
    const newData = calculatePortfolioGraphData(
      tokens,
      tokenPrices,
      portfolioGraphData
    );
    setPortfolioGraphData(newData);
  }, [tokens, tokenPrices]);

  const connectWallet = async () => {
    try {
      const { signer, address } = await connectBrowserWallet();
      const loadedTokens = await loadDefaultTokens(signer, address);
      setTokens(loadedTokens);
      addAchievement("First Connection");
      addPoints(100);
    } catch (err) {}
  };

  const handleConnectLocal = async () => {
    try {
      const { signer, address } = await connectLocalNetwork();
      const loadedTokens = await loadDefaultTokens(signer, address);
      setTokens(loadedTokens);
      addAchievement("First Connection");
      addPoints(100);
    } catch (err) {}
  };

  const addToken = async (addressOrSymbol: string | Token) => {
    try {
      setError("");
      setLoading(true);

      if (!signer) {
        setError("Please connect your wallet first");
        return;
      }

      let newToken: Token;

      if (typeof addressOrSymbol === "object") {
        if (addressOrSymbol.isNative) {
          if (tokens.find((t) => t.isNative)) {
            setError("Ethereum is already in your portfolio");
            return;
          }
          newToken = await addEthereumToken(signer);
          initializePriceForToken(
            "0x0000000000000000000000000000000000000000",
            "ETH"
          );
        } else {
          if (
            tokens.find(
              (t) =>
                t.address.toLowerCase() ===
                addressOrSymbol.address.toLowerCase()
            )
          ) {
            setError("Token is already in your portfolio");
            return;
          }
          newToken = await addERC20Token(addressOrSymbol.address, signer, {
            name: addressOrSymbol.name,
            symbol: addressOrSymbol.symbol,
            decimals: addressOrSymbol.decimals,
            isNative: addressOrSymbol.isNative,
          });
          initializePriceForToken(addressOrSymbol.address, newToken.symbol);
        }
      } else {
        if (addressOrSymbol.toUpperCase() === "ETH") {
          if (tokens.find((t) => t.isNative)) {
            setError("Ethereum is already in your portfolio");
            return;
          }
          newToken = await addEthereumToken(signer);
          initializePriceForToken(
            "0x0000000000000000000000000000000000000000",
            "ETH"
          );
        } else {
          if (!ethers.isAddress(addressOrSymbol)) {
            setError("Invalid Ethereum address");
            return;
          }

          if (
            tokens.find(
              (t) => t.address.toLowerCase() === addressOrSymbol.toLowerCase()
            )
          ) {
            setError("Token is already in your portfolio");
            return;
          }

          newToken = await addERC20Token(addressOrSymbol, signer);
          initializePriceForToken(addressOrSymbol, newToken.symbol);
        }
      }

      setTokens((prev) => [...prev, newToken]);
      setSuccess(
        `Added ${newToken.name} (${newToken.symbol}) to your portfolio`
      );

      addPoints(25);

      if (tokens.length === 0) {
        addAchievement("Token Collector");
      }
      if (tokens.length === 4) {
        addAchievement("Portfolio Builder");
      }
      if (tokens.length === 9) {
        addAchievement("Diversified Portfolio");
      }
    } catch (err: any) {
      setError(err.message || "Failed to add token");
    } finally {
      setLoading(false);
      setShowAddToken(false);
      setShowTokenBrowser(false);
      setNewTokenAddress("");
    }
  };

  const refreshBalances = async () => {
    if (!signer) {
      setError("Please connect your wallet first");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const updatedTokens = await refreshTokenBalances(tokens, signer);
      setTokens(updatedTokens);
      setSuccess("Balances refreshed successfully");
      addPoints(5);
    } catch (err: any) {
      setError(err.message || "Failed to refresh balances");
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async () => {
    if (!signer || !transferTo || !transferAmount || tokens.length === 0) {
      setError("Please fill in all fields");
      return;
    }

    if (!ethers.isAddress(transferTo)) {
      setError("Invalid recipient address");
      return;
    }

    const selectedToken = tokens[selectedTokenIndex];
    if (!selectedToken) {
      setError("Please select a token");
      return;
    }

    try {
      setError("");
      setSuccess("");
      setLoading(true);

      let tx;
      if (selectedToken.isNative) {
        const amount = ethers.parseEther(transferAmount);
        tx = await signer.sendTransaction({
          to: transferTo,
          value: amount,
        });
        console.log(`Transaction hash: ${tx.hash}`);
      } else {
        const contract = new ethers.Contract(
          selectedToken.address,
          CONTRACT_ABI,
          signer
        );
        const amount = ethers.parseUnits(
          transferAmount,
          selectedToken.decimals
        );
        const currentBalance = ethers.parseUnits(
          selectedToken.balance || "0",
          selectedToken.decimals
        );

        if (amount > currentBalance) {
          setError(
            `Insufficient ${selectedToken.symbol} balance. You have ${selectedToken.balance} ${selectedToken.symbol} but trying to send ${transferAmount} ${selectedToken.symbol}.`
          );
          return;
        }

        console.log(
          `Sending ${transferAmount} ${
            selectedToken.symbol
          } (${amount.toString()} units) to ${transferTo}`
        );
        console.log(
          `Current balance: ${selectedToken.balance} ${selectedToken.symbol}`
        );
        tx = await contract.transfer(transferTo, amount);
        console.log(`Transaction hash: ${tx.hash}`);
      }

      setSuccess(`Transaction sent! Hash: ${tx.hash}`);

      console.log(`Waiting for transaction confirmation...`);
      await tx.wait();
      console.log(`Transaction confirmed!`);
      setSuccess(
        `${selectedToken.symbol} transfer successful! Hash: ${tx.hash}`
      );

      incrementTransaction();
      addPoints(50);
      setStreak((prev) => prev + 1);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      await refreshBalances();
      setTransferTo("");
      setTransferAmount("");
      setShowTransferModal(false);
    } catch (err: any) {
      setError(err.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  const getFilteredTokens = () => {
    const allTokens = [
      ...POPULAR_TOKENS,
      ...MAINNET_TOKENS.filter(
        (token) => !POPULAR_TOKENS.find((t) => t.address === token.address)
      ),
    ];

    let tokensToFilter = allTokens;

    if (selectedCategory !== "all" && selectedCategory in TOKEN_CATEGORIES) {
      const category =
        TOKEN_CATEGORIES[selectedCategory as keyof typeof TOKEN_CATEGORIES];
      if (Array.isArray(category)) {
        tokensToFilter = allTokens.filter((token) => {
          return category.some(
            (catToken) =>
              catToken.symbol === token.symbol ||
              catToken.address.toLowerCase() === token.address.toLowerCase()
          );
        });
      }
    }

    const query = tokenSearchQuery.toLowerCase().trim();
    if (!query) return tokensToFilter.slice(0, 20);

    return tokensToFilter
      .filter(
        (token) =>
          token.name.toLowerCase().includes(query) ||
          token.symbol.toLowerCase().includes(query) ||
          token.address.toLowerCase().includes(query)
      )
      .slice(0, 20);
  };

  useEffect(() => {
    if (mounted && isLocalDevelopment()) {
      handleConnectLocal();
    }
  }, [mounted]);

  const totalBalance = calculateTotalBalance(tokens, tokenPrices);

  const previousBalance =
    portfolioGraphData[portfolioGraphData.length - 2] || totalBalance;
  const balanceChange = totalBalance - previousBalance;
  const balanceChangePercent =
    previousBalance > 0 ? (balanceChange / previousBalance) * 100 : 0;

  const convertedBalance = convertToCurrency(totalBalance, currency);
  const convertedBalanceChange = convertToCurrency(balanceChange, currency);

  const getCurrencySymbolHelper = () => getCurrencySymbol(currency);

  const renderView = () => {
    if (!account) {
      return (
        <OnboardingScreen
          mounted={mounted}
          isLocalDevelopment={isLocalDevelopment()}
          onConnectWallet={connectWallet}
        />
      );
    }

    switch (activeView) {
      case "portfolio":
        return (
          <PortfolioView
            tokens={tokens}
            tokenPrices={tokenPrices}
            totalBalance={totalBalance}
            currency={currency}
            exchangeRate={EXCHANGE_RATES.USD_TO_ZAR}
            portfolioGraphData={portfolioGraphData}
            convertedBalance={totalBalance}
            convertedBalanceChange={balanceChange}
            balanceChangePercent={balanceChangePercent}
            balanceChange={balanceChange}
            getCurrencySymbol={getCurrencySymbolHelper}
            onSendClick={(index) => {
              setSelectedTokenIndex(index);
              setShowTransferModal(true);
            }}
            onAddToken={() => setShowTokenBrowser(true)}
          />
        );
      case "analytics":
        return <AnalyticsView />;
      case "tokens":
        return (
          <PortfolioView
            tokens={tokens}
            tokenPrices={tokenPrices}
            totalBalance={totalBalance}
            currency={currency}
            exchangeRate={EXCHANGE_RATES.USD_TO_ZAR}
            portfolioGraphData={portfolioGraphData}
            convertedBalance={convertedBalance}
            convertedBalanceChange={convertedBalanceChange}
            balanceChangePercent={balanceChangePercent}
            balanceChange={balanceChange}
            getCurrencySymbol={getCurrencySymbolHelper}
            onSendClick={(index) => {
              setSelectedTokenIndex(index);
              setShowTransferModal(true);
            }}
            onAddToken={() => setShowTokenBrowser(true)}
          />
        );
      case "watchlist":
        return (
          <EmptyStateView
            title="Token Watchlist"
            description="Add tokens to your watchlist to track their prices without adding them to your portfolio."
          />
        );
      case "swap":
        return <TokenSwapView />;
      case "staking":
        return <StakingView />;
      case "lending":
        return (
          <EmptyStateView
            title="Lending & Borrowing"
            description="Lend your assets to earn interest or borrow against your collateral."
          />
        );
      case "liquidity":
        return (
          <EmptyStateView
            title="Liquidity Pools"
            description="Provide liquidity to DEX pools and earn trading fees."
          />
        );
      case "nfts":
        return <NFTView />;
      case "nft-marketplace":
        return (
          <EmptyStateView
            title="NFT Marketplace"
            description="Browse, buy, and sell NFTs from various collections."
          />
        );
      case "market":
        return <MarketView />;
      case "trending":
        return (
          <EmptyStateView
            title="Trending Tokens"
            description="Discover trending tokens and market movers."
          />
        );
      case "news":
        return (
          <EmptyStateView
            title="Crypto News"
            description="Stay updated with the latest cryptocurrency news and market insights."
          />
        );
      case "history":
        return <TransactionHistoryView />;
      case "alerts":
        return (
          <EmptyStateView
            title="Price Alerts"
            description="Set up alerts for token prices and portfolio value changes."
          />
        );
      case "achievements":
        return (
          <AchievementsView
            points={points}
            level={level}
            achievements={achievements}
            streak={streak}
            totalTransactions={totalTransactions}
          />
        );
      case "settings":
        return <SettingsView />;
      case "security":
        return <SecurityView />;
      case "networks":
        return <NetworksView />;
      default:
        return (
          <PortfolioView
            tokens={tokens}
            tokenPrices={tokenPrices}
            totalBalance={totalBalance}
            currency={currency}
            exchangeRate={EXCHANGE_RATES.USD_TO_ZAR}
            portfolioGraphData={portfolioGraphData}
            convertedBalance={totalBalance}
            convertedBalanceChange={balanceChange}
            balanceChangePercent={balanceChangePercent}
            balanceChange={balanceChange}
            getCurrencySymbol={getCurrencySymbolHelper}
            onSendClick={(index) => {
              setSelectedTokenIndex(index);
              setShowTransferModal(true);
            }}
            onAddToken={() => setShowTokenBrowser(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        account={account}
        activeView={activeView}
        setActiveView={setActiveView}
        onConnectWallet={connectWallet}
        onAddToken={() => setShowTokenBrowser(true)}
        points={points}
        level={level}
      />

      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-40 lg:hidden p-2 bg-slate-800 border border-slate-700 rounded-lg text-white hover:bg-slate-700 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      <div className="flex-1 flex flex-col">
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currency={currency}
          setCurrency={setCurrency}
          account={account}
        />

        <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-900">
          {renderView()}

          <TransferModal
            show={showTransferModal}
            tokens={tokens}
            selectedTokenIndex={selectedTokenIndex}
            transferTo={transferTo}
            transferAmount={transferAmount}
            loading={loading}
            savedAddresses={savedAddresses}
            onClose={() => {
              setShowTransferModal(false);
              setTransferTo("");
              setTransferAmount("");
            }}
            onTransfer={handleTransfer}
            onTokenSelect={setSelectedTokenIndex}
            onRecipientChange={setTransferTo}
            onAmountChange={setTransferAmount}
            onSaveAddress={saveAddress}
          />

          {showTokenBrowser && (
            <TokenBrowser
              onSelectToken={(token) => addToken(token)}
              onClose={() => setShowTokenBrowser(false)}
              existingTokens={tokens}
            />
          )}

          <AddTokenModal
            show={showAddToken}
            loading={loading}
            newTokenAddress={newTokenAddress}
            onClose={() => {
              setShowAddToken(false);
              setNewTokenAddress("");
            }}
            onAddToken={() => addToken(newTokenAddress)}
            onAddressChange={setNewTokenAddress}
          />

          <StatusMessages
            error={error}
            success={success}
            onCloseError={() => setError("")}
            onCloseSuccess={() => setSuccess("")}
          />
        </main>
      </div>
    </div>
  );
}
