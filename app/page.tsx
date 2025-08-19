'use client';

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from '@coinbase/onchainkit/minikit';
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from '@coinbase/onchainkit/identity';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import { useEffect, useState, useCallback } from 'react';
import { TrendingList } from './components/TrendingList';
import { AlertsPanel } from './components/AlertsPanel';
import { TrendChart } from './components/TrendChart';
import { Button } from './components/Button';
import { Icon } from './components/Icon';

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('trending');

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const saveFrameButton = () => {
    if (context && !context.client.added) {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddFrame}
          className="text-primary p-2"
        >
          <Icon name="plus" size="sm" />
          Save
        </Button>
      );
    }

    if (frameAdded) {
      return (
        <div className="flex items-center space-x-1 text-sm font-medium text-success animate-fade-in">
          <Icon name="check" size="sm" />
          <span>Saved</span>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg text-text">
      <div className="container">
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-sm">
              <Icon name="trending-up" size="md" className="text-white" />
            </div>
            <div>
              <h1 className="display text-primary">Memecoin Pulse</h1>
              <p className="caption">Spot pumps before they happen</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Wallet>
              <ConnectWallet>
                <Name className="text-inherit" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
            {saveFrameButton()}
          </div>
        </header>

        <nav className="flex space-x-1 mb-6 bg-surface rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('trending')}
            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-base ${
              activeTab === 'trending'
                ? 'bg-primary text-white shadow-sm'
                : 'text-text hover:bg-primary/10'
            }`}
            aria-selected={activeTab === 'trending'}
            role="tab"
          >
            <Icon name="trending-up" size="sm" className="inline mr-2" />
            <span className="hidden xs:inline">Trending</span>
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-base ${
              activeTab === 'alerts'
                ? 'bg-primary text-white shadow-sm'
                : 'text-text hover:bg-primary/10'
            }`}
            aria-selected={activeTab === 'alerts'}
            role="tab"
          >
            <Icon name="bell" size="sm" className="inline mr-2" />
            <span className="hidden xs:inline">Alerts</span>
          </button>
          <button
            onClick={() => setActiveTab('charts')}
            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-base ${
              activeTab === 'charts'
                ? 'bg-primary text-white shadow-sm'
                : 'text-text hover:bg-primary/10'
            }`}
            aria-selected={activeTab === 'charts'}
            role="tab"
          >
            <Icon name="bar-chart" size="sm" className="inline mr-2" />
            <span className="hidden xs:inline">Charts</span>
          </button>
        </nav>

        <main className="flex-1 min-h-[60vh]">
          <div className={`transition-opacity duration-base ${activeTab === 'trending' ? 'opacity-100' : 'opacity-0 hidden'}`}>
            {activeTab === 'trending' && <TrendingList />}
          </div>
          <div className={`transition-opacity duration-base ${activeTab === 'alerts' ? 'opacity-100' : 'opacity-0 hidden'}`}>
            {activeTab === 'alerts' && <AlertsPanel />}
          </div>
          <div className={`transition-opacity duration-base ${activeTab === 'charts' ? 'opacity-100' : 'opacity-0 hidden'}`}>
            {activeTab === 'charts' && <TrendChart />}
          </div>
        </main>

        <footer className="mt-8 pt-4 flex justify-center border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="text-text-secondary text-xs hover:text-primary"
            onClick={() => openUrl('https://base.org/builders/minikit')}
          >
            Built on Base with MiniKit
          </Button>
        </footer>
      </div>
    </div>
  );
}
