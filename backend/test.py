from utils.preprocess import preprocess_image
from utils.ocr import extract_text
from utils.parser import parse_nutrition
import cv2

image_path = "sample.jpg"

# Step 1: preprocess
processed = preprocess_image(image_path)

# Step 2: OCR
text = extract_text(processed)

# Step 3: Parse data
data = parse_nutrition(text)

# Save processed image
cv2.imwrite("output.jpg", processed)

print("Raw Text:\n", text)
print("\nParsed Data:\n", data)