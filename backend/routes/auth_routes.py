from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User
from auth import hash_password, verify_password, create_access_token
from pydantic import BaseModel

router = APIRouter()

# --- Schemas ---
class RegisterRequest(BaseModel):
    full_name: str
    email: str
    password: str
    role: str = "patient"

class LoginRequest(BaseModel):
    email: str
    password: str

# --- Register ---
@router.post("/register")
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        full_name=request.full_name,
        email=request.email,
        hashed_password=hash_password(request.password),
        role=request.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully! ✅"}

# --- Login ---
@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_access_token({"sub": user.email, "role": user.role})
    return {"access_token": token, "token_type": "bearer"}