import cv2

def preprocess_image(image_path):

    image = cv2.imread(image_path)

    # Resize for better OCR
    image = cv2.resize(image, None, fx=3, fy=3)

    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Sharpen image
    gray = cv2.bilateralFilter(gray, 11, 17, 17)

    # Threshold
    thresh = cv2.threshold(
        gray,
        150,
        255,
        cv2.THRESH_BINARY
    )[1]

    return thresh