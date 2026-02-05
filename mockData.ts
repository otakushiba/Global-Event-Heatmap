
import { GlobalEvent, EventCategory } from './types';

export const MOCK_EVENTS: GlobalEvent[] = [
  {
    id: '1',
    title: 'Major Tech Breakthrough in Silicon Valley',
    category: EventCategory.TECH,
    heatLevel: 85,
    lat: 37.7749,
    lng: -122.4194,
    summary: 'A revolutionary AI hardware architecture was unveiled today, promising 10x energy efficiency for data centers.',
    metrics: { newsVolume: 12400, redditVolume: 45000, xVolume: 89000, googleTrend: 92 },
    timeline: [
      { time: '08:00 AM', description: 'Rumors start circulating on developer forums.' },
      { time: '10:30 AM', description: 'Official press release sent to major outlets.' },
      { time: '02:00 PM', description: 'Live demonstration concludes with high praise.' }
    ],
    locations: ['San Jose', 'San Francisco'],
    organizations: ['Nvidia', 'OpenAI', 'TSMC'],
    impact: 'High: Likely to shift semiconductor market dynamics for the next 5 years.'
  },
  {
    id: '2',
    title: 'Flash Flood Emergency in Tokyo',
    category: EventCategory.DISASTER,
    heatLevel: 94,
    lat: 35.6762,
    lng: 139.6503,
    summary: 'Unprecedented rainfall has led to severe flooding in central districts. Emergency services are on high alert.',
    metrics: { newsVolume: 25000, redditVolume: 12000, xVolume: 156000, googleTrend: 88 },
    timeline: [
      { time: '02:00 AM', description: 'JMA issues red warning for heavy rain.' },
      { time: '04:15 AM', description: 'River banks breached in Shinjuku area.' },
      { time: '07:00 AM', description: 'Subway systems suspended indefinitely.' }
    ],
    locations: ['Tokyo', 'Chiba'],
    organizations: ['JMA', 'Tokyo Metropolitan Government'],
    impact: 'Critical: Infrastructure damage and widespread travel disruption.'
  },
  {
    id: '3',
    title: 'Stock Market Volatility in London',
    category: EventCategory.FINANCE,
    heatLevel: 62,
    lat: 51.5074,
    lng: -0.1278,
    summary: 'The FTSE 100 experienced sudden drops following unexpected inflation data from the Eurozone.',
    metrics: { newsVolume: 8900, redditVolume: 4000, xVolume: 12000, googleTrend: 45 },
    timeline: [
      { time: '09:00 AM', description: 'Market opens with a 1.2% gap down.' },
      { time: '11:30 AM', description: 'Banking sector sees sharpest decline in months.' }
    ],
    locations: ['London', 'Frankfurt'],
    organizations: ['Bank of England', 'European Central Bank'],
    impact: 'Medium: Concerns over persistent interest rate hikes resurface.'
  },
  {
    id: '4',
    title: 'Political Summit in Brussels',
    category: EventCategory.POLITICS,
    heatLevel: 75,
    lat: 50.8503,
    lng: 4.3517,
    summary: 'EU leaders meet to discuss new energy security frameworks and defense integration.',
    metrics: { newsVolume: 15000, redditVolume: 2500, xVolume: 45000, googleTrend: 30 },
    timeline: [
      { time: 'Monday', description: 'Agenda leaked to press regarding defense spend.' },
      { time: 'Tuesday', description: 'Arrival of heads of state.' }
    ],
    locations: ['Brussels', 'Paris', 'Berlin'],
    organizations: ['European Union', 'NATO'],
    impact: 'Moderate: Significant policy shifts expected by end of week.'
  }
];
