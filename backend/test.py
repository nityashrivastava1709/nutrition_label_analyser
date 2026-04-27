from utils.preprocess import preprocess_image
from utils.ocr import extract_text
from utils.parser import parse_nutrition
from utils.scorer import calculate_health_score
from utils.alerts import generate_alerts
from utils.recommend import generate_recommendations
import cv2

image_path = "sample.jpg"

# Step 1: preprocess
processed = preprocess_image(image_path)

# Step 2: OCR
text = extract_text(processed)

# Step 3: Parse data
data = parse_nutrition(text)

# Step 4: Calculate score
score = calculate_health_score(data)

alerts = generate_alerts(data)
recs = generate_recommendations(data)

# Save processed image
cv2.imwrite("output.jpg", processed)

print("Raw Text:\n", text)
print("\nParsed Data:\n", data)
print("\nHealth Score:", score)
print("\nAlerts:", alerts)
print("\nRecommendations:", recs)