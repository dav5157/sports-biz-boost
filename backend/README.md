# Sports Biz Boost Backend

This is a FastAPI backend for the sports clinic ERP system. It manages employees, appointments, analytics, alerts, and scheduled reports, and connects to a PostgreSQL database.

## Features
- Employee management (roles, commission, salaries)
- Appointment, class, and attendance tracking
- Analytics endpoints (revenue, profit, retention, etc.)
- Alerts and scheduled email reports
- PostgreSQL database (SQLAlchemy ORM)
- REST API endpoints

## Setup
1. Create a Python virtual environment:
   ```sh
   python3 -m venv venv
   source venv/bin/activate
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Set up environment variables (see `.env.example`).
4. Run the server:
   ```sh
   uvicorn app.main:app --reload
   ```

## Folder Structure
- `app/` - Main FastAPI app and modules
- `app/models/` - SQLAlchemy models
- `app/schemas/` - Pydantic schemas
- `app/api/` - API routers
- `app/services/` - Business logic
- `app/core/` - Config, database, email, background tasks

---
