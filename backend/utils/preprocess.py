import cv2


def preprocess_image(image_path):

    # read image
    image = cv2.imread(image_path)

    # grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # upscale image for better OCR
    gray = cv2.resize(gray, None, fx=2, fy=2)

    # reduce noise
    gray = cv2.GaussianBlur(gray, (5, 5), 0)

    # adaptive threshold
    thresh = cv2.adaptiveThreshold(
        gray,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        11,
        2
    )

    return thresh