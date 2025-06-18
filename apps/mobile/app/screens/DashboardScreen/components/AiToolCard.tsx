// app/screens/DashboardScreen/components/AiToolCard.tsx

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface AiToolCardProps {
  tool: {
    name: string;
    description: string;
    icon: any;
    path: string;
    button: string;
  };
  onNavigate: (path: string) => void;
}

export const AiToolCard: React.FC<AiToolCardProps> = ({ tool, onNavigate }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={tool.icon} style={styles.icon} resizeMode="contain" />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{tool.name}</Text>
          <Text style={styles.description}>{tool.description}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onNavigate(tool.path)}
          >
            <Text style={styles.buttonText}>{tool.button}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    color: '#6B7280',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
});
