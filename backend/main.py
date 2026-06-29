from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes.auth_routes import router as auth_router
from routes.chat_routes import router as chat_router
from routes.appointment_routes import router as appointment_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="CareBot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(chat_router, prefix="/ai", tags=["AI Chatbot"])
app.include_router(appointment_router, prefix="/appointments", tags=["Appointments"])

@app.get("/")
def root():
    return {"message": "CareBot API is running! 🏥"}