import React from 'react';
import { UserCircle2 } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div 
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 animate-grow`}
      style={{ animationDelay: '0.1s' }}
    >
      <div 
        className={`max-w-[80%] md:max-w-[70%] rounded-t-lg ${
          isBot 
            ? 'bg-leaf-100 text-leaf-900 rounded-br-lg rounded-bl-none border-l-4 border-leaf-400' 
            : 'bg-soil-100 text-soil-900 rounded-bl-lg rounded-br-none border-r-4 border-soil-400'
        } p-3 shadow-sm`}
      >
        <div className="flex items-start">
          {isBot && (
            <div className="mr-2 mt-1 flex-shrink-0">
              <div className="w-8 h-8 bg-leaf-600 rounded-full flex items-center justify-center text-white">
                🌿
              </div>
            </div>
          )}
          <div className="flex-1">
            <div className="mb-1 flex justify-between items-center">
              <span className={`text-xs font-medium ${isBot ? 'text-leaf-700' : 'text-soil-700'}`}>
                {isBot ? 'Leafy' : 'You'}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            <p className="text-sm whitespace-pre-line">{message.content}</p>
          </div>
          {!isBot && (
            <div className="ml-2 mt-1 flex-shrink-0">
              <UserCircle2 className="w-8 h-8 text-soil-600" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;