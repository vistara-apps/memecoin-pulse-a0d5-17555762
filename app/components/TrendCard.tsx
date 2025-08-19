
"use client";

import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { MemecoinTrend } from '../types';
import { Sparkline } from './Sparkline';

interface TrendCardProps {
  trend: MemecoinTrend;
  variant?: 'default' | 'featured';
  onAlertToggle?: (coinName: string) => void;
  isAlertActive?: boolean;
}

export function TrendCard({ 
  trend, 
  variant = 'default', 
  onAlertToggle, 
  isAlertActive = false 
}: TrendCardProps) {
  const isPositiveVelocity = trend.velocity > 0;
  const cardClass = variant === 'featured' ? 'card-featured' : 'card';
  
  // Generate mock sparkline data based on velocity and acceleration
  const sparklineData = Array.from({ length: 7 }, (_, i) => {
    const base = trend.googleTrendsScore;
    const variation = (trend.velocity * i) + (trend.acceleration * i * i * 0.1);
    return Math.max(0, base + variation + (Math.random() - 0.5) * 10);
  });

  return (
    <div className={`${cardClass} animate-fade-in hover:shadow-modal transition-shadow duration-base cursor-pointer`}>
      <div className="flex items-center justify-between mb-md">
        <div className="flex items-center gap-sm">
          <span className="text-heading">{trend.coinName}</span>
          {variant === 'featured' && (
            <span className="bg-accent text-white px-sm py-xs rounded-sm text-caption font-medium">
              HOT
            </span>
          )}
        </div>
        <div className="flex items-center gap-sm">
          <Sparkline 
            data={sparklineData} 
            variant={isPositiveVelocity ? 'positive' : 'negative'} 
          />
          {onAlertToggle && (
            <button
              onClick={() => onAlertToggle(trend.coinName)}
              className={`p-xs rounded-sm transition-colors duration-fast ${
                isAlertActive 
                  ? 'bg-accent text-white' 
                  : 'bg-surface border border-border hover:bg-border/50'
              }`}
            >
              <AlertCircle size={16} />
            </button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-md mb-md">
        <div>
          <p className="text-caption text-text-muted">Trends Score</p>
          <p className="text-heading font-bold">{trend.googleTrendsScore}</p>
        </div>
        <div>
          <p className="text-caption text-text-muted">Rank</p>
          <p className="text-heading font-bold">#{trend.rank}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-xs">
          {isPositiveVelocity ? (
            <TrendingUp size={16} className="trend-positive" />
          ) : (
            <TrendingDown size={16} className="trend-negative" />
          )}
          <span className={`text-caption font-medium ${
            isPositiveVelocity ? 'trend-positive' : 'trend-negative'
          }`}>
            {isPositiveVelocity ? '+' : ''}{trend.velocity.toFixed(1)}% velocity
          </span>
        </div>
        <span className="text-caption text-text-muted">
          {new Date(trend.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}
