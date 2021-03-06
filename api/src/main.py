from typing import Optional

from fastapi import (
    FastAPI,
    Form,
    File,
    UploadFile,
    HTTPException
)

from .transposition import columnar
from .utils import validate_message_and_file

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/columnar_transposition/cipher")
async def columnar_transposition_cipher(
        message: Optional[str] = Form(None),
        message_file: Optional[UploadFile] = File(None),
        key: str = Form(...),
):
    validate_message_and_file(message, message_file)
    content = (await message_file.read()).decode() if message_file else message

    try:
        return columnar.cipher(content, key)
    except AssertionError as e:
        raise HTTPException(400, detail=str(e))


@app.post("/columnar_transposition/decipher")
async def columnar_transposition_decipher(
        ciphertext: Optional[str] = Form(None),
        ciphertext_file: Optional[UploadFile] = File(None),
        key: str = Form(...),
):
    validate_message_and_file(ciphertext, ciphertext_file)
    content = (await ciphertext_file.read()).decode() if ciphertext_file else ciphertext

    try:
        return columnar.decipher(content, key)
    except (AssertionError, ValueError) as e:
        raise HTTPException(400, detail=str(e))
