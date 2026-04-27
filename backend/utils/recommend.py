def generate_recommendations(data):
    recs = []

    if data.get("sugar", 0) > 10:
        recs.append("Reduce sugar intake")

    if data.get("fat", 0) > 10:
        recs.append("Limit fatty foods")

    if data.get("protein", 0) < 5:
        recs.append("Increase protein intake")

    if data.get("calories", 0) > 300:
        recs.append("Avoid high calorie foods")

    if not recs:
        recs.append("Maintain balanced diet")

    return recs