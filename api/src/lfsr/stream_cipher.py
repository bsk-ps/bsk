from typing import Union

from itertools import cycle


def encrypt(
        message: Union[bytes, list[int]],
        key: Union[bytes, list[int]]
) -> bytes:
    return bytes([message_byte ^ key_byte for message_byte, key_byte in zip(message, cycle(key))])


decrypt = encrypt
