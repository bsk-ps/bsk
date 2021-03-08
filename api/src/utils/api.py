from fastapi import HTTPException, File

from .generic import remove_whitespace as strip_whitespace
from .models import TranspositionKey


def validate_message_and_file(message: str, message_file: File):
    if not any((message, message_file)):
        raise HTTPException(
            status_code=400,
            detail="Message field or file has to be set",
        )
    if all((message, message_file)):
        raise HTTPException(
            status_code=400,
            detail="Message cannot be set twice"
        )


async def get_content(content: str, content_file: File, remove_whitespace: bool):
    content = (await content_file.read()).decode() if content_file else content

    if remove_whitespace:
        content = strip_whitespace(content)

    return content


def get_transposition_key(key):
    try:
        return TranspositionKey(key)
    except ValueError as e:
        raise HTTPException(400, detail=str(e))
