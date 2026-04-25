import cv2

def preprocess_image(image_path):
    img = cv2.imread(image_path)

    # Resize (important for OCR clarity)
    img = cv2.resize(img, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)

    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Denoise
    blur = cv2.medianBlur(gray, 3)

    # Adaptive threshold (better than fixed threshold)
    thresh = cv2.adaptiveThreshold(
        blur, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        11, 2
    )

    return thresh