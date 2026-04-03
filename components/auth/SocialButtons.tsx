import * as AppleAuthentication from 'expo-apple-authentication';
import { useState } from 'react';
import { Alert, Platform, Pressable, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';

export function SocialButtons() {
  const { signInWithGoogle, signInWithFacebook, signInWithApple } = useAuth();
  const colorScheme = useColorScheme() ?? 'light';
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  async function handlePress(provider: string, action: () => Promise<void>) {
    setLoadingProvider(provider);
    try {
      await action();
    } catch (error: any) {
      // User cancelled — no alert needed
      if (!error.message?.includes('cancel')) {
        Alert.alert(`${provider} sign-in failed`, error.message);
      }
    } finally {
      setLoadingProvider(null);
    }
  }

  return (
    <View style={styles.container}>
      {/* Google */}
      <Pressable
        style={[styles.button, { borderColor: Colors[colorScheme].tabIconDefault }]}
        onPress={() => handlePress('Google', signInWithGoogle)}
        disabled={loadingProvider !== null}>
        <Text style={styles.icon}>G</Text>
        <Text style={styles.label}>
          {loadingProvider === 'Google' ? 'Connecting...' : 'Continue with Google'}
        </Text>
      </Pressable>

      {/* Facebook */}
      {/* <Pressable
        style={[styles.button, { borderColor: Colors[colorScheme].tabIconDefault }]}
        onPress={() => handlePress('Facebook', signInWithFacebook)}
        disabled={loadingProvider !== null}>
        <Text style={[styles.icon, styles.facebookIcon]}>f</Text>
        <Text style={styles.label}>
          {loadingProvider === 'Facebook' ? 'Connecting...' : 'Continue with Facebook'}
        </Text>
      </Pressable> */}

      {/* Apple — iOS only, required by App Store guidelines when using other social providers */}
      {Platform.OS === 'ios' && (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={
            colorScheme === 'dark'
              ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
              : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
          }
          cornerRadius={12}
          style={styles.appleButton}
          onPress={() => handlePress('Apple', signInWithApple)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  icon: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 28,
    textAlign: 'center',
  },
  facebookIcon: {
    color: '#1877F2',
  },
  label: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    marginRight: 28, // balance the icon
  },
  appleButton: {
    height: 50,
    borderRadius: 12,
  },
});
