from fastapi import APIRouter, Query
from datetime import date

router = APIRouter()

@router.get("/api/analytics/dashboard")
def get_dashboard(date: str = Query(...)):
    # Return mock dashboard data
    return {
        "dailyRevenue": {"value": 4250, "change": 12, "target": 4000},
        "ebita": {"value": 1870, "change": 8, "target": 1500},
        "profitMargin": 44,
        "cashCollected": {"value": 3900, "rate": 92},
        "roomUtilization": {"overall": 78, "rooms": [{"id": 1, "rate": 92}, {"id": 2, "rate": 71}, {"id": 3, "rate": 71}]},
        "patientsSeen": {"total": 28, "walkIns": 6, "preBooked": 22},
        "avgSessionValue": {"value": 152, "change": 12},
        "noShowRate": 7,
        "topPerformer": {"name": "Sarah Chen", "satisfaction": 97, "revenue": 2100},
        "alerts": [
            {"type": "warning", "message": "Room 3 idle 2.5 hrs (10:30-1:00) - scheduling gap"},
            {"type": "suggestion", "message": "Tomorrow 10-12 slot underbooked. Send SMS blast to 'Sports Injury' segment offering 15% off - projected +$600 revenue"}
        ]
    }

@router.get("/api/analytics")
def get_analytics(date: str = Query(...)):
    # Return mock analytics data
    return {
        "revenue": 4250,
        "profit": 1870,
        "retention": 82,
        "uniqueClients": 24,
        "utilization": 78,
        "trend": [
            {"date": date, "revenue": 4250, "profit": 1870},
        ]
    }

