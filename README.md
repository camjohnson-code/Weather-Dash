# Weather Dashboard

A weather dashboard built with React, TypeScript, and Vite. View current conditions, forecasts, and air quality for Canvas branch locations across Colorado.

## Features

- **Current weather** — Temperature, conditions, and feels-like
- **Daily forecast** — 7-day outlook with high/low temps
- **Hourly forecast** — 24-hour temperature timeline
- **Additional info** — UV index, wind, pressure, sunrise/sunset
- **Air pollution** — AQI and pollutant breakdown in a slide-out panel
- **Interactive map** — Click anywhere or choose from preset locations (Colorado library branches)
- **Map layers** — Toggle between cloud, precipitation, and other tile layers
- **Dark/light theme** — Theme toggle with system-aware styling
- **Responsive layout** — Mobile-friendly with collapsible sidebar

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — Build tool and dev server
- **Tailwind CSS** — Styling
- **shadcn/ui** — UI components (Radix primitives)
- **TanStack Query** — Data fetching and caching
- **Leaflet** + **react-leaflet** — Interactive maps
- **MapTiler** — Map tiles
- **Zod** — API response validation
- **OpenWeatherMap API** — Weather and air pollution data

## Getting Started

### Prerequisites

- Node.js 18+
- [OpenWeatherMap API key](https://openweathermap.org/api)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```
VITE_OPENWEATHER_API_KEY=your_api_key_here
VITE_MAPTILER_API_KEY=your_api_key_here
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── api.ts              # OpenWeatherMap API client
├── App.tsx             # Main app layout and state
├── main.tsx            # Entry point, providers
├── types.ts            # Shared TypeScript types
├── index.css           # Global styles
├── components/         # React components
│   ├── cards/          # Weather cards (Current, Daily, Hourly, AdditionalInfo)
│   ├── dropdowns/      # Location and tile layer selectors
│   ├── skeletons/      # Loading skeletons
│   ├── ui/             # shadcn/ui primitives
│   ├── Map.tsx         # Leaflet map
│   ├── SidePanel.tsx   # Air pollution sidebar
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx
├── data/
│   └── branches.ts     # Location coordinates
└── schemas/            # Zod validation schemas
```
