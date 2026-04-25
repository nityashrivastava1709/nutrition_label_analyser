import re

def parse_nutrition(text):
    data = {}

    # Calories
    calories = re.search(r'calories\s*(\d+)', text, re.IGNORECASE)
    if calories:
        data['calories'] = int(calories.group(1))

    # Sugar
    sugar = re.search(r'sugar\s*(\d+)', text, re.IGNORECASE)
    if sugar:
        data['sugar'] = int(sugar.group(1))

    # Fat
    fat = re.search(r'fat\s*(\d+)', text, re.IGNORECASE)
    if fat:
        data['fat'] = int(fat.group(1))

    # Protein
    protein = re.search(r'protein\s*(\d+)', text, re.IGNORECASE)
    if protein:
        data['protein'] = int(protein.group(1))

    return data