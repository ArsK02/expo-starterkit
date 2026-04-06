import { ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.updated}>Last updated: April 2026</Text>

      <Text style={styles.section}>1. Information We Collect</Text>
      <Text style={styles.body}>
        We collect information you provide directly to us when you create an account, such as your
        email address. We may also collect usage data such as how you interact with the app to
        improve our services.
      </Text>

      <Text style={styles.section}>2. How We Use Your Information</Text>
      <Text style={styles.body}>
        We use the information we collect to operate and improve the app, send you transactional
        emails (such as account confirmation and password reset), and respond to your requests.
      </Text>

      <Text style={styles.section}>3. Data Storage</Text>
      <Text style={styles.body}>
        Your account data is stored securely using Supabase. Authentication tokens are stored
        locally on your device using encrypted storage and are never shared with third parties.
      </Text>

      <Text style={styles.section}>4. Analytics</Text>
      <Text style={styles.body}>
        We use PostHog to collect anonymized usage analytics to understand how the app is used.
        We use Sentry to track errors and crashes. These services may collect device and usage
        information in accordance with their own privacy policies.
      </Text>

      <Text style={styles.section}>5. Data Sharing</Text>
      <Text style={styles.body}>
        We do not sell your personal data. We do not share your information with third parties
        except as necessary to provide the service (e.g. authentication providers you choose to
        sign in with).
      </Text>

      <Text style={styles.section}>6. Account Deletion</Text>
      <Text style={styles.body}>
        You can permanently delete your account at any time from the Profile screen. This will
        remove all your data from our systems.
      </Text>

      <Text style={styles.section}>7. Contact</Text>
      <Text style={styles.body}>
        If you have any questions about this Privacy Policy, please contact us at
        privacy@yourapp.com.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 48,
  },
  updated: {
    fontSize: 13,
    opacity: 0.4,
    marginBottom: 24,
  },
  section: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 8,
  },
  body: {
    fontSize: 15,
    lineHeight: 24,
    opacity: 0.8,
  },
});
