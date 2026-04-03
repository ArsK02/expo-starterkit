# Expo Starter Kit

A production-ready React Native starter with authentication, state management, and tab navigation — built on Expo SDK 54.

## Stack

- **Expo** SDK 54 + Expo Router v6 (file-based routing)
- **Supabase** — auth (email/password, Google, Apple, Facebook) + database
- **Zustand** — client state management
- **TypeScript** — strict mode

## Features

- Email/password sign up & sign in
- Google, Apple (iOS), and Facebook OAuth
- Forgot password flow
- Auth guard (auto-redirect based on session)
- 3-tab bottom navigation (Home, Explore, Profile)
- Light/dark theme support
- Secure token storage via `expo-secure-store`

## Quick Start

**Prerequisites:** Node.js 18+, Expo CLI, a [Supabase](https://supabase.com) account.

```bash
# 1. Clone and install
git clone <your-repo-url>
cd expo-starterkit
npm install

# 2. Add your Supabase credentials
cp .env.local .env.local   # already exists — just fill in the values
# → see docs/01-supabase-setup.md

# 3. Run
npx expo start
```

## Setup Guides

| Guide | Description |
|---|---|
| [Supabase Setup](docs/01-supabase-setup.md) | Create project, configure keys, enable delete account |
| [Auth Providers](docs/02-auth-providers.md) | Google, Apple, and Facebook OAuth setup |
| [Project Structure](docs/03-project-structure.md) | Folder layout, auth flow, how to extend |
