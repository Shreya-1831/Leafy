export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface PredictionResult {
  predicted_class: string;
  confidence: number;
  plant_chatbot_response: string;
}

export interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  predictionResult: PredictionResult | null;
  addMessage: (content: string, sender: 'user' | 'bot') => void;
  setPredictionResult: (result: PredictionResult | null) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearChat: () => void;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}