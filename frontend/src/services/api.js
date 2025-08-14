// src/services/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

export const runSimulationAPI = async (simulationData) => {
  try {
    const response = await axios.post(`${API_URL}/simulate`, simulationData);
    return response.data;
  } catch (error) {
    console.error("Error running simulation:", error);
    throw error;
  }
};

// Add this new function to handle the chat API calls
export const getChatResponseAPI = async (history) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { history });
    return response.data;
  } catch (error) {
    console.error("Error getting chat response:", error);
    throw error;
  }
};