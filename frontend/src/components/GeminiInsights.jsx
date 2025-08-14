// src/components/GeminiInsights.jsx

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { getChatResponseAPI } from '../services/api';

function GeminiInsights({ initialInsights, simulationResults }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialInsights) {
      setMessages([{ role: 'model', parts: [{ text: initialInsights }] }]);
    }
  }, [initialInsights]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage = { role: 'user', parts: [{ text: userInput }] };
    setMessages(prevMessages => [...prevMessages, userMessage]); // Show user message immediately
    setIsLoading(true);
    setUserInput('');

    // **THE FIX IS HERE**
    // Create a context message with the original simulation results.
    // This reminds the AI what the conversation is about.
    const contextMessage = {
      role: 'user',
      parts: [{
        text: `(CONTEXT: My initial simulation results were ${JSON.stringify(simulationResults)}. Now, please answer my next question based on that context.)`
      }]
    };

    try {
      // Send the context, the chat history, and the new message to the API
      const response = await getChatResponseAPI([contextMessage, ...messages, userMessage]);
      const aiMessage = { role: 'model', parts: [{ text: response.response }] };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Chat API failed", error);
      const errorMessage = { role: 'model', parts: [{ text: "Sorry, I couldn't connect to the assistant right now." }] };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="insights-container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role}`}>
            {/* Don't render the hidden context message */}
            {msg.parts[0].text.startsWith('(CONTEXT:') ? null : <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>}
          </div>
        ))}
        {isLoading && <div className="chat-message model">Thinking...</div>}
      </div>
      <form className="chat-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask a follow-up question..."
          disabled={!initialInsights || isLoading}
        />
        <button type="submit" disabled={!initialInsights || isLoading}>Send</button>
      </form>
    </div>
  );
}

export default GeminiInsights;