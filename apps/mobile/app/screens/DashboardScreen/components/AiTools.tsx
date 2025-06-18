// app/screens/DashboardScreen/components/AiTools.tsx

import React from 'react';
import { View } from 'react-native';
import { AiToolCard } from './AiToolCard';

export const AiTools = ({ onNavigate }: { onNavigate: (path: string) => void }) => {
  const aiToolsList = [
    {
      name: 'AI Career Q&A Chat',
      description: 'Ask questions about AI careers and get expert advice.',
      icon: require('../../../../assets/images/ai_chatbot.png'),
      path: 'AiChat',
      button: 'Let\'s Chat',
    },
    {
      name: 'Career Roadmap Generator',
      description: 'Generate personalized career roadmaps.',
      icon: require('../../../../assets/images/roadmap_generator.png'),
      path: 'RoadmapGenerator',
      button: 'Generate Roadmap',
    },
    {
      name: 'Cover Letter Generator',
      description: 'Create tailored cover letters.',
      icon: require('../../../../assets/images/cover_letter_generator.png'),
      path: 'CoverLetterGenerator',
      button: 'Generate Cover Letter',
    },
    {
      name: 'AI Resume Analyzer',
      description: 'Analyze your resume with AI.',
      icon: require('../../../../assets/images/resume_analyzer.png'),
      path: 'ResumeAnalyzer',
      button: 'Analyze Resume',
    },
  ];

  return (
    <View>
      {aiToolsList.map((tool, index) => (
        <AiToolCard key={index} tool={tool} onNavigate={onNavigate} />
      ))}
    </View>
  );
};