@router.get("/api/reports")
def get_reports(type: str = Query(...), date: str = Query(...)):
    if type == "daily":
        return {
            "date": date,
            "financial_pulse": {
                "revenue": 4250,
                "revenue_change_pct": 12,
                "revenue_target": 4000,
                "ebita": 1870,
                "ebita_change_pct": 8,
                "ebita_target": 1500,
                "profit_margin": 44,
                "industry_avg_margin": 35,
                "cash_collected": 3900,
                "collection_rate": 92
            },
            "operational_efficiency": {
                "room_utilization": 78,
                "rooms": [
                    {"name": "Rehab/Gym", "utilization": 45, "sessions": 8, "idle_hours": 2.5},
                    {"name": "Yoga Studio [Y]", "utilization": 60, "sessions": 4, "idle_hours": 1.0},
                    {"name": "Offsite (jockey)", "utilization": 30, "sessions": 2, "idle_hours": 4.0},
                    {"name": "Pilates studio 10/F", "utilization": 55, "sessions": 5, "idle_hours": 2.0},
                    {"name": "Mete Room [D]", "utilization": 71, "sessions": 7, "idle_hours": 1.5},
                    {"name": "Charles Room [B]", "utilization": 50, "sessions": 3, "idle_hours": 3.0},
                    {"name": "Joe's Room [A]", "utilization": 40, "sessions": 2, "idle_hours": 4.5},
                    {"name": "Kayden Room [I]", "utilization": 35, "sessions": 1, "idle_hours": 5.0},
                    {"name": "Glenn/Vanessa Room [J]", "utilization": 65, "sessions": 6, "idle_hours": 2.0},
                    {"name": "Chiro Room 10/F [C]", "utilization": 58, "sessions": 4, "idle_hours": 2.5},
                    {"name": "May/Ana/Jeff Room [E]", "utilization": 48, "sessions": 3, "idle_hours": 3.5},
                    {"name": "Jo Leung Room [H]", "utilization": 52, "sessions": 4, "idle_hours": 3.0},
                    {"name": "Emma's Room [F]", "utilization": 62, "sessions": 5, "idle_hours": 2.0},
                    {"name": "Chiro Room 1/F [G]", "utilization": 38, "sessions": 2, "idle_hours": 5.0},
                    {"name": "Ava/Grace Women's Health Room [K]", "utilization": 70, "sessions": 7, "idle_hours": 1.0}
                ],
                "patients_seen": 28,
                "walk_ins": 6,
                "pre_booked": 22,
                "avg_session_value": 152,
                "avg_session_value_change": 12,
                "no_show_rate": 7,
                "no_show_target": 5
            },
            "employees": [
                {"name": "Sarah Chen", "role": "Partner", "patients": 8, "revenue": 2100, "satisfaction": 97, "sessions": 8},
                {"name": "Mike Torres", "role": "Associate", "patients": 6, "revenue": 1500, "satisfaction": 92, "sessions": 6},
                {"name": "Amy Liu", "role": "Associate", "patients": 5, "revenue": 1200, "satisfaction": 95, "sessions": 5},
                {"name": "James Park", "role": "Partner", "patients": 4, "revenue": 800, "satisfaction": 90, "sessions": 4}
            ],
            "top_performer": {
                "name": "Sarah Chen",
                "satisfaction": 97,
                "revenue": 2100
            },
            "alerts": [
                {"type": "warning", "message": "Room 3 idle 2.5 hrs (10:30-1:00) - scheduling gap"}
            ],
            "ai_suggestion": "Tomorrow 10-12 slot underbooked. Send SMS blast to 'Sports Injury' segment offering 15% off - projected +$600 revenue"
        }
    elif type == "weekly":
        return {
            "date": date,
            "financial_dashboard": {
                "total_revenue": 24500,
                "revenue_wow_pct": 15,
                "q4_target_track": 87,
                "revenue_breakdown": {
                    "physiotherapy": 14200,
                    "massage_therapy": 6100,
                    "premium_addons": 4200
                },
                "ebita": 10780,
                "profit_margin": 44,
                "price_ebita": 8.2,
                "healthy_range": "8-12x",
                "per_room_revenue": 8167,
                "per_room_revenue_change": 500,
                "cash_collected": 22100,
                "cash_collection_rate": 90,
                "outstanding_ar": 8400,
                "ar_30days_pct": 45,
                "refunds_issued": 300,
                "refunds_pct": 1.2,
                "room_details": [
                    {"name": "Rehab/Gym", "utilization": 45, "sessions": 48, "revenue": 4200},
                    {"name": "Yoga Studio [Y]", "utilization": 60, "sessions": 24, "revenue": 2100},
                    {"name": "Offsite (jockey)", "utilization": 30, "sessions": 12, "revenue": 900},
                    {"name": "Pilates studio 10/F", "utilization": 55, "sessions": 30, "revenue": 2500},
                    {"name": "Mete Room [D]", "utilization": 71, "sessions": 36, "revenue": 3100},
                    {"name": "Charles Room [B]", "utilization": 50, "sessions": 18, "revenue": 1500},
                    {"name": "Joe's Room [A]", "utilization": 40, "sessions": 12, "revenue": 900},
                    {"name": "Kayden Room [I]", "utilization": 35, "sessions": 6, "revenue": 500},
                    {"name": "Glenn/Vanessa Room [J]", "utilization": 65, "sessions": 32, "revenue": 2700},
                    {"name": "Chiro Room 10/F [C]", "utilization": 58, "sessions": 20, "revenue": 1800},
                    {"name": "May/Ana/Jeff Room [E]", "utilization": 48, "sessions": 14, "revenue": 1200},
                    {"name": "Jo Leung Room [H]", "utilization": 52, "sessions": 16, "revenue": 1300},
                    {"name": "Emma's Room [F]", "utilization": 62, "sessions": 28, "revenue": 2400},
                    {"name": "Chiro Room 1/F [G]", "utilization": 38, "sessions": 8, "revenue": 600},
                    {"name": "Ava/Grace Women's Health Room [K]", "utilization": 70, "sessions": 34, "revenue": 2900}
                ]
            },
            "operational_metrics": {
                "room_utilization_heatmap": [
                    [85, 79, 91, 88, 76, 95],
                    [92, 88, 84, 90, 81, 98],
                    [45, 52, 48, 51, 44, 78],
                    [88, 91, 89, 93, 88, 85],
                    [94, 96, 97, 95, 92, 72]
                ],
                "room_utilization_labels": ["8-10am", "10-12", "12-2pm", "2-4pm", "4-6pm"],
                "days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                "total_patients": 168,
                "new_patients": 42,
                "returning_patients": 126,
                "avg_wait_time": 7,
                "wait_time_target": 10,
                "treatment_completion": 89,
                "dropped_out": 15,
                "staff_productivity": [
                    {"name": "Sarah Chen", "role": "Partner", "patients": 52, "revenue": 10400, "satisfaction": 97},
                    {"name": "Mike Torres", "role": "Associate", "patients": 48, "revenue": 8900, "satisfaction": 92},
                    {"name": "Amy Liu", "role": "Associate", "patients": 44, "revenue": 8200, "satisfaction": 95},
                    {"name": "James Park", "role": "Partner", "patients": 39, "revenue": 6500, "satisfaction": 90, "below_target": True}
                ]
            },
            "power_tools": {
                "predictive_cash_flow": {
                    "next_week_revenue": 22800,
                    "fixed_costs": 18500,
                    "variable_costs": 3200,
                    "projected_cash_surplus": 1100,
                    "recommendation": "Push 3 package renewals this week (call high-value clients) to add $4,500 to next week's collection."
                },
                "equipment_roi": {
                    "name": "Shockwave Therapy Machine",
                    "cost": 15000,
                    "sessions": 42,
                    "revenue_generated": 5250,
                    "payback_period_months": 2.8,
                    "roi_6mo_pct": 187
                }
            }
        }
    else:
        return {"error": "Unknown report type"}

