// app/screens/DashboardScreen/components/WelcomeBanner.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const WelcomeBanner = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ai Career Coach Agent</Text>
      <Text style={styles.description}>
        Smarter Career decisions start here. Discover personalized career insights, skill development paths, and AI-driven recommendations tailored to your unique profile.
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6366F1',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  description: {
    color: 'white',
    marginBottom: 12,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
});
