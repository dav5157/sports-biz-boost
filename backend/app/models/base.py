from sqlalchemy import Column, Integer, String, Float, Enum, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum

class RoleEnum(str, enum.Enum):
    junior = "junior"
    junior_associate = "junior_associate"
    associate = "associate"
    manager = "manager"
    team_leader = "team_leader"
    partner = "partner"

class Employee(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), nullable=False)
    fixed_salary = Column(Float, nullable=True)
    commission_rate = Column(Float, nullable=True)
    email = Column(String, unique=True, index=True)
    is_active = Column(Boolean, default=True)
    appointments = relationship("Appointment", back_populates="therapist")

class Client(Base):
    __tablename__ = "clients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    appointments = relationship("Appointment", back_populates="client")

class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, index=True)
    therapist_id = Column(Integer, ForeignKey("employees.id"))
    client_id = Column(Integer, ForeignKey("clients.id"))
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)
    revenue = Column(Float, nullable=False)
    status = Column(String, default="booked")
    therapist = relationship("Employee", back_populates="appointments")
    client = relationship("Client", back_populates="appointments")

# Add more models for classes, attendance, resources, salaries, alerts, reports, etc.
