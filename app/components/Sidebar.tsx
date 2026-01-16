"use client";

import React from "react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  account: string;
  activeView: string;
  setActiveView: (view: string) => void;
  onConnectWallet: () => void;
  onAddToken: () => void;
  points?: number;
  level?: number;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number | string;
}

const NavIcon = ({ children }: { children: React.ReactNode }) => (
  <span className="w-4 h-4 flex-shrink-0">{children}</span>
);

export const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  account,
  activeView,
  setActiveView,
  onConnectWallet,
  onAddToken,
  points = 0,
  level = 1,
}) => {
  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    setSidebarOpen(false);
  };

  const dashboardItems: NavItem[] = [
    {
      id: "portfolio",
      label: "Portfolio",
      icon: (
        <NavIcon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </NavIcon>
      ),
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: (
        <NavIcon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </NavIcon>
      ),
    },
  ];

  const tokenItems: NavItem[] = [
    {
      id: "tokens",
      label: "My Tokens",
      icon: (
        <NavIcon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </NavIcon>
      ),
    },
    {
      id: "watchlist",
      label: "Watchlist",
      icon: (
        <NavIcon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </NavIcon>
      ),
    },
    {
      id: "swap",
      label: "Swap",
      icon: (
        <NavIcon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </NavIcon>
      ),
    },
  ];

  const defiItems: NavItem[] = [
    {
      id: "staking",
      label: "Staking",
      icon: (
        <NavIcon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </NavIcon>
      ),
    },
    {
      id: "lending",
      label: "Lending",
      icon: (
        <NavIcon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </NavIcon>
      ),
    },
    {
      id: "liquidity",
      label: "Liquidity Pools",
      icon: (
        <NavIcon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </NavIcon>
      ),
    },
  ];

  const nftItems: NavItem[] = [
    {
      id: "nfts",
      label: "My NFTs",
      icon: (
        <NavIcon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </NavIcon>
      ),
    },
    {
      id: "nft-marketplace",
      label: "Marketplace",
      icon: (
        <NavIcon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </NavIcon>
      ),
    },
  ];

  const marketItems: NavItem[] = [
    {
      id: "market",
      label: "Market Overview",
      icon: (
        <NavIcon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </NavIcon>
      ),
    },
    {
      id: "trending",
      label: "Trending",
      icon: (
        <NavIcon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </NavIcon>
      ),
    },
    {
      id: "news",
      label: "News",
      icon: (
        <NavIcon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        </NavIcon>
      ),
    },
  ];

  const utilityItems: NavItem[] = [
    {
      id: "history",
      label: "Transaction History",
      icon: (
        <NavIcon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </NavIcon>
      ),
    },
    {
      id: "alerts",
      label: "Alerts",
      icon: (
        <NavIcon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </NavIcon>
      ),
    },
    {
      id: "achievements",
      label: "Achievements",
      icon: (
        <NavIcon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        </NavIcon>
      ),
      badge: level,
    },
  ];

  const settingsItems: NavItem[] = [
    {
      id: "settings",
      label: "Settings",
      icon: (
        <NavIcon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </NavIcon>
      ),
    },
    {
      id: "security",
      label: "Security",
      icon: (
        <NavIcon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </NavIcon>
      ),
    },
    {
      id: "networks",
      label: "Networks",
      icon: (
        <NavIcon>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
        </NavIcon>
      ),
    },
  ];

  const renderNavSection = (
    title: string,
    items: NavItem[],
    collapsible: boolean = false
  ) => (
    <div className="mb-3">
      <p className="sticky top-0 bg-slate-800/95 backdrop-blur-sm text-[10px] font-normal text-slate-500 uppercase tracking-wider mb-1.5 px-3 py-1 z-10">
        {title}
      </p>
      <div className="space-y-0.5">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`w-full flex items-center justify-between space-x-2 px-2.5 py-1.5 rounded transition-all text-left group ${
              activeView === item.id
                ? "bg-slate-700/50 text-white"
                : "text-slate-300 hover:bg-slate-700/30 hover:text-white"
            }`}
          >
            <div className="flex items-center space-x-2.5 flex-1 min-w-0">
              <span className="flex-shrink-0 w-4 h-4">{item.icon}</span>
              <span className="text-xs font-normal truncate">{item.label}</span>
            </div>
            {item.badge && (
              <span className="flex-shrink-0 bg-orange-500 text-white text-[10px] font-normal px-1.5 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-800/95 backdrop-blur-sm border-r border-slate-700/50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-2.5 border-b border-slate-700/50 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-yellow-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">N</span>
                </div>
                <span className="text-base font-bold text-white">Nolu</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-slate-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {account && (
              <div className="mt-2 px-2 py-1.5 bg-slate-700/50 rounded text-xs">
                <p className="text-[10px] text-slate-400 mb-0.5">Wallet</p>
                <p className="text-[10px] text-white font-mono truncate">
                  {account.slice(0, 6)}...{account.slice(-4)}
                </p>
              </div>
            )}
            {points > 0 && (
              <div className="mt-1.5 px-2 py-1 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-300">L{level}</span>
                  <span className="text-[10px] text-orange-400 font-normal">
                    {points.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          <nav className="flex-1 p-2 overflow-y-auto">
            {renderNavSection("Dashboard", dashboardItems)}
            {renderNavSection("Tokens", tokenItems)}
            {renderNavSection("DeFi", defiItems)}
            {renderNavSection("NFTs", nftItems)}
            {renderNavSection("Market", marketItems)}
            {renderNavSection("Utilities", utilityItems)}
            {renderNavSection("Settings", settingsItems)}
          </nav>

          <div className="p-2.5 border-t border-slate-700/50 flex-shrink-0">
            {!account ? (
              <button
                onClick={onConnectWallet}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 px-3 rounded font-normal hover:from-orange-600 hover:to-yellow-600 transition-all text-xs"
              >
                Connect Portfolio
              </button>
            ) : (
              <button
                onClick={onAddToken}
                className="w-full bg-slate-700/50 text-white py-2 px-3 rounded font-normal hover:bg-slate-700 transition-all text-xs flex items-center justify-center space-x-1.5"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Add Token</span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};
