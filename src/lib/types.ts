export type Trend = "up" | "down" | "flat";

export interface Category {
  id: string;
  label: string;
  emoji: string;
}

export interface MarketOption {
  name: string;
  initial: string;
  color: string;
  pct: number;
  trend: Trend;
}

export interface BinaryMarket {
  id: string;
  cat: string;
  catLabel: string;
  emoji: string;
  title: string;
  type: "binary";
  prob: number;
  trend: Trend;
  delta: string;
  vol: string;
  end: string;
  featured?: boolean;
}

export interface MultiMarket {
  id: string;
  cat: string;
  catLabel: string;
  emoji: string;
  title: string;
  type: "multi";
  vol: string;
  end: string;
  options: MarketOption[];
  featured?: boolean;
}

export type Market = BinaryMarket | MultiMarket;

export interface ChartSeries {
  name: string;
  color: string;
  pts: number[];
}

export interface MarketDetail {
  series: ChartSeries[];
  description: string;
  rules: string[];
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  balance_cents: number;
}
