# Hybrid Smart Scheduler: Heuristic + Convex Optimization (LP)
# This is a backend module for slot suggestion with constraints

from datetime import datetime, timedelta
import pulp

# Example data structures (replace with real DB queries in production)
# appointments: list of dicts with keys: slot, therapist, room
# therapists: list of therapist names
# rooms: list of room names

def generate_timeslots(date_str, start_hour=8, end_hour=18, slot_minutes=30):
    date = datetime.strptime(date_str, "%Y-%m-%d")
    slots = []
    for h in range(start_hour, end_hour):
        for m in range(0, 60, slot_minutes):
            slots.append(date.replace(hour=h, minute=m))
    return slots

def is_available(slot, therapist, room, appointments):
    for appt in appointments:
        if appt['slot'] == slot and (appt['therapist'] == therapist or appt['room'] == room):
            return False
    return True

def count_appointments(therapist, room, appointments):
    return sum(
        1 for appt in appointments
        if (therapist is None or appt['therapist'] == therapist) and appt['room'] == room
    )

def check_constraints(slot, request, appointments, therapists, rooms):
    # Joe's Room constraint
    if request['room'] == "Joe's Room [A]":
        if request['therapist'] == "Joe":
            joe_bookings = count_appointments("Joe", "Joe's Room [A]", appointments)
            total_bookings = count_appointments(None, "Joe's Room [A]", appointments)
            if total_bookings == 0 or joe_bookings / total_bookings < 0.7:
                return True
        elif request['therapist'] in ["Junior1", "Junior2"]:
            junior_bookings = count_appointments(request['therapist'], "Joe's Room [A]", appointments)
            total_bookings = count_appointments(None, "Joe's Room [A]", appointments)
            if total_bookings == 0 or junior_bookings / total_bookings < 0.3:
                return True
        return False
    # Junior can work in up to 3 rooms
    if request['therapist'].startswith("Junior"):
        rooms_worked = set(appt['room'] for appt in appointments if appt['therapist'] == request['therapist'])
        if len(rooms_worked) >= 3 and request['room'] not in rooms_worked:
            return False
    return True

def suggest_slots(appointments, therapists, rooms, request):
    # 1. Heuristic: Find nearest empty slots
    candidate_slots = []
    for slot in generate_timeslots(request['date']):
        if is_available(slot, request['therapist'], request['room'], appointments):
            if check_constraints(slot, request, appointments, therapists, rooms):
                candidate_slots.append(slot)
    # 2. LP Refinement (maximize utilization, enforce ratios)
    # For brevity, this is a placeholder. In production, set up a PuLP problem here.
    # 3. Return top 4 suggestion slots
    return candidate_slots[:4]

# Example usage (replace with API endpoint in production):
# slots = suggest_slots(appointments, therapists, rooms, request)
# return slots
