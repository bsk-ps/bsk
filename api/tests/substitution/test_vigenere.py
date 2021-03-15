from substitution import vigenere

examples = [
    (
        "CRYPTOGRAPHY",
        "GHRTA",
        "IYPITUNITPNF",
     ),
]


def test_encode():
    for example in examples:
        message, key, result = example
        output = vigenere.encode(message, key)
        assert output == result


def test_decode():
    for example in examples:
        message, key, result = example
        output = vigenere.decode(result, key)
        assert output == message
