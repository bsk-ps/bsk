from typing import Optional

from os import getenv
from random import choices

from fastapi import (
    FastAPI,
    Form,
    File,
    UploadFile,
    HTTPException,
    APIRouter,
)
from fastapi.responses import RedirectResponse, Response
from fastapi.middleware.cors import CORSMiddleware

from .transposition import columnar, railfence, row_order, disrupted
from .substitution import caesar, vigenere
from .lfsr import stream_cipher, LFSR
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


@router.post("/disrupted_transposition/cipher")
async def disrupted_transposition_cipher(
        message: Optional[str] = Form(None),
        message_file: Optional[UploadFile] = File(None),
        key: str = Form(...),
        remove_whitespace: bool = Form(False),
):
    validate_message_and_file(message, message_file)
    content = await get_content(message, message_file, remove_whitespace)
    key = word_to_key(key)

    return '\n'.join(disrupted.cipher(line, key) for line in content)


@router.post("/disrupted_transposition/decipher")
async def disrupted_transposition_decipher(
        ciphertext: Optional[str] = Form(None),
        ciphertext_file: Optional[UploadFile] = File(None),
        key: str = Form(...),
        remove_whitespace: bool = Form(False),
):
    validate_message_and_file(ciphertext, ciphertext_file)
    content = await get_content(ciphertext, ciphertext_file, remove_whitespace)
    key = word_to_key(key)

    return '\n'.join(disrupted.decipher(line, key) for line in content)


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


@router.post("/vigenere/cipher")
async def vigenere_cipher(
        message: Optional[str] = Form(None),
        message_file: Optional[UploadFile] = File(None),
        key: str = Form(...),
):
    validate_message_and_file(message, message_file)
    content = await get_content(message, message_file, False)

    return '\n'.join(vigenere.encode(line, key) for line in content)


@router.post("/vigenere/decipher")
async def vigenere_decipher(
        message: Optional[str] = Form(None),
        message_file: Optional[UploadFile] = File(None),
        key: str = Form(...),
):
    validate_message_and_file(message, message_file)
    content = await get_content(message, message_file, False)

    return '\n'.join(vigenere.decode(line, key) for line in content)


@router.post("/lfsr/generate")
async def lfsr_generate_key(
        seed: Optional[int] = Form(None),
        polynomial: str = Form(...),
        n: int = Form(...),
):
    try:
        polynomial = list(set(map(int, polynomial.split(' '))))
        degree = max(polynomial) + 1
        if seed is None:
            seed = choices([0, 1], k=degree)
        else:
            seed = list(map(int, list(bin(seed)[2:])))
        seed = seed + [0] * (degree - len(seed))
    except (ValueError, TypeError):
        raise HTTPException(
            status_code=400,
            detail="Invalid seed or polynomial"
        )

    lfsr = LFSR(seed, polynomial)
    result_hex = bytes(lfsr.generate_n_bytes(n)).hex()
    hex_iter = iter(result_hex)
    return ' '.join(a+b for a, b in zip(hex_iter, hex_iter))


@router.post("/lfsr/decipher", summary="Lfsr Stream Decipher")
@router.post("/lfsr/cipher")
async def lfsr_stream_cipher(
        message_file: Optional[UploadFile] = File(None),
        key: str = Form(...),
):
    return Response(
        content=stream_cipher.encrypt(
            (await message_file.read()),
            bytes.fromhex(key.replace(' ', '')),
        ),
        media_type='application/octet-stream'
    )


app.include_router(router)
