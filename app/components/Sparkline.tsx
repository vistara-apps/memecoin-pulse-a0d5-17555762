
"use client";

import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineProps {
  data: number[];
  variant?: 'positive' | 'negative';
  className?: string;
}

export function Sparkline({ data, variant = 'positive', className }: SparklineProps) {
  const chartData = data.map((value, index) => ({ value, index }));
  
  return (
    <div className={`h-8 w-16 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={variant === 'positive' ? 'hsl(140 60% 45%)' : 'hsl(30 70% 50%)'}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
