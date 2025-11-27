from PIL import Image
import numpy as np
import io

def preprocess_image(file):
    """
    Preprocess image for model prediction.
    Resizes to 224x224 and normalizes pixel values.
    
    Args:
        file: File object from Flask request
        
    Returns:
        numpy array: Preprocessed image array
    """
    # Read image from file
    image = Image.open(io.BytesIO(file.read()))
    
    # Convert to RGB if necessary
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    # Resize to 224x224
    image = image.resize((224, 224))
    
    # Convert to numpy array
    img_array = np.array(image)
    
    # Normalize pixel values to [0, 1]
    img_array = img_array.astype('float32') / 255.0
    
    return img_array

