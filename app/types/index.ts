
export interface MemecoinTrend {
  coinName: string;
  googleTrendsScore: number;
  rank: number;
  timestamp: string;
  velocity: number;
  acceleration: number;
  symbol?: string;
  marketCap?: number;
  priceChange24h?: number;
}

export interface UserAlert {
  userId: string;
  coinId: string;
  alertThreshold: number;
  isActive: boolean;
  coinName: string;
}

export interface TrendingData {
  trends: MemecoinTrend[];
  lastUpdated: string;
}
