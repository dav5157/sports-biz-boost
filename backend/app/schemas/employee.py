from pydantic import BaseModel, EmailStr
from typing import Optional
import enum

class RoleEnum(str, enum.Enum):
    junior = "junior"
    junior_associate = "junior_associate"
    associate = "associate"
    manager = "manager"
    team_leader = "team_leader"
    partner = "partner"

class EmployeeBase(BaseModel):
    name: str
    role: RoleEnum
    email: EmailStr
    is_active: Optional[bool] = True

class EmployeeCreate(EmployeeBase):
    fixed_salary: Optional[float]
    commission_rate: Optional[float]

class EmployeeOut(EmployeeBase):
    id: int
    fixed_salary: Optional[float]
    commission_rate: Optional[float]

    class Config:
        orm_mode = True

# Add more schemas for Client, Appointment, Analytics, etc.
