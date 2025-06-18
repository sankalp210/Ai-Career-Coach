// app/screens/Auth/SignInScreen.tsx
import React from 'react';
import { View, Button, Alert } from 'react-native';
import { useOAuth, useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function SignInScreen() {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { setActive } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const { createdSessionId } = await startOAuthFlow();
      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        router.replace('/screens/DashboardScreen');
      }
    } catch (err: any) {
      Alert.alert('Sign in failed', err?.message || 'Unknown error');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Sign In with Google" onPress={handleSignIn} />
    </View>
  );
}
