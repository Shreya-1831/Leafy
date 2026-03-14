import { PredictionResult } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const predictDisease = async (imageFile: File): Promise<PredictionResult> => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);
    // NO api_key — backend doesn't need it from frontend

    const response = await fetch(`${API_URL}/predict/`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Server error: ${response.status}`, errorText);
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error predicting disease:', error);
    throw error;
  }
};

export const sendChatMessage = async (message: string): Promise<{ plant_chatbot_response: string }> => {
  try {
    const response = await fetch(`${API_URL}/chat/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        // NO api_key here either
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Server error: ${response.status}`, errorText);
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Raw chat response:", data);
    return data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};