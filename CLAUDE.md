# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start the dev server
npx expo start

# Platform-specific
npx expo start --ios
npx expo start --android
npx expo start --web

# Run tests
npx jest

# Run a single test file
npx jest components/__tests__/StyledText-test.js
```

No lint or build scripts are defined in package.json beyond the expo start commands.

## Architecture

### Routing
This project uses **Expo Router v6** (file-based routing). The `app/` directory maps directly to routes:
- `app/_layout.tsx` — root layout; loads fonts, sets up ThemeProvider, controls splash screen
- `app/(tabs)/` — tab group with bottom tab navigation; `_layout.tsx` configures the tab bar
- `app/modal.tsx` — a modal screen navigated to via a header button in the tabs layout
- `app/+not-found.tsx` — 404 fallback
- `app/+html.tsx` — web-only HTML root for static rendering

Typed routes are enabled (`experiments.typedRoutes: true` in app.json), so route strings are type-checked.

### Theming
- `constants/Colors.ts` — single source of truth for the light/dark color palette
- `components/Themed.tsx` — `Text` and `View` wrappers that resolve colors via `useThemeColor()`, which reads from props or falls back to `Colors`
- `useColorScheme` hook has a platform split: `.ts` (native) re-exports from `react-native`, `.web.ts` provides a web override
- React Navigation's `ThemeProvider` wraps the root layout, keeping nav chrome in sync with the app theme

### Cross-platform patterns
- Platform-specific files follow the `.ts` / `.web.ts` convention (no `.native.ts` files)
- `useClientOnlyValue` is a hydration helper that returns different values on server vs. client — used in the tabs layout to avoid SSR mismatches on web
- `ExternalLink` opens URLs in-app via `expo-web-browser` on native; uses standard link behavior on web

### Path aliases
`@/*` resolves to the repo root (configured in `tsconfig.json`), so imports like `@/constants/Colors` work anywhere.
