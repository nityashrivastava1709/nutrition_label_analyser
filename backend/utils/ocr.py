import pytesseract

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_text(image):

    custom_config = r'--oem 3 --psm 4'

    text = pytesseract.image_to_string(
        image,
        config=custom_config
    )

    return text