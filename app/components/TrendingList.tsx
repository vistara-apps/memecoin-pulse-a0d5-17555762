'use client';

import { useState, useEffect } from 'react';
import { Icon } from './Icon';
import { Button } from './Button';

interface MemecoinTrend {
  id: string;
  coinName: string;
  googleTrendsScore: number;
  rank: number;
  velocity: number;
  acceleration: number;
  timestamp: string;
}

export function TrendingList() {
  const [trends, setTrends] = useState<MemecoinTrend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demonstration
    const mockTrends: MemecoinTrend[] = [
      {
        id: '1',
        coinName: 'PEPE',
        googleTrendsScore: 95,
        rank: 1,
        velocity: 12.5,
        acceleration: 3.2,
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        coinName: 'DOGE',
        googleTrendsScore: 87,
        rank: 2,
        velocity: 8.3,
        acceleration: -1.1,
        timestamp: new Date().toISOString(),
      },
      {
        id: '3',
        coinName: 'SHIB',
        googleTrendsScore: 76,
        rank: 3,
        velocity: 5.7,
        acceleration: 2.8,
        timestamp: new Date().toISOString(),
      },
      {
        id: '4',
        coinName: 'FLOKI',
        googleTrendsScore: 64,
        rank: 4,
        velocity: 15.2,
        acceleration: 5.4,
        timestamp: new Date().toISOString(),
      },
      {
        id: '5',
        coinName: 'BONK',
        googleTrendsScore: 58,
        rank: 5,
        velocity: 22.1,
        acceleration: 8.7,
        timestamp: new Date().toISOString(),
      },
    ];

    setTimeout(() => {
      setTrends(mockTrends);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-40 h-7 bg-primary/10 rounded-md animate-pulse"></div>
          <div className="w-24 h-9 bg-primary/10 rounded-md animate-pulse"></div>
        </div>
        
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="list-item animate-pulse overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer" 
                   style={{ backgroundSize: '200% 100%' }}></div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary/20 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="w-20 h-5 bg-primary/20 rounded-md"></div>
                    <div className="flex space-x-3">
                      <div className="w-16 h-3 bg-primary/15 rounded"></div>
                      <div className="w-20 h-3 bg-primary/15 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="space-y-2 text-right">
                    <div className="w-10 h-5 bg-primary/20 rounded ml-auto"></div>
                    <div className="w-14 h-3 bg-primary/15 rounded ml-auto"></div>
                  </div>
                  <div className="w-8 h-8 bg-primary/10 rounded-md"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="heading">Trending Memecoins</h2>
        <div className="flex items-center space-x-2">
          <Button variant="secondary" size="sm">
            <Icon name="settings" size="sm" className="mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {trends.map((trend, index) => (
          <div
            key={trend.id}
            className={`list-item ${index < 3 ? 'card-featured' : ''} ${index === 0 ? 'ring-1 ring-primary/30' : ''} animate-slide-up card-interactive`}
            style={{ animationDelay: `${index * 75}ms` }}
          >
            <div className="flex items-center space-x-4">
              <div className={`flex items-center justify-center w-8 h-8 ${index < 3 ? 'bg-primary' : 'bg-primary/70'} text-white rounded-full text-sm font-bold shadow-sm`}>
                {trend.rank}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-text">{trend.coinName}</h3>
                  <span className={`badge ${trend.acceleration > 0 ? 'badge-success' : 'badge-warning'}`}>
                    {trend.acceleration > 0 ? (
                      <Icon name="arrow-up" size="sm" className="mr-1" />
                    ) : (
                      <Icon name="arrow-down" size="sm" className="mr-1" />
                    )}
                    {Math.abs(trend.acceleration).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="caption">
                    Score: <span className="font-medium">{trend.googleTrendsScore}</span>
                  </span>
                  <span className={`caption ${trend.velocity > 0 ? 'text-success' : 'text-warning'}`}>
                    Velocity: <span className="font-medium">{trend.velocity > 0 ? '+' : ''}{trend.velocity}%</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-lg font-bold text-primary">
                  {trend.googleTrendsScore}
                </div>
                <div className={`caption font-medium ${trend.acceleration > 0 ? 'text-success' : 'text-warning'}`}>
                  {trend.acceleration > 0 ? '+' : ''}{trend.acceleration}%
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                <Icon name="eye" size="sm" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center space-x-3">
            <div className="bg-accent/10 p-2 rounded-full">
              <Icon name="zap" size="md" className="text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-text">Premium Alerts</h3>
              <p className="caption">Get notified of trend spikes before they go viral</p>
            </div>
          </div>
          <Button variant="primary" size="sm" className="sm:ml-auto">
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  );
}
