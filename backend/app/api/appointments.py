from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.schemas.appointment import AppointmentCreate, AppointmentManualCreate, AppointmentOut
from app.core import database
from app.models.base import Appointment
from app.core import scheduler
from datetime import datetime

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/api/appointments/smart-book", response_model=AppointmentOut)
def smart_book_appointment(payload: AppointmentCreate, db: Session = Depends(get_db)):
    # Use the smart scheduler to suggest and book a slot
    suggestion = scheduler.suggest_slot(payload, db)
    if not suggestion:
        raise HTTPException(status_code=400, detail="No available slot found.")
    appointment = Appointment(**suggestion.dict())
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    return appointment

@router.post("/api/appointments/manual-book", response_model=AppointmentOut)
def manual_book_appointment(payload: AppointmentManualCreate, db: Session = Depends(get_db)):
    # Directly assign a room and timeslot, only check for basic conflicts
    conflict = db.query(Appointment).filter(
        Appointment.room_id == payload.room_id,
        Appointment.start_time < payload.end_time,
        Appointment.end_time > payload.start_time
    ).first()
    if conflict:
        raise HTTPException(status_code=409, detail="Room is already booked for this timeslot.")
    appointment = Appointment(**payload.dict())
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    return appointment
