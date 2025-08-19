
"use client";

import { useState, useEffect } from 'react';
import { MemecoinTrend, UserAlert, TrendingData } from '../types';

// Mock data generator for development
const generateMockTrends = (): MemecoinTrend[] => {
  const memecoins = [
    'PEPE', 'DOGE', 'SHIB', 'FLOKI', 'BONK', 'WIF', 'POPCAT', 'BRETT', 'MOG', 'NEIRO',
    'TURBO', 'MEME', 'LADYS', 'SIMPSON', 'KISHU', 'AKITA', 'HOKK', 'ELON', 'DOGELON', 'BABYDOGE'
  ];
  
  return memecoins.map((name, index) => ({
    coinName: name,
    googleTrendsScore: Math.floor(Math.random() * 100) + 1,
    rank: index + 1,
    timestamp: new Date().toISOString(),
    velocity: (Math.random() - 0.5) * 20,
    acceleration: (Math.random() - 0.5) * 5,
    symbol: name,
    marketCap: Math.floor(Math.random() * 1000000000),
    priceChange24h: (Math.random() - 0.5) * 50,
  })).sort((a, b) => b.googleTrendsScore - a.googleTrendsScore)
    .map((trend, index) => ({ ...trend, rank: index + 1 }));
};

export function useMemecoinData() {
  const [trends, setTrends] = useState<MemecoinTrend[]>([]);
  const [alerts, setAlerts] = useState<UserAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTrends = generateMockTrends();
      setTrends(mockTrends);
      setLastUpdated(new Date().toISOString());
      
      // Load saved alerts from localStorage
      const savedAlerts = localStorage.getItem('memecoin-alerts');
      if (savedAlerts) {
        setAlerts(JSON.parse(savedAlerts));
      }
      
      setLoading(false);
    };

    loadData();
  }, []);

  // Auto-refresh data every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      const newTrends = generateMockTrends();
      setTrends(newTrends);
      setLastUpdated(new Date().toISOString());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Save alerts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('memecoin-alerts', JSON.stringify(alerts));
  }, [alerts]);

  const addAlert = (coinName: string, threshold: number = 75) => {
    const newAlert: UserAlert = {
      userId: 'user-1', // In real app, get from auth
      coinId: coinName.toLowerCase(),
      alertThreshold: threshold,
      isActive: true,
      coinName,
    };

    setAlerts(prev => {
      const existingIndex = prev.findIndex(alert => alert.coinId === newAlert.coinId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], isActive: true };
        return updated;
      }
      return [...prev, newAlert];
    });
  };

  const removeAlert = (coinId: string) => {
    setAlerts(prev => prev.filter(alert => alert.coinId !== coinId));
  };

  const toggleAlert = (coinId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.coinId === coinId 
        ? { ...alert, isActive: !alert.isActive }
        : alert
    ));
  };

  const updateAlertThreshold = (coinId: string, threshold: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.coinId === coinId 
        ? { ...alert, alertThreshold: threshold }
        : alert
    ));
  };

  const refreshData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const newTrends = generateMockTrends();
    setTrends(newTrends);
    setLastUpdated(new Date().toISOString());
    setLoading(false);
  };

  return {
    trends,
    alerts,
    loading,
    lastUpdated,
    addAlert,
    removeAlert,
    toggleAlert,
    updateAlertThreshold,
    refreshData,
  };
}
