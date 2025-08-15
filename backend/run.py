# backend/run.py

import os
import sys

# Add the 'backend' directory to Python's system path
# This allows Python to find the 'app' package
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)