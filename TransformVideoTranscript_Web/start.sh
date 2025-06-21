#!/bin/bash

# start frontend
cd frontend
npm run dev &

# start backend
cd ../backend
source ../venv/bin/activate
export FLASK_APP=app.py
export FLASK_ENV=development
flask run --port=3001