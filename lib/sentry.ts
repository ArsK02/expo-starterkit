import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  // Disable in development to avoid noise
  enabled: !__DEV__,
  // Capture 100% of transactions in production; lower this if volume is high
  tracesSampleRate: 1.0,
});

export { Sentry };
