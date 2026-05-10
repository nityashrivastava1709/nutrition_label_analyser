from flask import Flask, request, jsonify
import os
import cv2
from datetime import datetime
from flask_cors import CORS

from utils.preprocess import preprocess_image
from utils.ocr import extract_text
from utils.parser import parse_nutrition
from utils.scorer import calculate_health_score
from utils.alerts import generate_alerts
from utils.recommend import generate_recommendations

app = Flask(__name__)
CORS(app)
from flask_cors import CORS

CORS(app)

history = []

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return "Nutrition Label Analyzer Backend Running"

@app.route("/analyze", methods=["POST"])
def analyze():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    # Step 1: preprocess
    processed = preprocess_image(filepath)

    # Step 2: OCR
    text = extract_text(processed)

     # 🔥 Extract product name (simple method)
    lines = text.split("\n")
    name = lines[0] if lines else "Unknown Product"
    
    # Step 3: parse
    data = parse_nutrition(text)

    # Step 4: score
    score = calculate_health_score(data)

    # Step 5: alerts
    alerts = generate_alerts(data)

    # Step 6: recommendations
    recs = generate_recommendations(data)

    result = {
        "name": name,
         "text": text,
          "data": data,
         "health_score": score,
         "alerts": alerts,
         "recommendations": recs,
         "timestamp": datetime.now().isoformat(),
     }
         

          # 🔥 Save to history
    history.append(result)

    return jsonify(result)
     
@app.route("/history", methods=["GET"])
def get_history():
    return jsonify(history)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
