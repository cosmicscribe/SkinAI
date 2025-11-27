from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import os
import sqlite3

import random
from utils import preprocess_image

app = Flask(__name__)
CORS(app)

# Database initialization
def init_db():
    conn = sqlite3.connect('skin_ai.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            image_path TEXT,
            predicted_disease TEXT,
            confidence REAL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    conn.commit()
    conn.close()

# HAM10000 disease classes
DISEASE_CLASSES = [
    "Melanoma",
    "Basal Cell Carcinoma",
    "Benign Keratosis",
    "Dermatofibroma",
    "Melanocytic Nevus",
    "Vascular Lesion",
    "Actinic Keratosis"
]

# Load ML model
MODEL = None
try:
    print("Attempting to import TensorFlow...")
    import tensorflow as tf
    print("✅ TensorFlow imported")
    
    print("Attempting to import load_model...")
    # Try new import path first (TensorFlow 2.16+)
    try:
        from keras.models import load_model
        print("✅ load_model imported (using keras)")
    except:
        # Fall back to old import path (TensorFlow 2.15 and earlier)
        from tensorflow.keras.models import load_model
        print("✅ load_model imported (using tensorflow.keras)")
    
    print("Attempting to load model file...")
    MODEL = load_model('skin_disease_model.h5')
    print("✅ ML Model loaded successfully")
except ImportError as e:
    print(f"⚠️ Import Error: {e}. Using fallback predictions.")
    print("   TensorFlow may not be installed. Run: pip install tensorflow")
except Exception as e:
    print(f"⚠️ Model not loaded: {e}. Using fallback predictions.")

# Mock users (for demo purposes)
MOCK_USERS = {
    "admin": "admin123",
    "user": "user123"
}

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Check database for user
    conn = sqlite3.connect('skin_ai.db')
    c = conn.cursor()
    c.execute('SELECT id, password FROM users WHERE username = ?', (username,))
    user = c.fetchone()
    conn.close()
    
    if user and check_password_hash(user[1], password):
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'user_id': user[0],
            'username': username
        }), 200
    else:
        return jsonify({
            'success': False,
            'message': 'Invalid credentials'
        }), 401

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({
            'success': False,
            'message': 'Username and password are required'
        }), 400
    
    # Hash password
    hashed_password = generate_password_hash(password)
    
    try:
        conn = sqlite3.connect('skin_ai.db')
        c = conn.cursor()
        c.execute('INSERT INTO users (username, password) VALUES (?, ?)', 
                  (username, hashed_password))
        user_id = c.lastrowid
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Signup successful',
            'user_id': user_id,
            'username': username
        }), 201
    except sqlite3.IntegrityError:
        return jsonify({
            'success': False,
            'message': 'Username already exists'
        }), 400

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    files = request.files.getlist('image')
    user_id = request.form.get('user_id', 1) # Get user_id from form data
    
    if not files or files[0].filename == '':
        return jsonify({'error': 'No image selected'}), 400
        
    # Check file extensions
    for file in files:
        if file.filename and not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Only PNG, JPG, and JPEG are allowed.'}), 400

    if len(files) > 3:
        return jsonify({'error': 'Maximum 3 images allowed'}), 400
    
    results = []
    
    try:
        # Initialize variables for aggregation
        total_probabilities = None
        valid_images_count = 0
        first_image_data_url = None
        
        import numpy as np
        import io
        import base64
        import hashlib
        
        for i, file in enumerate(files):
            if file.filename == '':
                continue
                
            # Read file bytes
            file_bytes = file.read()
            
            # Store first image for database/display
            if first_image_data_url is None:
                image_base64 = base64.b64encode(file_bytes).decode('utf-8')
                first_image_data_url = f"data:{file.content_type};base64,{image_base64}"
            
            # Preprocess image
            processed_image = preprocess_image(io.BytesIO(file_bytes))
            
            # Make prediction
            if MODEL is not None:
                print(f"🧠 Processing image {i+1}/{len(files)}: {file.filename}")
                # Add batch dimension
                img_batch = np.expand_dims(processed_image, axis=0)
                
                # Get prediction probabilities
                predictions = MODEL.predict(img_batch, verbose=0)
                
                if total_probabilities is None:
                    total_probabilities = predictions[0]
                else:
                    total_probabilities += predictions[0]
                
                valid_images_count += 1
            else:
                print(f"⚠️ Using FALLBACK (random) prediction for {file.filename} - Model not loaded!")
                # Fallback logic for demo/testing without model
                # We'll just simulate a probability vector for the fallback
                mock_probs = np.zeros(len(DISEASE_CLASSES))
                # Pick a random class to be dominant
                dominant_idx = random.randint(0, len(DISEASE_CLASSES)-1)
                mock_probs[dominant_idx] = random.uniform(0.7, 0.95)
                # Distribute remaining probability
                remaining = 1.0 - mock_probs[dominant_idx]
                for j in range(len(DISEASE_CLASSES)):
                    if j != dominant_idx:
                        share = random.random()
                        mock_probs[j] = share
                # Normalize
                mock_probs = mock_probs / np.sum(mock_probs)
                
                if total_probabilities is None:
                    total_probabilities = mock_probs
                else:
                    total_probabilities += mock_probs
                
                valid_images_count += 1

        if valid_images_count == 0:
             return jsonify({'error': 'No valid images processed'}), 400

        # Calculate average probabilities
        avg_probabilities = total_probabilities / valid_images_count
        
        # Determine final class
        predicted_class_idx = np.argmax(avg_probabilities)
        confidence = float(avg_probabilities[predicted_class_idx] * 100)
        predicted_disease = DISEASE_CLASSES[predicted_class_idx]
        
        print(f"✅ Aggregated Prediction: {predicted_disease} ({confidence:.2f}%) from {valid_images_count} images")

        # Save to database (using the first image as reference)
        conn = sqlite3.connect('skin_ai.db')
        c = conn.cursor()
        
        # Check for duplicate prediction (simplified check based on user and recent time could be better, 
        # but sticking to image hash of first image for now or just always inserting)
        # For aggregation, we'll just insert a new record to keep it simple and accurate to this specific scan event
        
        c.execute('''
            INSERT INTO predictions (user_id, image_path, predicted_disease, confidence)
            VALUES (?, ?, ?, ?)
        ''', (user_id, first_image_data_url, predicted_disease, confidence))
        conn.commit()
        conn.close()
        
        # Return single result in list (to maintain frontend compatibility if it expects array)
        results = [{
            'filename': 'aggregated_result',
            'disease': predicted_disease,
            'confidence': confidence,
            'image': first_image_data_url
        }]
        
        return jsonify({
            'success': True,
            'predictions': results
        }), 200
        
    except Exception as e:
        print(f"Error in predict: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/history', methods=['GET'])
def get_history():
    user_id = request.args.get('user_id', 1, type=int)
    
    try:
        conn = sqlite3.connect('skin_ai.db')
        c = conn.cursor()
        c.execute('''
            SELECT id, image_path, predicted_disease, confidence, created_at
            FROM predictions
            WHERE user_id = ?
            ORDER BY created_at DESC
            LIMIT 10
        ''', (user_id,))
        
        results = c.fetchall()
        conn.close()
        
        history = []
        for row in results:
            history.append({
                'id': row[0],
                'image_path': row[1],
                'predicted_disease': row[2],
                'confidence': row[3],
                'created_at': row[4]
            })
        
        return jsonify({
            'success': True,
            'history': history
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/change-password', methods=['POST'])
def change_password():
    data = request.json
    user_id = data.get('user_id')
    current_password = data.get('current_password')
    new_password = data.get('new_password')
    
    if not all([user_id, current_password, new_password]):
        return jsonify({
            'success': False,
            'message': 'All fields are required'
        }), 400
    
    try:
        conn = sqlite3.connect('skin_ai.db')
        c = conn.cursor()
        c.execute('SELECT password FROM users WHERE id = ?', (user_id,))
        user = c.fetchone()
        
        if not user:
            conn.close()
            return jsonify({
                'success': False,
                'message': 'User not found'
            }), 404
        
        # Verify current password
        if not check_password_hash(user[0], current_password):
            conn.close()
            return jsonify({
                'success': False,
                'message': 'Current password is incorrect'
            }), 401
        
        # Update to new hashed password
        hashed_new_password = generate_password_hash(new_password)
        c.execute('UPDATE users SET password = ? WHERE id = ?', 
                  (hashed_new_password, user_id))
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Password changed successfully'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.json
    username = data.get('username')
    new_password = data.get('new_password')
    
    if not all([username, new_password]):
        return jsonify({
            'success': False,
            'message': 'Username and new password are required'
        }), 400
    
    try:
        conn = sqlite3.connect('skin_ai.db')
        c = conn.cursor()
        c.execute('SELECT id FROM users WHERE username = ?', (username,))
        user = c.fetchone()
        
        if not user:
            conn.close()
            return jsonify({
                'success': False,
                'message': 'User not found'
            }), 404
        
        # Update to new hashed password
        hashed_new_password = generate_password_hash(new_password)
        c.execute('UPDATE users SET password = ? WHERE id = ?', 
                  (hashed_new_password, user[0]))
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Password reset successfully'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/user/<int:user_id>', methods=['DELETE'])
def delete_account(user_id):
    data = request.json
    password = data.get('password')
    
    if not password:
        return jsonify({
            'success': False,
            'message': 'Password is required to delete account'
        }), 400
    
    try:
        conn = sqlite3.connect('skin_ai.db')
        c = conn.cursor()
        c.execute('SELECT password FROM users WHERE id = ?', (user_id,))
        user = c.fetchone()
        
        if not user:
            conn.close()
            return jsonify({
                'success': False,
                'message': 'User not found'
            }), 404
        
        # Verify password
        if not check_password_hash(user[0], password):
            conn.close()
            return jsonify({
                'success': False,
                'message': 'Incorrect password'
            }), 401
        
        # Delete user's predictions first (foreign key)
        c.execute('DELETE FROM predictions WHERE user_id = ?', (user_id,))
        # Delete user
        c.execute('DELETE FROM users WHERE id = ?', (user_id,))
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Account deleted successfully'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)

