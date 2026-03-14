import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import ChatMessage from './ChatMessage';
import { sendChatMessage } from '../services/api';

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const { messages, isLoading, addMessage, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    addMessage(userMessage, 'user');
    setInput('');
    
    try {
      const response = await sendChatMessage(userMessage);
      // 🌟 FIXED: Extract only the actual message string from the response object
      addMessage(response.plant_chatbot_response, 'bot');
    } catch (error) {
      addMessage("I apologize, but I'm having trouble connecting to my plant knowledge. Please try again in a moment.", 'bot');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between bg-leaf-600 text-white p-3 rounded-t-lg">
        <h2 className="text-lg font-medium">Chat with Leafy</h2>
        <button 
          onClick={clearChat}
          className="text-leaf-100 hover:text-white transition-colors focus:outline-none"
          aria-label="Reset chat"
        >
          <RefreshCw size={18} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-leaf-50 to-white">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />

        {isLoading && (
          <div className="flex justify-center my-4">
            <div className="flex space-x-2 items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <div className="w-2 h-2 bg-leaf-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 bg-leaf-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-leaf-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>

      <form 
        onSubmit={handleSendMessage} 
        className="flex items-center p-3 border-t bg-white rounded-b-lg"
      >
        <input 
          type="text"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-leaf-400"
          placeholder="Ask Leafy something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          type="submit"
          className="ml-2 bg-leaf-600 hover:bg-leaf-700 text-white rounded-full p-2 transition-colors"
          disabled={isLoading}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
