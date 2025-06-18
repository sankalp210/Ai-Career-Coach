// app/screens/DashboardScreen/components/History.tsx

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export const History = () => {
  const [userHistory, setUserHistory] = useState<string[]>([]); // Placeholder state

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      {userHistory.length > 0 ? (
        <FlatList
          data={userHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.item}>• {item}</Text>
          )}
        />
      ) : (
        <Text style={styles.empty}>No history available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  item: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 6,
  },
  empty: {
    color: '#6B7280',
  },
});
