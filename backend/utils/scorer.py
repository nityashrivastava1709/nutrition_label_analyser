def calculate_health_score(data):

    score = 100

    calories = data.get("calories", 0)
    sugar = data.get("sugar", 0)
    sodium = data.get("sodium", 0)
    fat = data.get("fat", 0)
    protein = data.get("protein", 0)
    fiber = data.get("fiber", 0)

    # unhealthy deductions

    if calories > 400:
        score -= 10

    elif calories > 250:
        score -= 5

    if sugar > 20:
        score -= 20

    elif sugar > 10:
        score -= 10

    if sodium > 1000:
        score -= 20

    elif sodium > 500:
        score -= 10

    if fat > 20:
        score -= 15

    elif fat > 10:
        score -= 8

    # healthy bonuses

    if protein >= 10:
        score += 5

    if fiber >= 5:
        score += 5

    # prevent invalid high scores from missing data
    detected_values = sum([
        calories > 0,
        sugar > 0,
        sodium > 0,
        fat > 0,
        protein > 0,
        fiber > 0
    ])

    if detected_values <= 2:
        score -= 25

    # clamp score
    score = max(0, min(score, 100))

    return score