@router.get("/api/scheduler")
def get_scheduler(date: str = Query(...), type: str = Query(...)):
    # Return mock scheduler data
    return {
        "stats": {"bookings": 24, "availableSlots": 8, "activeTherapists": 3, "utilization": 78},
        "therapists": [
            {"id": 1, "name": "Sarah Chen", "type": "Partner", "available": True, "nextAvailable": "10:00 AM"},
            {"id": 2, "name": "Mike Torres", "type": "Associate", "available": True, "nextAvailable": "11:00 AM"},
            {"id": 3, "name": "Amy Liu", "type": "Associate", "available": False, "nextAvailable": "2:00 PM"},
            {"id": 4, "name": "James Park", "type": "Partner", "available": True, "nextAvailable": "9:00 AM"}
        ],
        "appointments": [
            {"id": 1, "time": "9:00 AM", "patient": "John Doe", "therapist": "Sarah Chen", "room": 1, "type": "Physio", "duration": 45, "status": "confirmed"},
            {"id": 2, "time": "10:00 AM", "patient": "Jane Smith", "therapist": "Mike Torres", "room": 2, "type": "Massage", "duration": 60, "status": "confirmed"},
            {"id": 3, "time": "11:00 AM", "patient": "Available", "therapist": "Amy Liu", "room": 1, "type": "slot", "duration": 60, "status": "available"},
            {"id": 4, "time": "12:00 PM", "patient": "Bob Wilson", "therapist": "James Park", "room": 3, "type": "Gym Session", "duration": 30, "status": "pending"},
            {"id": 5, "time": "1:00 PM", "patient": "Available", "therapist": "Sarah Chen", "room": 2, "type": "slot", "duration": 60, "status": "available"},
            {"id": 6, "time": "2:00 PM", "patient": "Lisa Brown", "therapist": "Mike Torres", "room": 1, "type": "Physio", "duration": 45, "status": "confirmed"}
        ],
        "rooms": [
            {"id": 1, "name": "Physio Room 1", "status": "active", "utilization": 92},
            {"id": 2, "name": "Physio Room 2", "status": "active", "utilization": 71},
            {"id": 3, "name": "Gym Area", "status": "active", "utilization": 71}
        ],
        "suggestions": [
            {"time": "11:00 AM", "therapist": "Amy Liu", "room": 1, "reason": "Optimal for knee rehabilitation", "confidence": 95},
            {"time": "1:00 PM", "therapist": "Sarah Chen", "room": 2, "reason": "High success rate with sports injuries", "confidence": 88},
            {"time": "3:00 PM", "therapist": "James Park", "room": 3, "reason": "Specialized in athletic performance", "confidence": 92}
        ]
    }
