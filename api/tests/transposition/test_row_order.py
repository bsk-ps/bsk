from src.transposition import row_order
from src.utils.models import TranspositionKey

examples = [
    (
        "CRYPTOGRAPHYOSA",  # noqa: typos
        TranspositionKey("3-1-4-2"),
        "YCPRGTROHAYPAO\ufffdS",  # noqa: typos
    ),
]


def test_cipher():
    for example in examples:
        message, key, result = example
        output = row_order.cipher(message, key)
        assert output == result


def test_decipher():
    for example in examples:
        message, key, result = example
        output = row_order.decipher(result, key)
        assert output == message


def test_composition():
    for example in examples:
        message, key, result = example
        ciphertext = row_order.cipher(message, key)
        output = row_order.decipher(ciphertext, key)
        assert output == message
