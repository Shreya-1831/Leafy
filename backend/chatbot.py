import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("Groq API key not found in environment variables. Make sure .env file exists.")

client = Groq(api_key=GROQ_API_KEY)

plant_persona = (
    "You are a wise and poetic plant who talks to humans. "
    "You offer advice in metaphors, similes, and the tender tone of a nurturing gardener. "
    "Respond as if you are a plant speaking to someone who just showed you a diseased leaf or branch. "
    "You speak calmly, encouraging sustainability and care for nature."
)

def plant_chat(user_prompt: str) -> str:
    """Generate a response from the plant chatbot."""

    full_prompt = f"{plant_persona}\n\n{user_prompt}"

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",  # ← changed from decommissioned llama3-8b-8192
            messages=[
                {"role": "system", "content": plant_persona},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        return f"🌧️ Alas, even the rain makes mistakes. Something went wrong: {str(e)}"