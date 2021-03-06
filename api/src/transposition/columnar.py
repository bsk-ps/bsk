from typing import Optional, Union

from random import choice
from string import ascii_letters, ascii_lowercase, ascii_uppercase


def cipher(
        message: str,
        key: Union[list[int], str],
        *,
        zero_based: bool = False,
        pad_message: bool = True,
        uppercase_padding: Optional[bool] = None,
        group_separator: str = ''
) -> str:
    """
    Encrypts ciphertext with supplied key using the columnar transposition cipher

    If key is not zero-based (default, controlled by `zero_based` parameter) then
    it has to contain all natural numbers lower than k+1 where k is length of key.

    If key is zero-based than it has to contain all non-negative integers lower than k.

    If `pad_message` parameter is set to True (default) then the ciphertext will be padded so that
    its length is a multiple of k.

    If `uppercase_padding` parameter is omitted or None, padding will be in random case,
    if True it will be uppercase, if False, it will be lowercase.
    """
    if isinstance(key, str):
        key = word_to_key(key)

    validate_key(key, zero_based)

    if not zero_based:
        key = zero_base_key(key)

    full_rows = len(message)//len(key)
    requires_padding = full_rows != len(key)*len(message) and not len(key) == 1
    groups = []

    for column in range(len(key)):
        groups.append('')
        column_position = key.index(column)

        for row in range(full_rows):
            groups[column] += message[column_position + row*len(key)]

        if column_position < (len(message) % len(key)):
            groups[column] += message[column_position + full_rows*len(key)]
        elif pad_message and requires_padding:
            if uppercase_padding is None:
                groups[column] += choice(ascii_letters)
            else:
                groups[column] += choice(ascii_uppercase if uppercase_padding else ascii_lowercase)

    return group_separator.join(groups)


def decipher(
        ciphertext: str,
        key: Union[list[int], str],
        *,
        zero_based: bool = False
) -> str:
    """
    Decrypts ciphertext encrypted by columnar transposition cipher using supplied key.

    IMPORTANT: We assume that the text is padded so that length of ciphertext is a multiple of key length

    Refer to :func:`cipher<ColumnarTransposition.cipher>` documentation for key requirements.
    """
    if isinstance(key, str):
        key = word_to_key(key)

    validate_key(key, zero_based)

    if not zero_based:
        key = zero_base_key(key)

    if len(ciphertext) % len(key):
        raise ValueError("Unpadded ciphertext not supported")

    full_columns = len(ciphertext) // len(key)
    output = [list(' '*len(key)) for _ in range(full_columns)]

    for i, column in enumerate(key):
        for row in range(full_columns):
            output[row][i] = ciphertext[row + full_columns*column]

    return ''.join([''.join(row) for row in output])


def validate_key(key: list[int], zero_based: bool = False) -> None:
    assert all([index + (0 if zero_based else 1) in key for index in range(len(key))]), "Key is invalid"


def zero_base_key(key: list[int]) -> list[int]:
    return [word-1 for word in key]


def word_to_key(word: str) -> list[int]:
    word = word.lower()
    ordered_letters = sorted(list(word))
    counter = dict(zip(list(word), [0 for _ in range(len(word))]))
    output = [0 for _ in range(len(word))]
    for i in range(len(word)):
        output[i] = ordered_letters.index(word[i]) + counter[word[i]]
        counter[word[i]] += 1

    return output
