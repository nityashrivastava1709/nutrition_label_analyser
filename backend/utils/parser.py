import re

def extract_value(pattern, text):

    match = re.search(pattern, text, re.IGNORECASE)

    if match:
        return float(match.group(1))

    return 0


def parse_nutrition(text):

    text = text.replace("\n", " ")

    data = {
        "calories": extract_value(
         r"Calories\s+(?!from)(\d+)",
         text
      ),

        "protein": extract_value(
            r"Protein\s+(\d+\.?\d*)g",
            text
        ),

        "fat": extract_value(
            r"Total Fat\s+(\d+\.?\d*)g",
            text
        ),

        "carbs": extract_value(
            r"Total Carbohydrates\s+(\d+\.?\d*)g",
            text
        ),

        "sodium": extract_value(
         r"Sodium\s+(\d+\.?\d*)mg",
         text
        ),

        "fiber": extract_value(
            r"Fiber\s+(\d+\.?\d*)g",
            text
        ),

        "sugar": extract_value(
         r"Sugars?\s+(\d+\.?\d*)g",
         text
        ),
    }

    return data