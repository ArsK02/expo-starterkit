import { Link } from 'expo-router';
import { Alert, Pressable, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';

export default function ProfileScreen() {
  const { user, signOut, deleteAccount } = useAuth();
  const colorScheme = useColorScheme() ?? 'light';

  async function handleSignOut() {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign out',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
          } catch (error: any) {
            Alert.alert('Error', error.message);
          }
        },
      },
    ]);
  }

  async function handleDeleteAccount() {
    Alert.alert(
      'Delete account',
      'This will permanently delete your account and all associated data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAccount();
            } catch (error: any) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.avatar, { backgroundColor: Colors[colorScheme].tint }]}>
        <Text style={styles.avatarText}>
          {user?.email?.[0]?.toUpperCase() ?? '?'}
        </Text>
      </View>

      <Text style={styles.email}>{user?.email ?? 'Unknown'}</Text>
      <Text style={styles.userId}>ID: {user?.id?.slice(0, 8)}...</Text>

      <Pressable
        style={[styles.signOutButton, { borderColor: Colors[colorScheme].tint }]}
        onPress={handleSignOut}>
        <Text style={[styles.signOutText, { color: Colors[colorScheme].tint }]}>Sign out</Text>
      </Pressable>

      <Link href="/privacy-policy" asChild>
        <Pressable style={styles.linkButton}>
          <Text style={[styles.linkText, { color: Colors[colorScheme].tabIconDefault }]}>
            Privacy Policy
          </Text>
        </Pressable>
      </Link>

      <Pressable style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteText}>Delete account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  userId: {
    fontSize: 13,
    opacity: 0.4,
    marginBottom: 40,
  },
  signOutButton: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  signOutText: {
    fontWeight: '600',
    fontSize: 16,
  },
  linkButton: {
    marginTop: 32,
    paddingVertical: 8,
  },
  linkText: {
    fontSize: 14,
  },
  deleteButton: {
    marginTop: 8,
    paddingVertical: 8,
  },
  deleteText: {
    fontSize: 14,
    color: '#ef4444',
  },
});
