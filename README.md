# 🏏 CricXP — Fantasy Cricket League

A full-featured fantasy cricket league platform built with React + Vite.

## Features

- 🔐 **Register & Login** — with localStorage persistence
- 👥 **Build Your XI** — pick 11 players from a pool of 24 internationals, filter by role
- ⚔️ **Play Matches** — live animated match simulation with scorecard
- 🏆 **Leaderboard** — global rankings updated in real-time
- 🎁 **Redeem Points** — 10 real-brand coupons with generated coupon codes
- 📊 **Dashboard** — stats, match history, upcoming fixtures

## Points System

| Result | Points |
|--------|--------|
| Win    | +300   |
| Loss   | +50    |
| Signup bonus | 800 |

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repo
4. Framework: **Vite** (auto-detected)
5. Click **Deploy** — done!

## Deploy to Netlify

1. Push this folder to a GitHub repo
2. Go to [netlify.com](https://netlify.com) → Add new site
3. Connect your repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click **Deploy** — done!

> The `netlify.toml` and `vercel.json` files handle SPA routing automatically.

## Tech Stack

- ⚡ **Vite** — build tool
- ⚛️ **React 18** — UI
- 🛣️ **React Router v6** — routing
- 🐻 **Zustand** — state management with localStorage persistence
- 🎞️ **Framer Motion** — animations
- 🍞 **React Hot Toast** — notifications
- 🎨 **CSS Modules** — scoped styles

## Project Structure

```
src/
├── pages/
│   ├── AuthPage.jsx       # Login / Register
│   ├── Dashboard.jsx      # Stats overview
│   ├── TeamBuilder.jsx    # Pick 11 players
│   ├── Matches.jsx        # Play & simulate matches
│   ├── Leaderboard.jsx    # Rankings
│   └── Shop.jsx           # Redeem points for coupons
├── components/
│   └── Layout.jsx         # Sidebar + page shell
├── store/
│   └── useStore.js        # Zustand global state
├── data.js                # Players, matches, coupons
└── main.jsx               # Entry point
```

## Adding a Real Backend Later

The store (`src/store/useStore.js`) is the single source of truth. To add a real backend:
1. Replace `login()` with an API call to your auth endpoint
2. Replace `addMatchResult()` / `redeemCoupon()` with API calls
3. Remove the `persist` middleware from Zustand once the server handles persistence
