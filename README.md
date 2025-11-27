# SkinAI - Skin Disease Detection System

A full-stack web application for detecting skin diseases from images using AI/ML.

## Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS
- **Backend**: Python Flask (REST API)
- **ML Integration**: TensorFlow/Keras (MobileNetV2 Transfer Learning)
- **Database**: SQLite

## Project Structure

```
skin-ai/
├── backend/
│   ├── app.py              # Flask server with routes
│   ├── utils.py            # Image preprocessing utilities
│   ├── train_model.py      # Model training script (MobileNetV2)
│   ├── skin_disease_model.h5 # Trained model file
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Dropzone.jsx
│   │   │   └── ChatSupport.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── LoginRegister.jsx
│   │   │   └── ...
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the Flask server:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Features

- **Authentication**: Secure Login/Signup with password hashing and session management
- **Account Isolation**: Auto-logout and data clearing to prevent session leakage
- **Forgot Password**: Secure password reset functionality
- **Image Upload**: Drag-and-drop interface for skin images
- **AI Prediction**: Real-time analysis using MobileNetV2 model (7 HAM10000 classes)
- **Results Display**: Shows predicted disease, confidence score, and consultation tips
- **History**: Database storage for prediction history (SQLite)
- **PDF Reports**: Downloadable reports of your skin analysis

## Demo Credentials

- Username: `admin`, Password: `admin123`
- Username: `user`, Password: `user123`

Or create a new account using the Sign Up form.

## API Endpoints

- `POST /login` - User login
- `POST /signup` - User registration
- `POST /predict` - Image prediction (uses ML model)
- `GET /history` - Get prediction history
- `POST /change-password` - Change user password
- `POST /reset-password` - Reset forgotten password
- `DELETE /user/<id>` - Delete account

## Notes

- **Model**: The system uses a pre-trained MobileNetV2 architecture (`skin_disease_model.h5`).
- **Preprocessing**: Images are automatically resized to 224x224 and normalized.
- **Database**: SQLite database initializes automatically on first run.

## Future Enhancements

- Add user authentication with JWT tokens
- Implement prediction history UI pagination
- Add image gallery for past predictions
- Enhanced error handling and validation

