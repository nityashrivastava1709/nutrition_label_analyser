def calculate_health_score(data):
    score = 100

    # Penalize high sugar
    if data.get("sugar", 0) > 10:
        score -= 20

    # Penalize high fat
    if data.get("fat", 0) > 10:
        score -= 20

    # Reward protein
    if data.get("protein", 0) > 5:
        score += 10

    # Keep score between 0–100
    score = max(0, min(score, 100))

    return score