# This file will contain business logic for analytics, salary, commission, and reporting
# Example: calculate salary, commission, and profit for each employee

def calculate_salary_and_commission(role: str, revenue: float, fixed_salary: float = 0.0, commission_rate: float = 0.0):
    if role == "junior":
        return fixed_salary, 0.0
    else:
        commission = revenue * commission_rate
        return 0.0, commission

# Add more business logic for analytics, alerts, and reports
