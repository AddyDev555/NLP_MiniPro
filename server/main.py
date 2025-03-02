import numpy as np
import pickle
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

# Load the trained model
model = load_model("essay_scoring_model_bilstm.h5")

# Load the tokenizer
with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

# Define max sequence length (same as used during training)
MAX_SEQUENCE_LENGTH = 300  # Modify if needed

# Function to preprocess input text
def preprocess_text(text):
    sequences = tokenizer.texts_to_sequences([text])
    padded_sequence = pad_sequences(sequences, maxlen=MAX_SEQUENCE_LENGTH, padding='post', truncating='post')
    return padded_sequence

# Function to make a prediction
def predict_score(text):
    processed_text = preprocess_text(text)
    prediction = model.predict(processed_text)
    
    # Round to nearest integer for score prediction
    predicted_score = np.round(prediction).flatten()[0]
    return predicted_score