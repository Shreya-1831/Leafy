import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message, PredictionResult, ChatContextType } from '../types';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello, I'm Leafy! 🌿 Upload a photo of your plant or ask me a question about gardening. I'm here to help!",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);

  const addMessage = (content: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        content: "Hello, I'm Leafy! 🌿 Upload a photo of your plant or ask me a question about gardening. I'm here to help!",
        sender: 'bot',
        timestamp: new Date(),
      }
    ]);
    setPredictionResult(null);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        error,
        predictionResult,
        addMessage,
        setIsLoading,
        setError,
        setPredictionResult,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};