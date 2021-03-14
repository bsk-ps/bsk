from typing import Optional

from os import getenv

from fastapi import (
    FastAPI,
    Form,
    File,
    UploadFile,
    HTTPException,
    APIRouter,
)
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

from .transposition import columnar, railfence, row_order, caesar
from .utils.api import (
    validate_message_and_file,
    get_content,
    get_transposition_key,
)
from .utils import word_to_key

app = FastAPI(
    title="BSK Cryptography API",
)

allowed_origins = getenv(
    "ALLOWED_ORIGINS",
    "http://localhost https://localhost "
    "http://localhost:3000 https://localhost:3000 "
    "http://localhost:8080 https://localhost:8080"
).split(' ')

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

router = APIRouter(prefix="/bsk-api")


@app.get("/", include_in_schema=False)
@router.get("/", include_in_schema=False)
def redirect_docs():
    return RedirectResponse("/docs")


@router.post("/railfence/cipher")
async def railfence_cipher(
        message: Optional[str] = Form(None),
        message_file: Optional[UploadFile] = File(None),
        key: int = Form(...),
):
    validate_message_and_file(message, message_file)
    content = await get_content(message, message_file, False)

    return '\n'.join(railfence.cipher(line, key) for line in content)


@router.post("/railfence/decipher")
async def railfence_decipher(
        ciphertext: Optional[str] = Form(None),
        ciphertext_file: Optional[UploadFile] = File(None),
        key: int = Form(...),
):
    validate_message_and_file(ciphertext, ciphertext_file)
    content = await get_content(ciphertext, ciphertext_file, False)

    return '\n'.join(railfence.decipher(line, key) for line in content)


@router.post("/row_order/cipher")
async def row_order_cipher(
        message: Optional[str] = Form(None),
        message_file: Optional[UploadFile] = File(None),
        key: str = Form(...),
        remove_whitespace: bool = Form(False),
):
    validate_message_and_file(message, message_file)
    content = await get_content(message, message_file, remove_whitespace)
    key = get_transposition_key(key)

    return '\n'.join(row_order.cipher(line, key) for line in content)


@router.post("/row_order/decipher")
async def row_order_decipher(
        ciphertext: Optional[str] = Form(None),
        ciphertext_file: Optional[UploadFile] = File(None),
        key: str = Form(...),
        remove_whitespace: bool = Form(False),
):
    validate_message_and_file(ciphertext, ciphertext_file)
    content = await get_content(ciphertext, ciphertext_file, remove_whitespace)
    key = get_transposition_key(key)

    try:
        return '\n'.join(row_order.decipher(line, key) for line in content)
    except ValueError as e:
        raise HTTPException(400, detail=str(e))


@router.post("/columnar_transposition/cipher")
async def columnar_transposition_cipher(
        message: Optional[str] = Form(None),
        message_file: Optional[UploadFile] = File(None),
        key: str = Form(...),
        remove_whitespace: bool = Form(False),
):
    validate_message_and_file(message, message_file)
    content = await get_content(message, message_file, remove_whitespace)
    key = word_to_key(key)

    try:
        return '\n'.join(columnar.cipher(line, key) for line in content)
    except AssertionError as e:
        raise HTTPException(400, detail=str(e))


@router.post("/columnar_transposition/decipher")
async def columnar_transposition_decipher(
        ciphertext: Optional[str] = Form(None),
        ciphertext_file: Optional[UploadFile] = File(None),
        key: str = Form(...),
        remove_whitespace: bool = Form(False),
):
    validate_message_and_file(ciphertext, ciphertext_file)
    content = await get_content(ciphertext, ciphertext_file, remove_whitespace)
    key = word_to_key(key)

    try:
        return '\n'.join(columnar.decipher(line, key) for line in content)
    except ValueError as e:
        raise HTTPException(400, detail=str(e))


@router.post("/caesar/cipher")
async def caesar_cipher(
        message: Optional[str] = Form(None),
        message_file: Optional[UploadFile] = File(None),
        key: int = Form(...),
    ):
    validate_message_and_file(message, message_file)
    content = await get_content(message, message_file, False)

    return '\n'.join(caesar.caesar(line, key, True) for line in content)


@router.post("/caesar/decipher")
async def caesar_decipher(
        message: Optional[str] = Form(None),
        message_file: Optional[UploadFile] = File(None),
        key: int = Form(...),
    ):
    validate_message_and_file(message, message_file)
    content = await get_content(message, message_file, False)

    return '\n'.join(caesar.caesar(line, key, False) for line in content)

app.include_router(router)
