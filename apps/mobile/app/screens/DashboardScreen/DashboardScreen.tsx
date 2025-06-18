// app/screens/DashboardScreen.tsx

import React from 'react';
import { ScrollView } from 'react-native';
import { WelcomeBanner } from './components/WelcomeBanner';
import { AiTools } from './components/AiTools';
import { History } from './components/History';
import { useRouter } from 'expo-router';

const DashboardScreen = () => {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <WelcomeBanner />
      <AiTools onNavigate={(path) => router.push(`/${path}`)} />
      <History />
    </ScrollView>
  );
};

export default DashboardScreen;
