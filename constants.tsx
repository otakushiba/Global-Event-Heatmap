
import { EventCategory } from './types';

export const CATEGORY_COLORS: Record<EventCategory, string> = {
  [EventCategory.POLITICS]: '#A855F7', // Purple-500
  [EventCategory.DISASTER]: '#EF4444', // Red-500
  [EventCategory.TECH]: '#06B6D4',     // Cyan-500
  [EventCategory.FINANCE]: '#22C55E',  // Green-500
  [EventCategory.CRIME]: '#F59E0B',    // Amber-500
};

export const UI_COLORS = {
  bg: '#0D1117',
  card: '#161B22',
  border: '#30363D',
  textMuted: '#8B949E',
  textMain: '#E6EDF3',
  accent: '#58A6FF',
};
