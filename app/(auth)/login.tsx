import { Link } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';

import { SocialButtons } from '@/components/auth/SocialButtons';
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithEmail } = useAuth();
  const colorScheme = useColorScheme() ?? 'light';

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmail(email, password);
    } catch (error: any) {
      Alert.alert('Login failed', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.inner}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>

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
        <TextInput
          style={[
            styles.input,
            { borderColor: Colors[colorScheme].tabIconDefault, color: Colors[colorScheme].text },
          ]}
          placeholder="Password"
          placeholderTextColor={Colors[colorScheme].tabIconDefault}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Link href="/(auth)/forgot-password" asChild>
          <Pressable>
            <Text style={[styles.forgotPassword, { color: Colors[colorScheme].tint }]}>
              Forgot password?
            </Text>
          </Pressable>
        </Link>

        <Pressable
          style={[styles.button, { backgroundColor: Colors[colorScheme].tint }, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign in'}</Text>
        </Pressable>

        <View style={styles.divider}>
          <View style={[styles.dividerLine, { backgroundColor: Colors[colorScheme].tabIconDefault }]} />
          <Text style={[styles.dividerText, { color: Colors[colorScheme].tabIconDefault }]}>or</Text>
          <View style={[styles.dividerLine, { backgroundColor: Colors[colorScheme].tabIconDefault }]} />
        </View>

        <SocialButtons />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Link href="/(auth)/register" asChild>
            <Pressable>
              <Text style={[styles.footerLink, { color: Colors[colorScheme].tint }]}>Sign up</Text>
            </Pressable>
          </Link>
        </View>
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
    marginBottom: 12,
  },
  forgotPassword: {
    textAlign: 'right',
    marginBottom: 20,
    fontSize: 14,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { marginHorizontal: 12, fontSize: 14 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: { fontSize: 14 },
  footerLink: { fontSize: 14, fontWeight: '600' },
});
