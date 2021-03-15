from substitution import caesar

examples = [
    (
        "CRYPTOGRAPHY",
        3,
        "FUBSWRJUDSKB",  # noqa: typos
    ),
]


def test_cipher():
    for example in examples:
        message, key, result = example
        output = caesar.caesar(message, key, True)
        assert output == result


def test_decipher():
    for example in examples:
        ciphertext, key, result = example
        output = caesar.caesar(result, key, False)
        assert output == ciphertext
