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


async def get_content(content: str, content_file: File, remove_whitespace: bool) -> list[str]:
    content = (await content_file.read()).decode() if content_file else content
    content.replace('\r\n', '\n')
    content.replace('\r', '\n')
    content = [line.strip() for line in content.split('\n')]

    if remove_whitespace:
        content = [strip_whitespace(line) for line in content]

    return content


def get_transposition_key(key):
    try:
        return TranspositionKey(key)
    except ValueError as e:
        raise HTTPException(400, detail=str(e))
