from fastapi import HTTPException, File


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
