import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

interface EmptyStateProps {
  onSelect: (q: string) => void;
}

export const EmptyState = ({ onSelect }: EmptyStateProps) => {
  const questionList = [
    'How to switch careers to UI/UX design?',
    'What are the skills to become a data scientist?',
    'How to prepare for a machine learning interview?',
    'What are the best resources to learn AI?',
  ];

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/empty_state.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>No Chats Yet</Text>
      <Text style={styles.subtitle}>
        Start a conversation by asking a question about AI careers.
      </Text>
      <View style={styles.questionBox}>
        <Text style={styles.popularTitle}>Popular Questions</Text>
        {questionList.map((q, index) => (
          <TouchableOpacity key={index} onPress={() => onSelect(q)}>
            <Text style={styles.question}>{q}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  questionBox: {
    width: '100%',
    marginTop: 10,
  },
  popularTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  question: {
    color: '#2563eb',
    marginBottom: 6,
  },
});
