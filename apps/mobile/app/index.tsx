import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useOAuth, useAuth } from '@clerk/clerk-expo';

export default function Home() {
  const router = useRouter();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { isSignedIn, setActive } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      router.replace('/screens/DashboardScreen/DashboardScreen');
    }
  }, [isSignedIn]);

  const handleAuth = async () => {
    if (isSignedIn) {
      Alert.alert("You're already signed in");
      return;
    }

    try {
      const { createdSessionId } = await startOAuthFlow();

      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        router.replace('/screens/DashboardScreen');
      }
    } catch (err: any) {
      Alert.alert('Authentication failed', err?.message || 'Unknown error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to AI Career Coach</Text>
      <Text style={styles.subtitle}>Get personalized AI career guidance</Text>

      <View style={styles.buttonContainer}>
        <Button title="Continue with Google" onPress={handleAuth} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
});
