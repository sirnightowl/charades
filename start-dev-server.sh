#!/bin/bash

# Start Development Server Script for Charades App
# This script starts a simple HTTP server to test the Charades app locally

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null
then
    echo "Python 3 is not installed. Please install Python 3 to run this script."
    exit 1
fi

# Define the port (default 8000)
PORT=${1:-8000}

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
PROJECT_DIR="$SCRIPT_DIR"

echo "Starting Charades Development Server..."
echo "Serving files from: $PROJECT_DIR"
echo "Server address: http://localhost:$PORT"
echo "Press Ctrl+C to stop the server"
echo ""

# Start the Python HTTP server
cd "$PROJECT_DIR" && python3 -m http.server "$PORT"