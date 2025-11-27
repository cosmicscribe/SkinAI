"""
Skin Disease Detection Model Training Script
Uses MobileNetV2 transfer learning on HAM10000 dataset
"""

import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
import numpy as np

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

NUM_CLASSES = len(DISEASE_CLASSES)

def create_model(input_shape=(224, 224, 3)):
    """
    Create MobileNetV2-based transfer learning model
    """
    # Load pre-trained MobileNetV2 (without top layers)
    base_model = MobileNetV2(
        input_shape=input_shape,
        include_top=False,
        weights='imagenet'
    )
    
    # Freeze base model layers
    base_model.trainable = False
    
    # Add custom classification layers
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(256, activation='relu')(x)
    x = Dropout(0.5)(x)
    x = Dense(128, activation='relu')(x)
    x = Dropout(0.3)(x)
    predictions = Dense(NUM_CLASSES, activation='softmax')(x)
    
    # Create final model
    model = Model(inputs=base_model.input, outputs=predictions)
    
    return model

def compile_model(model):
    """
    Compile model with optimizer and loss function
    """
    model.compile(
        optimizer=Adam(learning_rate=0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy', tf.keras.metrics.AUC(name='auc')]
    )
    return model

def calculate_class_weights():
    """
    Calculate class weights to handle imbalance in HAM10000
    Based on actual HAM10000 distribution
    """
    # HAM10000 class distribution (approximate)
    class_counts = {
        0: 1113,  # Melanoma
        1: 514,   # Basal Cell Carcinoma
        2: 1099,  # Benign Keratosis
        3: 115,   # Dermatofibroma
        4: 6705,  # Melanocytic Nevus (majority class)
        5: 142,   # Vascular Lesion
        6: 327    # Actinic Keratosis
    }
    
    total = sum(class_counts.values())
    class_weights = {
        class_id: total / (NUM_CLASSES * count)
        for class_id, count in class_counts.items()
    }
    
    return class_weights

if __name__ == '__main__':
    print("Creating Skin Disease Detection Model...")
    print(f"Classes: {NUM_CLASSES}")
    print(f"Disease types: {DISEASE_CLASSES}")
    
    # Create model
    model = create_model()
    model = compile_model(model)
    
    # Print model summary
    print("\nModel Architecture:")
    model.summary()
    
    # Calculate class weights
    class_weights = calculate_class_weights()
    print("\nClass Weights (for imbalance handling):")
    for class_id, weight in class_weights.items():
        print(f"  {DISEASE_CLASSES[class_id]}: {weight:.4f}")
    
    # Save model architecture
    model.save('skin_disease_model.h5')
    print("\n✅ Model saved as 'skin_disease_model.h5'")
    print("\nNote: This is a pre-trained architecture.")
    print("For actual deployment, train on HAM10000 dataset with:")
    print("  - Data augmentation (rotation, flip, zoom)")
    print("  - Class weights for imbalance")
    print("  - Train/val/test split (70/15/15)")
    print("  - Early stopping and model checkpointing")
