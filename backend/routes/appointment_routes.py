from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Appointment, MedicalRecord
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

# --- Schemas ---
class AppointmentRequest(BaseModel):
    user_id: int
    doctor_name: str
    appointment_date: str
    appointment_time: str
    reason: str

class MedicalRecordRequest(BaseModel):
    user_id: int
    diagnosis: str
    prescription: Optional[str] = None
    notes: Optional[str] = None

# --- Book Appointment ---
@router.post("/book")
def book_appointment(request: AppointmentRequest, db: Session = Depends(get_db)):
    appointment = Appointment(
        user_id=request.user_id,
        doctor_name=request.doctor_name,
        appointment_date=request.appointment_date,
        appointment_time=request.appointment_time,
        reason=request.reason
    )
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    return {"message": "Appointment booked successfully! ✅", "id": appointment.id}

# --- Get Appointments ---
@router.get("/list/{user_id}")
def get_appointments(user_id: int, db: Session = Depends(get_db)):
    appointments = db.query(Appointment).filter(Appointment.user_id == user_id).all()
    return appointments

# --- Add Medical Record ---
@router.post("/medical-record")
def add_medical_record(request: MedicalRecordRequest, db: Session = Depends(get_db)):
    record = MedicalRecord(
        user_id=request.user_id,
        diagnosis=request.diagnosis,
        prescription=request.prescription,
        notes=request.notes
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return {"message": "Medical record added successfully! ✅"}

# --- Get Medical Records ---
@router.get("/medical-records/{user_id}")
def get_medical_records(user_id: int, db: Session = Depends(get_db)):
    records = db.query(MedicalRecord).filter(MedicalRecord.user_id == user_id).all()
    return records