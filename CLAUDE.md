# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server (port 3000)
npm run build     # Production build
npm run preview   # Preview production build
```

## Architecture

This is a React + TypeScript + Vite application that visualizes global events on an interactive world map.

### Core Components

- **App.tsx** - Root component managing global state (filters, map mode, selected event, search)
- **WorldMap.tsx** - D3.js-powered interactive map with zoom/pan, renders event markers from GeoJSON
- **FilterPanel.tsx** - Left sidebar for filtering by category, heat source, time range, and region
- **DetailPanel.tsx** - Right panel showing full event details when an event is selected
- **Header.tsx** - Top bar with search and filter toggle
- **ModeSwitcher.tsx** - Bottom bar for switching between Heat/Category/Risk display modes

### Data Flow

State lives in App.tsx and flows down to children. Events are filtered by search term in App, then further filtered by category in WorldMap. The `GlobalEvent` type (in types.ts) defines the event data structure including location coordinates, heat metrics, and timeline.

### Key Files

- **types.ts** - TypeScript enums and interfaces (`EventCategory`, `MapMode`, `FilterState`, `GlobalEvent`)
- **constants.tsx** - Category colors and UI color palette
- **mockData.ts** - Sample event data for development

### Styling

Uses Tailwind CSS via CDN (loaded in index.html). Custom scrollbar and pulse animation styles are defined inline in index.html. Dark theme uses GitHub-style colors (#0D1117 background, #30363D borders).

### Path Alias

`@` resolves to project root (configured in vite.config.ts).

### Environment Variables

Set `GEMINI_API_KEY` in `.env.local` if integrating with Gemini API.
