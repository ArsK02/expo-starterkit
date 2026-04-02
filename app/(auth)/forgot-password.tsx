import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();

  async function handleReset() {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email);
      Alert.alert('Email sent', 'Check your inbox for a password reset link.', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.inner}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={[styles.backText, { color: Colors[colorScheme].tint }]}>← Back</Text>
        </Pressable>

        <Text style={styles.title}>Reset password</Text>
        <Text style={styles.subtitle}>
          Enter your email and we'll send you a reset link.
        </Text>

        <TextInput
          style={[
            styles.input,
            { borderColor: Colors[colorScheme].tabIconDefault, color: Colors[colorScheme].text },
          ]}
          placeholder="Email"
          placeholderTextColor={Colors[colorScheme].tabIconDefault}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Pressable
          style={[styles.button, { backgroundColor: Colors[colorScheme].tint }, loading && styles.buttonDisabled]}
          onPress={handleReset}
          disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send reset link'}</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
  },
  backText: {
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    opacity: 0.6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
