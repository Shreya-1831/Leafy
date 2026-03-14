# 🌿 Leafy — AI Plant Disease Detection

Leafy is an AI-powered garden assistant that detects plant diseases from leaf images and provides personalized treatment advice through a conversational plant chatbot.

---

## ✨ Features

- 🔍 **Plant Disease Detection** — Upload a leaf image and get instant AI diagnosis
- 🤖 **AI Chatbot** — Conversational plant advisor powered by Groq (Llama 3.3 70B)
- 📊 **Confidence Scoring** — Shows prediction confidence with uncertainty detection (<70% flagged)
- 🌿 **Poetic Plant Persona** — Leafy speaks in metaphors like a wise gardening companion
- 🛡️ **File Validation** — Only accepts valid image formats (JPG, PNG, GIF, WEBP)
- ⚡ **Fast Inference** — Lightweight CNN model with 224x224 input

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Tailwind CSS |
| Backend | FastAPI + Python 3.10 |
| ML Model | TensorFlow 2.15 + tf_keras |
| AI Chatbot | Groq API (Llama 3.3 70B) |
| Frontend Deploy | Vercel |
| Backend Deploy | Render (with persistent disk) |

---

## 📁 Project Structure

```
LEAFY/
├── .gitignore
├── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   │   └── api.ts
│   │   └── types/
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
└── backend/
    ├── main.py
    ├── chatbot.py
    ├── requirements.txt
    ├── class_indices.json
    ├── render.yaml
    └── .env.example
```

---

## ⚙️ Local Development

### Prerequisites

- Python 3.10
- Node.js 18+
- Groq API key → [console.groq.com](https://console.groq.com)

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv_py310

# Activate (Windows)
venv_py310\Scripts\activate

# Activate (Mac/Linux)
source venv_py310/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Add your GROQ_API_KEY to .env

# Run server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# VITE_API_URL=http://127.0.0.1:8000

# Run dev server
npm run dev
```

---

## 🔐 Environment Variables

### Backend — `backend/.env`

```env
GROQ_API_KEY=your_groq_api_key_here
MODEL_PATH=plant_disease_model_fixed.keras
CLASS_INDICES_PATH=class_indices.json
```

### Frontend — `frontend/.env`

```env
VITE_API_URL=http://127.0.0.1:8000
```

---

## 🚀 Deployment

### Backend → Render

1. Go to [render.com](https://render.com) → **New Web Service**
2. Connect your GitHub repo
3. Set **Root Directory** to `backend`
4. Set **Build Command**:
   ```
   pip install -r requirements.txt
   ```
5. Set **Start Command**:
   ```
   uvicorn main:app --host 0.0.0.0 --port $PORT --workers 1
   ```
6. Add environment variable: `GROQ_API_KEY` = your key
7. Go to **Disks** → Add disk → Mount path `/data` → 1GB
8. Upload model via Render shell:
   ```bash
   cp plant_disease_model_fixed.keras /data/
   cp class_indices.json /data/
   ```
9. Add environment variables:
   ```
   MODEL_PATH=/data/plant_disease_model_fixed.keras
   CLASS_INDICES_PATH=/data/class_indices.json
   ```

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Connect your GitHub repo
3. Set **Root Directory** to `frontend`
4. Add environment variable:
   ```
   VITE_API_URL=https://your-leafy-backend.onrender.com
   ```
5. Deploy!

### After Deploying — Update CORS

In `backend/main.py`, update `allow_origins`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://your-leafy-app.vercel.app",
    ],
    ...
)
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check + model status |
| `GET` | `/health` | Detailed health check |
| `POST` | `/predict/` | Upload image, get disease diagnosis |
| `POST` | `/chat/` | Send message to plant chatbot |
| `GET` | `/docs` | Auto-generated Swagger UI |

### POST `/predict/`

**Request:** `multipart/form-data`
- `file` — image file (JPG, PNG, GIF, WEBP, max 5MB)

**Response:**
```json
{
  "predicted_class": "Rust",
  "confidence": 0.98,
  "plant_chatbot_response": "Dear one, I sense the reddish wounds...",
  "success": true
}
```

### POST `/chat/`

**Request:** `application/json`
```json
{
  "message": "How do I treat powdery mildew?"
}
```

**Response:**
```json
{
  "plant_chatbot_response": "Ah, the white dusting of worry...",
  "success": true
}
```

---

## 🧠 Model Details

| Property | Value |
|---|---|
| Architecture | Custom CNN |
| Input Shape | 224 × 224 × 3 |
| Output Classes | 3 |
| Framework | TensorFlow 2.15 + tf_keras 2.15 |
| Format | `.keras` |

### Model Architecture

```
Input (224, 224, 3)
  → Conv2D(32, 3x3, relu)
  → MaxPooling2D(2x2)
  → Conv2D(64, 3x3, relu)
  → MaxPooling2D(2x2)
  → Flatten
  → Dense(128, relu)
  → Dense(3, softmax)
```

---

## ⚠️ Important Notes

- The `.keras` model file is **not included in the repository** (too large for GitHub)
- Upload it manually to Render's persistent disk after deployment
- The model file must be present for `/predict/` to work
- Visit `/health` endpoint to verify model is loaded after deployment

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add your feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — feel free to use, modify, and distribute.

---

> 🌱 *"Even the mightiest oak was once a little nut that held its ground."*
