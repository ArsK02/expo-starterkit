import * as AppleAuthentication from 'expo-apple-authentication';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { posthog } from '@/lib/posthog';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth.store';

WebBrowser.maybeCompleteAuthSession();

export function useAuth() {
  const { session, user, isLoading } = useAuthStore();

  async function signInWithEmail(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    posthog.capture('user_signed_in', { provider: 'email' });
  }

  async function signUpWithEmail(email: string, password: string) {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    posthog.capture('user_signed_up', { provider: 'email' });
  }

  async function resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  }

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { skipBrowserRedirect: true },
    });
    if (error) throw error;
    if (data.url) {
      const result = await WebBrowser.openAuthSessionAsync(data.url);
      if (result.type === 'success' && result.url) {
        const url = new URL(result.url);
        const params = new URLSearchParams(url.hash.substring(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        if (accessToken && refreshToken) {
          await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
          posthog.capture('user_signed_in', { provider: 'google' });
        }
      }
    }
  }

  async function signInWithFacebook() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: { skipBrowserRedirect: true },
    });
    if (error) throw error;
    if (data.url) {
      const result = await WebBrowser.openAuthSessionAsync(data.url);
      if (result.type === 'success' && result.url) {
        const url = new URL(result.url);
        const params = new URLSearchParams(url.hash.substring(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        if (accessToken && refreshToken) {
          await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
          posthog.capture('user_signed_in', { provider: 'facebook' });
        }
      }
    }
  }

  async function signInWithApple() {
    if (Platform.OS !== 'ios') return;
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    if (credential.identityToken) {
      const { error } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken,
      });
      if (error) throw error;
      posthog.capture('user_signed_in', { provider: 'apple' });
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    posthog.capture('user_signed_out');
  }

  async function deleteAccount() {
    const { error } = await supabase.rpc('delete_user');
    if (error) throw error;
    posthog.capture('user_deleted_account');
    await supabase.auth.signOut();
  }

  return {
    session,
    user,
    isLoading,
    signInWithEmail,
    signUpWithEmail,
    resetPassword,
    signInWithGoogle,
    signInWithFacebook,
    signInWithApple,
    signOut,
    deleteAccount,
  };
}
