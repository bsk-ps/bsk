from src.transposition import railfence
from src.utils import remove_whitespace as rw


examples = [
    (
        rw("WE ARE DISCOVERED FLEE AT ONCE"),
        3,
        rw("WECRL TEERD SOEEF EAOCA IVDEN"),  # noqa: typos
     ),
    (
        rw("CRYPTOGRAPHY"),
        3,
        rw("CTARPORPYYGH"),  # noqa: typos
     ),
    (
        rw("A SLIGHTLY LONGER MESSAGE IS HIDDEN"),
        5,
        "AYEHSLLMSSILTORSIDIHNEAEDNGGGE",  # noqa: typos
    ),
    (
        rw("USING SUPPLIED KEY"),
        4,
        "UUDSSPEKIGPIENLY",  # noqa: typos
    ),
]


def test_cipher():
    for example in examples:
        message, key, result = example
        output = railfence.cipher(message, key)
        assert result == output


def test_cipher_k1():
    message = result = rw("ANY MESSAGE AT ALL")
    key = 1
    output = railfence.cipher(message, key)
    assert output == result


def test_decipher():
    for example in examples:
        message, key, result = example
        output = railfence.decipher(result, key)
        assert output == message


def test_composition():
    for example in examples:
        message, key, result = example
        ciphertext = railfence.cipher(message, key)
        deciphered = railfence.decipher(ciphertext, key)
        assert deciphered == message
