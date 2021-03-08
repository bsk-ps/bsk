from src.transposition import columnar
from src.utils import remove_whitespace as rw, word_to_key

examples = [
    (
        rw("HERE IS A SECRET MESSAGE ENCIPHERED BY TRANSPOSITION"),
        word_to_key("CONVENIENCE"),
        rw("HECRN CEYI\ufffd ISEP\ufffd SGDI\ufffd RNTO\ufffd AAES\ufffd "  # noqa: typos
           "RMPN\ufffd SSRO\ufffd EEBT\ufffd ETIA\ufffd EEHS\ufffd"),  # noqa: typos
    ),
    (
        rw("WE ARE DISCOVERED FLEE AT ONCE"),
        word_to_key("ZEBRAS"),
        rw("EVLN\ufffd ACDT\ufffd ESEA\ufffd ROFO\ufffd DEEC\ufffd WIREE"),  # noqa: typos,
    ),
]


def test_cipher():
    for example in examples:
        message, key, result = example
        output = columnar.cipher(message, key)
        assert output == result


def test_columnar_k1():
    message = result = rw("ANY MESSAGE AT ALL")
    key = [0]
    output = columnar.cipher(message, key)
    assert output == result


def test_decipher():
    for example in examples:
        ciphertext, key, result = example
        output = columnar.decipher(result, key)[:len(ciphertext)]
        assert output == ciphertext


def test_composition():
    for example in examples:
        message, key, result = example
        ciphertext = columnar.cipher(message, key)
        deciphered = columnar.decipher(ciphertext, key)[:len(message)]
        assert deciphered == message


def test_word_to_key():
    output = word_to_key("CONVENIENCE")
    assert output == [val-1 for val in [1, 10, 7, 11, 3, 8, 6, 4, 9, 2, 5]]
