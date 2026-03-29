Live Deployment

The project is fully deployed on Render.

📱 Frontend (Mobile/Web App)
https://wtc-round-2-group-1-404-not-found.onrender.com

This is the React Native Expo web deployment where users can interact with the application interface.

⚙️ Backend API (FastAPI)
https://wtc-round-2-group-1-404-not-found-backend.onrender.com

The backend handles:

Voice trigger processing
Location data handling
Emergency alert storage

🧪 API Documentation

FastAPI automatically provides Swagger documentation.
https://wtc-round-2-group-1-404-not-found-backend.onrender.com/docs

THE API endpoints can be directly accessed from this interface.

☁️ Deployment Details
The application is deployed using Render Cloud Platform.

Frontend Deployment
Framework: React Native (Expo Web)
Hosting: Render Static Web Service
Build Command
npm install
npm run build
Backend Deployment
Framework: FastAPI
Runtime: Python
Hosting: Render Web Service

Start Command

uvicorn main:app --host 0.0.0.0 --port ${PORT}

🔐 Environment Variables
Backend uses environment variables configured in Render:

DB_NAME=DATABASE_NAME
DB_USER=DATABASE_USERNAME
DB_PASSWORD=DATABASE_PASSWORD
DB_HOST=DATABASE_HOST_ADDRESS
DB_PORT=DATABASE_PORT

🧪 Testing the Deployed Application
1️⃣ Open the frontend URL
https://wtc-round-2-group-1-404-not-found.onrender.com

2️⃣ Start Listening Mode

3️⃣ Speak a distress phrase:

HELP

or

Call an ambulance

4️⃣ The application will:

Detect the phrase
Capture the user's location
Send an alert request to the backend API
Store the emergency event in the database