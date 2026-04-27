def generate_alerts(data):
    alerts = []

    if data.get("sugar", 0) > 10:
        alerts.append("High sugar content")

    if data.get("fat", 0) > 10:
        alerts.append("High fat content")

    if data.get("calories", 0) > 300:
        alerts.append("High calorie food")

    if not alerts:
        alerts.append("No major health risks detected")

    return alerts