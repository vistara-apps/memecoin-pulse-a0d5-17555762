'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Icon } from './Icon';
import { Button } from './Button';
import { ChartTooltip } from './ChartTooltip';

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h2 className="heading">Trend Analysis</h2>
        <div className="inline-flex p-1 bg-surface rounded-lg shadow-sm">
          {['1h', '24h', '7d'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-base ${
                timeframe === period
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text hover:bg-primary/10'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <h3 className="font-semibold text-text">Google Trends Score</h3>
          <div className="flex flex-wrap items-center gap-4">
            {Object.entries(coinColors).map(([coin, color]) => (
              <div key={coin} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <span className="caption font-medium">{coin}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-64 sm:h-72 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(210, 15%, 45%)"
                fontSize={12}
                tickMargin={8}
              />
              <YAxis 
                stroke="hsl(210, 15%, 45%)"
                fontSize={12}
                tickMargin={8}
              />
              <Tooltip 
                content={<ChartTooltip 
                  labelFormatter={(label) => `Time: ${label}`}
                  valueFormatter={(value) => `${value}`}
                />}
              />
              {selectedCoins.map((coin) => (
                <Line
                  key={coin}
                  type="monotone"
                  dataKey={coin}
                  stroke={coinColors[coin as keyof typeof coinColors]}
                  strokeWidth={2.5}
                  dot={{ fill: coinColors[coin as keyof typeof coinColors], strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  animationDuration={1500}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card shadow-sm card-interactive">
          <div className="flex items-center space-x-3">
            <div className="bg-success/15 p-2 rounded-full">
              <Icon name="trending-up" size="md" className="text-success" />
            </div>
            <div>
              <h4 className="font-semibold text-text">Highest Velocity</h4>
              <p className="caption">
                <span className="font-medium">BONK</span> <span className="text-success font-medium">(+22.1%)</span>
              </p>
            </div>
          </div>
        </div>

        <div className="card shadow-sm card-interactive">
          <div className="flex items-center space-x-3">
            <div className="bg-accent/15 p-2 rounded-full">
              <Icon name="zap" size="md" className="text-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-text">Best Acceleration</h4>
              <p className="caption">
                <span className="font-medium">FLOKI</span> <span className="text-accent font-medium">(+5.4%)</span>
              </p>
            </div>
          </div>
        </div>

        <div className="card shadow-sm card-interactive">
          <div className="flex items-center space-x-3">
            <div className="bg-warning/15 p-2 rounded-full">
              <Icon name="alert" size="md" className="text-warning" />
            </div>
            <div>
              <h4 className="font-semibold text-text">Alert Triggered</h4>
              <p className="caption">
                <span className="font-medium">PEPE</span> <span className="text-primary font-medium">(Score: 95)</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="bg-primary/10 p-2 rounded-full shrink-0">
            <Icon name="bar-chart" size="md" className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-text">Advanced Analytics</h3>
            <p className="caption">
              Get detailed trend analysis, correlation data, and predictive insights
            </p>
          </div>
          <Button variant="primary" size="sm" className="sm:shrink-0">
            Unlock Pro
          </Button>
        </div>
      </div>
    </div>
  );
}
