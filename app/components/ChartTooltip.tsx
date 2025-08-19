'use client';

import { TooltipProps } from 'recharts';

interface ChartTooltipProps extends TooltipProps<any, any> {
  labelFormatter?: (label: string) => string;
  valueFormatter?: (value: number) => string;
}

export function ChartTooltip({
  active,
  payload,
  label,
  labelFormatter,
  valueFormatter,
}: ChartTooltipProps) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const formattedLabel = labelFormatter ? labelFormatter(label) : label;
  
  return (
    <div className="bg-surface p-3 rounded-lg shadow-card border border-border">
      <p className="font-medium text-sm mb-2">{formattedLabel}</p>
      <div className="space-y-1.5">
        {payload.map((entry: any, index: number) => {
          const value = valueFormatter ? valueFormatter(entry.value) : entry.value;
          return (
            <div key={`item-${index}`} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs font-medium">{entry.name}:</span>
              <span className="text-xs font-bold">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

