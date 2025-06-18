import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { Send } from 'lucide-react-native';
import { EmptyState } from './components/EmptyState'

export default function AiChatScreen() {
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const onSend = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    try {
      const result = await axios.post('http://localhost:3000/api/ai-career-chat-agent', {
        userInput: userInput.trim(),
      });

      console.log('✅ Response:', result.data);
    } catch (err) {
      console.error('❌ Request failed:', err);
    } finally {
      setLoading(false);
      setUserInput('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Career Q&A Chat</Text>
      <Text style={styles.subtitle}>
        Ask questions about AI careers and get expert advice.
      </Text>

      <TouchableOpacity style={styles.chatButton}>
        <Text style={styles.chatButtonText}>+ Chat</Text>
      </TouchableOpacity>

      <View style={styles.chatBox}>
        <ScrollView>
          <EmptyState onSelect={(q) => setUserInput(q)} />
        </ScrollView>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Type here..."
          value={userInput}
          onChangeText={setUserInput}
          style={styles.textInput}
        />
        <TouchableOpacity
          onPress={onSend}
          disabled={loading}
          style={styles.sendButton}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Send size={20} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: '#555',
    marginBottom: 12,
  },
  chatButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  chatButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  chatBox: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  textInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 8,
  },
});
