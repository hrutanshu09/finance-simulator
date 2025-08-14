# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from simulation_engine import run_simulation
# Import our new Gemini service functions
from services.gemini_service import get_initial_insights, get_chat_response

app = Flask(__name__)
CORS(app)

@app.route("/api/simulate", methods=['POST'])
def simulate():
    config = request.get_json()
    if not config:
        return jsonify({"error": "Missing request data"}), 400
    try:
        # 1. Get numerical results
        simulation_results = run_simulation(config)
        # 2. Get initial AI insights based on those results
        insights = get_initial_insights(simulation_results)
        # 3. Combine them into a single response
        final_response = {
            "simulationResults": simulation_results,
            "aiInsights": insights
        }
        return jsonify(final_response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# New endpoint for handling chat messages
@app.route("/api/chat", methods=['POST'])
def chat():
    data = request.get_json()
    if not data or 'history' not in data:
        return jsonify({"error": "Missing chat history"}), 400
    try:
        # Get the AI's response based on the conversation history
        ai_response = get_chat_response(data['history'])
        return jsonify({"response": ai_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/")
def index():
    return "Your financial simulator backend is running."