from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def chat(request: ChatRequest):
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are CareBot, a helpful AI health assistant. Give short, clear, and well-structured answers using simple bullet points. Keep responses concise and easy to read. Always recommend consulting a doctor for serious concerns."},
                {"role": "user", "content": request.message}
            ]
        )
        return {"reply": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))