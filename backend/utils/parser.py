import re


def extract_value(patterns, text):

    for pattern in patterns:

        match = re.search(pattern, text, re.IGNORECASE)

        if match:
            try:
                return float(match.group(1))
            except:
                return 0

    return 0


def parse_nutrition(text):

    # clean OCR text
    text = text.replace("\n", " ")
    text = text.replace("|", " ")
    text = text.replace("Omg", "0mg")

    data = {

        "calories": extract_value([
            r"Calories\s*[:\-]?\s*(\d+)"
        ], text),

        "protein": extract_value([
            r"Protein\s*[:\-]?\s*(\d+\.?\d*)"
        ], text),

        "fat": extract_value([
            r"Total Fat\s*[:\-]?\s*(\d+\.?\d*)",
            r"Fat\s*[:\-]?\s*(\d+\.?\d*)"
        ], text),

        "carbs": extract_value([
            r"Total Carbohydrates?\s*[:\-]?\s*(\d+\.?\d*)",
            r"Carbohydrates?\s*[:\-]?\s*(\d+\.?\d*)"
        ], text),

        "sugar": extract_value([
            r"Sugars?\s*[:\-]?\s*(\d+\.?\d*)"
        ], text),

        "fiber": extract_value([
            r"Fiber\s*[:\-]?\s*(\d+\.?\d*)"
        ], text),

        "sodium": extract_value([
            r"Sodium\s*[:\-]?\s*(\d+\.?\d*)"
        ], text),
    }

    return data