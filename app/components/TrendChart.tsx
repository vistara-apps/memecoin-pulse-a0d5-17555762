'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Icon } from './Icon';
import { Button } from './Button';

const mockChartData = [
  { time: '00:00', PEPE: 65, DOGE: 45, SHIB: 35 },
  { time: '04:00', PEPE: 72, DOGE: 48, SHIB: 38 },
  { time: '08:00', PEPE: 78, DOGE: 52, SHIB: 42 },
  { time: '12:00', PEPE: 85, DOGE: 58, SHIB: 45 },
  { time: '16:00', PEPE: 92, DOGE: 62, SHIB: 48 },
  { time: '20:00', PEPE: 95, DOGE: 65, SHIB: 52 },
];

export function TrendChart() {
  const [selectedCoins, setSelectedCoins] = useState(['PEPE', 'DOGE', 'SHIB']);
  const [timeframe, setTimeframe] = useState('24h');

  const coinColors = {
    PEPE: '#3b82f6',
    DOGE: '#10b981',
    SHIB: '#f59e0b',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="heading">Trend Analysis</h2>
        <div className="flex space-x-2">
          {['1h', '24h', '7d'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 text-sm rounded-md transition-colors duration-base ${
                timeframe === period
                  ? 'bg-primary text-white'
                  : 'bg-surface text-text hover:bg-primary/10'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-text">Google Trends Score</h3>
          <div className="flex items-center space-x-4">
            {Object.entries(coinColors).map(([coin, color]) => (
              <div key={coin} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="caption text-muted">{coin}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="time" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(200, 25%, 95%)',
                  border: '1px solid hsl(210, 70%, 50%, 0.2)',
                  borderRadius: '8px',
                }}
              />
              {selectedCoins.map((coin) => (
                <Line
                  key={coin}
                  type="monotone"
                  dataKey={coin}
                  stroke={coinColors[coin as keyof typeof coinColors]}
                  strokeWidth={2}
                  dot={{ fill: coinColors[coin as keyof typeof coinColors], strokeWidth: 2, r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center space-x-3">
            <Icon name="trending-up" size="md" className="text-success" />
            <div>
              <h4 className="font-semibold text-text">Highest Velocity</h4>
              <p className="caption text-muted">BONK (+22.1%)</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <Icon name="zap" size="md" className="text-accent" />
            <div>
              <h4 className="font-semibold text-text">Best Acceleration</h4>
              <p className="caption text-muted">FLOKI (+5.4%)</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <Icon name="alert" size="md" className="text-warning" />
            <div>
              <h4 className="font-semibold text-text">Alert Triggered</h4>
              <p className="caption text-muted">PEPE (Score: 95)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <div className="flex items-center space-x-3">
          <Icon name="bar-chart" size="md" className="text-primary" />
          <div className="flex-1">
            <h3 className="font-semibold text-text">Advanced Analytics</h3>
            <p className="caption text-muted">
              Get detailed trend analysis, correlation data, and predictive insights
            </p>
          </div>
          <Button variant="primary" size="sm">
            Unlock Pro
          </Button>
        </div>
      </div>
    </div>
  );
}
