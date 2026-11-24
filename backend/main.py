
import io
import os

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import pytesseract
from deep_translator import GoogleTranslator


# -----------------------------
# TESSERACT OCR CONFIGURATION
# -----------------------------

TESSERACT_PATH = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

if os.path.exists(TESSERACT_PATH):
    pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH
else:
    print("Warning: Tesseract executable not found at configured path")


# -----------------------------
# FASTAPI APP
# -----------------------------

app = FastAPI(title="LinguaVision AI")


# -----------------------------
# CORS CONFIGURATION
# -----------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# SUPPORTED LANGUAGES
# -----------------------------

LANGUAGES = {
    "english": "en",
    "hindi": "hi",
    "french": "fr",
    "italian": "it",
    "spanish": "es",
    "german": "de",
    "korean": "ko",
    "japanese": "ja",
    "chinese": "zh-CN",
    "arabic": "ar",
    "portuguese": "pt",
    "russian": "ru",
}


# -----------------------------
# HOME ROUTE
# -----------------------------

@app.get("/")
def home():
    return {"message": "LinguaVision AI Backend is running!"}


# -----------------------------
# LANGUAGE ROUTE
# -----------------------------

@app.get("/api/languages")
def get_languages():
    return LANGUAGES


# -----------------------------
# IMAGE TRANSLATION ROUTE
# -----------------------------

@app.post("/api/translate-image")
async def translate_image(
    file: UploadFile = File(...),
    target_language: str = Form(...)
):
    try:

        # 1. Read image
        image_bytes = await file.read()

        if not image_bytes:
            raise HTTPException(
                status_code=400,
                detail="Uploaded image is empty."
            )

        # 2. Convert image
        image = Image.open(
            io.BytesIO(image_bytes)
        ).convert("RGB")

        # 3. Extract text using OCR
        extracted_text = pytesseract.image_to_string(
            image,
            lang="eng"
        ).strip()

        if not extracted_text:
            raise HTTPException(
                status_code=400,
                detail="No text found in image."
            )

        # 4. Validate language
        language_code = LANGUAGES.get(
            target_language.strip().lower()
        )

        if not language_code:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported language: {target_language}"
            )

        # 5. Translate extracted text
        translated_text = GoogleTranslator(
            source="auto",
            target=language_code
        ).translate(extracted_text)

        # 6. Return result
        return {
            "success": True,
            "original_text": extracted_text,
            "translated_text": translated_text,
            "target_language": target_language
        }

    except HTTPException:
        raise

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Translation failed: {str(error)}"
        )
