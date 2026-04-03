# Project Structure

## Folder layout

```
app/
  _layout.tsx              Root layout — font loading, auth guard, navigation theme
  (auth)/
    _layout.tsx            Auth stack (no tab bar)
    login.tsx              Login screen
    register.tsx           Registration screen
    forgot-password.tsx    Password reset screen
  (tabs)/
    _layout.tsx            Bottom tab navigation (Home, Explore, Profile)
    index.tsx              Home tab
    explore.tsx            Explore tab
    profile.tsx            Profile tab — shows user info, sign out, delete account
  modal.tsx                Example modal screen
  +not-found.tsx           404 fallback

components/
  auth/
    SocialButtons.tsx      Google, Apple (iOS only), Facebook sign-in buttons
  Themed.tsx               Text and View wrappers that respect light/dark theme
  ExternalLink.tsx         Opens URLs in-app browser on native, standard link on web
  StyledText.tsx           MonoText component (SpaceMono font)
  useColorScheme.ts        Native color scheme hook
  useColorScheme.web.ts    Web override (prevents SSR mismatch)
  useClientOnlyValue.ts    Hydration helper for web

constants/
  Colors.ts                Light/dark color palette

docs/                      Setup guides (this folder)

hooks/
  useAuth.ts               All auth actions: email, Google, Apple, Facebook, signOut, deleteAccount

lib/
  supabase.ts              Supabase client with expo-secure-store token adapter

store/
  auth.store.ts            Zustand store: session, user, isLoading
```

## Auth flow

```
App launch
  ↓
Root _layout.tsx
  → calls supabase.auth.getSession()
  → subscribes to onAuthStateChange
  → stores session in Zustand (auth.store.ts)
  ↓
Auth guard (useEffect in _layout.tsx)
  → no session  →  redirect to /(auth)/login
  → has session →  redirect to /(tabs)
```

Session is persisted to device storage via `expo-secure-store`, so users stay logged in across app restarts.

## How to add a new tab

1. Create `app/(tabs)/your-tab.tsx`
2. Add a `<Tabs.Screen>` entry in `app/(tabs)/_layout.tsx`:

```tsx
<Tabs.Screen
  name="your-tab"
  options={{
    title: 'Your Tab',
    tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
  }}
/>
```

Icon names come from `@expo/vector-icons/FontAwesome`. Browse them at [icons.expo.fyi](https://icons.expo.fyi).

## How to add a new auth provider

1. Enable the provider in **Supabase → Authentication → Providers**
2. Add a sign-in function in `hooks/useAuth.ts` following the same pattern as `signInWithGoogle`
3. Add a button in `components/auth/SocialButtons.tsx`

## Environment variables

All variables must be prefixed with `EXPO_PUBLIC_` to be available in the app bundle.

| Variable | Where to find it |
|---|---|
| `EXPO_PUBLIC_SUPABASE_URL` | Supabase → Settings → General → Project URL |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API Keys → Publishable key |

Add them to `.env.local` (gitignored). Never commit real keys.
