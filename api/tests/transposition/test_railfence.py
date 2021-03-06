from src.transposition import railfence
from src.utils import remove_whitespace


examples = [
    (
        remove_whitespace("WE ARE DISCOVERED FLEE AT ONCE"),
        3,
        remove_whitespace("WECRL TEERD SOEEF EAOCA IVDEN"),  # noqa: typos
     ),
    (
        remove_whitespace("CRYPTOGRAPHY"),
        3,
        remove_whitespace("CTARPORPYYGH"),  # noqa: typos
     ),

]


def test_cipher():
    for example in examples:
        message, key, result = example
        output = railfence.cipher(message, key)
        assert result == output


def test_cipher_k1():
    message = result = remove_whitespace("ANY MESSAGE AT ALL")
    key = 1
    output = railfence.cipher(message, key)
    assert output == result


def test_composition():
    for example in examples:
        message, key, result = example
        ciphertext = railfence.cipher(message, key)
        deciphered = railfence.decipher(ciphertext, key)
        assert deciphered == message
