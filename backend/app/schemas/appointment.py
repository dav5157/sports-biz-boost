from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AppointmentBase(BaseModel):
    therapist_id: int
    client_id: int
    room_id: int
    start_time: datetime
    end_time: datetime
    revenue: Optional[float] = 0.0
    status: Optional[str] = "booked"

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentManualCreate(BaseModel):
    therapist_id: int
    client_id: int
    room_id: int
    start_time: datetime
    end_time: datetime
    revenue: Optional[float] = 0.0
    status: Optional[str] = "booked"

class AppointmentOut(AppointmentBase):
    id: int
    class Config:
        orm_mode = True
