# Analytics & Crash Reporting

This project uses **PostHog** for product analytics and **Sentry** for crash/error reporting.

Both are disabled in development (`__DEV__ === true`) so test activity doesn't pollute your production data.

---

## PostHog Setup

### 1. Create a project

1. Go to [posthog.com](https://posthog.com) and sign up
2. Create a new project
3. Go to **Settings → Project** and copy:
   - **Project API Key** (starts with `phc_`)
   - **API Host** (e.g. `https://us.i.posthog.com` or `https://eu.i.posthog.com`)

### 2. Add to your env file

In `.env.local`:
```
EXPO_PUBLIC_POSTHOG_API_KEY=phc_your_key_here
EXPO_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

That's it — no changes to `app.json` needed for PostHog.

### Events tracked out of the box

| Event | Trigger |
|---|---|
| `user_signed_in` | Successful sign-in (any provider), includes `{ provider: 'email' \| 'google' \| 'apple' \| 'facebook' }` |
| `user_signed_up` | Successful email registration |
| `user_signed_out` | Sign out |
| `user_deleted_account` | Account deletion |

Users are automatically identified (via `posthog.identify()`) when a session starts and reset on sign-out.

---

## Sentry Setup

### 1. Create a project

1. Go to [sentry.io](https://sentry.io) and sign up
2. Create a new project — choose **React Native**
3. From the project settings, copy your **DSN** (looks like `https://xxx@oxx.ingest.sentry.io/xxx`)
4. Note your **Organization slug** and **Project slug** (visible in the URL: `sentry.io/organizations/<org>/projects/<project>/`)

### 2. Add DSN to your env file

In `.env.local`:
```
EXPO_PUBLIC_SENTRY_DSN=https://xxx@oxx.ingest.sentry.io/xxx
```

### 3. Update app.json

Replace the placeholder values in `app.json`:
```json
["@sentry/react-native", { "organization": "YOUR_ORG_SLUG", "project": "YOUR_PROJECT_SLUG" }]
```

These are used by the Sentry build plugin to upload source maps so crash stack traces show your original TypeScript code instead of minified output.

### What Sentry captures

- All unhandled JS errors and promise rejections
- Native crashes (iOS/Android)
- The authenticated user's ID and email are attached to every error automatically (set via `Sentry.setUser()` on sign-in, cleared on sign-out)
