# backend/app/routes.py

from flask import Blueprint, request, jsonify
# Use relative imports because we are inside a package now
from .simulation_engine import run_simulation
from .services.gemini_service import get_initial_insights, get_chat_response

# 1. Create a Blueprint object
main = Blueprint('main', __name__)

# 2. Change all decorators from @app.route to @main.route
@main.route("/api/simulate", methods=['POST'])
def simulate():
    config = request.get_json()
    if not config:
        return jsonify({"error": "Missing request data"}), 400
    try:
        simulation_results = run_simulation(config)
        insights = get_initial_insights(simulation_results)
        final_response = {
            "simulationResults": simulation_results,
            "aiInsights": insights
        }
        return jsonify(final_response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@main.route("/api/chat", methods=['POST'])
def chat():
    data = request.get_json()
    if not data or 'history' not in data:
        return jsonify({"error": "Missing chat history"}), 400
    try:
        ai_response = get_chat_response(data['history'])
        return jsonify({"response": ai_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@main.route("/")
def index():
    return "Your financial simulator backend is running."