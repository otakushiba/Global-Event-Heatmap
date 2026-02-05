
export enum EventCategory {
  POLITICS = 'Politics',
  DISASTER = 'Disaster',
  TECH = 'Tech',
  FINANCE = 'Finance',
  CRIME = 'Crime'
}

export enum HeatSource {
  NEWS = 'News',
  SOCIAL = 'Social',
  COMBINED = 'Combined'
}

export enum MapMode {
  HEAT = 'Heat Mode',
  CATEGORY = 'Category Mode',
  RISK = 'Risk Mode'
}

export interface HeatMetrics {
  newsVolume: number;
  redditVolume: number;
  xVolume: number;
  googleTrend: number;
}

export interface TimelineEvent {
  time: string;
  description: string;
}

export interface GlobalEvent {
  id: string;
  title: string;
  category: EventCategory;
  heatLevel: number; // 0-100
  summary: string;
  lat: number;
  lng: number;
  metrics: HeatMetrics;
  timeline: TimelineEvent[];
  locations: string[];
  organizations: string[];
  impact: string;
}

export interface FilterState {
  categories: EventCategory[];
  source: HeatSource;
  timeRange: '24h' | '7d' | '30d';
  region: 'global' | 'north-america' | 'europe' | 'asia' | 'africa' | 'oceania' | 'south-america';
}
