# Architecture Document: Nepal Health Sewa

## 1. Overview
Nepal Health Sewa is built with React 19, TypeScript, Vite, Tailwind CSS v4, React Router 7, Redux Toolkit, and RTK Query with `fetchBaseQuery`.

```
src/
├── app/
│   ├── App.tsx             # Root application with React Router and Toast provider
│   └── routes.tsx          # Client-side router configuration with lazy loading
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Top bar contract (Brand wordmark, Nav links, Emergency CTA)
│   │   ├── Footer.tsx      # Clean footer with quick links, contacts, copyright
│   │   └── MobileNav.tsx   # Responsive mobile drawer
│   └── ui/
│       ├── Button.tsx      # Primary, secondary, outline, destructive variants
│       ├── Badge.tsx       # Unboxed or discreet status tags
│       ├── Card.tsx        # Single-elevation surface cards
│       ├── Modal.tsx       # Accessible dialogs
│       └── EmptyState.tsx  # Polished empty result states
├── features/
│   ├── home/               # Homepage hero, blood counter, quick tools, featured drives
│   ├── blood-bank/         # Donor directory, search filters, registration workflow
│   ├── emergency/          # 24/7 Emergency dispatch form, helpline hotline directory
│   ├── health-tools/       # BMI, Blood Pressure, Meal Planner, Sleep Tracker, Exercise
│   ├── campaigns/          # Blood donation camps and detail views
│   ├── services/           # Service catalog (Blood, Oxygen, Ambulance, Tele-consult)
│   ├── diseases/           # Medical educational directory and detail pages
│   ├── team/               # Core team & volunteer network
│   ├── gallery/            # Community photos & event archives
│   ├── covid/              # COVID-19 health guidelines & prevention tips
│   └── contact/            # Contact form and Birgunj location card
├── services/
│   ├── api.ts              # RTK Query root API slice with fetchBaseQuery
│   └── healthApi.ts        # Typed endpoints (donors, campaigns, services, emergency)
├── store/
│   ├── index.ts            # Redux Toolkit store config
│   ├── hooks.ts            # Typed useAppDispatch and useAppSelector
│   └── slices/
│       ├── uiSlice.ts      # Global UI state (mobile drawer, active filters)
│       └── toolsSlice.ts   # Client persistence for sleep tracker and tool history
├── types/
│   └── index.ts            # TypeScript interfaces for all domain entities
└── data/
    └── mockData.ts         # High-fidelity authentic data for Nepal healthcare entities
```

## 2. State Management Strategy
- **RTK Query**: Manages server state, caching, query invalidation, optimistic updates, and mock responses simulating backend APIs via custom base query adapter.
- **Redux Slices**: Handles client-specific state (persisted health tool logs, emergency wizard states, filter preferences).
- **Component State**: Ephemeral UI toggles (dropdown open/close, form draft fields before submission).

## 3. Medical Safety & Disclaimer Architecture
Every medical tool and educational page embeds standard disclaimers clarifying that algorithmic calculations are for educational and preliminary awareness purposes only, not clinical diagnoses, and directs emergency cases to Nepal emergency numbers (102 for Ambulance, 100 for Police, Red Cross Blood Bank Birgunj).
