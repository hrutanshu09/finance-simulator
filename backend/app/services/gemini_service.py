# backend/services/gemini_service.py
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv() # Load environment variables from .env file

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel('gemini-1.5-flash')

def get_initial_insights(results_data):
    """Generates the first analysis of the simulation results."""
    prompt = f"""
    You are a friendly financial advisor. A user's financial simulation shows the following results: {results_data}.
    Write a brief, encouraging summary (2-3 sentences). Then, suggest two different and actionable steps the user could take to improve their outcome.
    Use markdown for formatting. Start with a '### Summary' section, followed by a '### Recommendations' section.
    """
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error getting initial insights: {e}")
        return "Could not generate AI insights at this time."

def get_chat_response(chat_history_with_context):
    """Handles follow-up chat questions using conversation history."""
    try:
        chat = model.start_chat(history=chat_history_with_context)
        # The last message in the history is the new user question
        last_question = chat_history_with_context[-1]['parts'][0]
        response = chat.send_message(last_question)
        return response.text
    except Exception as e:
        print(f"Error getting chat response: {e}")
        return "I am sorry, I couldn't process that question."