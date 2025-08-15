# backend/app/__init__.py

from flask import Flask
from flask_cors import CORS

def create_app():
    # Create the Flask app instance
    app = Flask(__name__)
    CORS(app) # Initialize CORS

    # Import and register the blueprint from our routes file
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app