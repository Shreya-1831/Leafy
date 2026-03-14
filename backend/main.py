import os
os.environ["TF_USE_LEGACY_KERAS"] = "1"

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tf_keras as keras # type: ignore
from PIL import Image
from dotenv import load_dotenv
import numpy as np
import io
import json
from chatbot import plant_chat

app = FastAPI(title="🌿 Leafy Garden Assistant")
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model storage
model = None
class_labels = None

def safe_load_model():
    """Load model with error handling"""
    global model, class_labels
    try:
        print("🌿 Loading YOUR plant model...")

        model = keras.models.load_model(
            'plant_disease_model_fixed.keras',
            compile=False
        )

        with open('class_indices.json', 'r') as f:
            class_indices = json.load(f)
            class_labels = {v: k for k, v in class_indices.items()}

        print(f"✅ Model loaded! {len(class_labels)} classes")
        return True

    except Exception as e:
        print(f"❌ Model failed: {e}")
        return False

def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    image = image.resize((224, 224))
    image_array = np.array(image) / 255.0
    return np.expand_dims(image_array, axis=0)

@app.on_event("startup")
async def startup():
    safe_load_model()

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    # No api_key param — key stays on backend only
    if model is None:
        return JSONResponse(status_code=500, content={"error": "Model not loaded"})

    try:
        image_bytes = await file.read()
        image_tensor = preprocess_image(image_bytes)

        prediction = model.predict(image_tensor)
        predicted_index = int(np.argmax(prediction[0]))
        predicted_class = class_labels.get(predicted_index, "unknown")
        confidence = float(np.max(prediction[0]))

        bot_reply = plant_chat(f"My leaves feel {predicted_class.lower()}. What should I do?")

        return {
            "predicted_class": predicted_class,
            "confidence": confidence,
            "plant_chatbot_response": bot_reply,
            "success": True
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

class ChatRequest(BaseModel):
    message: str

@app.post("/chat/")
async def chat(req: ChatRequest):
    # No api_key param — key stays on backend only
    try:
        response = plant_chat(req.message)
        return {"plant_chatbot_response": response, "success": True}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.get("/")
async def root():
    return {
        "message": "🌿 Leafy Garden Assistant",
        "model_status": "loaded" if model else "failed"
    }