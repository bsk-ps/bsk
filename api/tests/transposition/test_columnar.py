from src.transposition import columnar
from src.utils import remove_whitespace

examples = [
    (
        "HERE IS A SECRET MESSAGE ENCIPHERED BY TRANSPOSITION",
        [1, 10, 7, 11, 3, 8, 6, 4, 9, 2, 5],
        "HECRN CEYI ISEP SGDI RNTO AAES RMPN SSRO EEBT ETIA EEHS",  # noqa: typos
    ),
    (
        "WE ARE DISCOVERED FLEE AT ONCE",
        [6, 3, 2, 4, 1, 5],
        "EVLN ACDT ESEA ROFO DEEC WIREE",  # noqa: typos,
    ),
]


def test_cipher():
    for example in examples:
        message = remove_whitespace(example[0])
        key = example[1]
        result = example[2]
        output = columnar.cipher(message, key, group_separator=' ', pad_message=False)
        assert output == result


def test_columnar_k1():
    message = result = remove_whitespace("ANY MESSAGE AT ALL")
    key = [1]
    output = columnar.cipher(message, key)
    assert output == result


examples_padded = [
    (
        "HERE IS A SECRET MESSAGE ENCIPHERED BY TRANSPOSITION",
        [1, 10, 7, 11, 3, 8, 6, 4, 9, 2, 5],
        "HECRN CEYIk ISEPc SGDIy RNTOp AAESd RMPNv SSROd EEBTx ETIAs EEHSi",  # noqa: typos
    ),
    (
        "WE ARE DISCOVERED FLEE AT ONCE",
        [6, 3, 2, 4, 1, 5],
        "EVLNc ACDTh ESEAq ROFOj DEECo WIREE",  # noqa: typos,
    )
]


def test_decipher():
    for example in examples_padded:
        ciphertext = remove_whitespace(example[0])
        key = example[1]
        result = remove_whitespace(example[2])
        output = columnar.decipher(result, key)[:len(ciphertext)]
        assert output == ciphertext


def test_composition():
    for example in examples_padded:
        message = remove_whitespace(example[0])
        key = example[1]
        ciphertext = columnar.cipher(message, key)
        deciphered = columnar.decipher(ciphertext, key)[:len(message)]
        assert deciphered == message


def test_word_to_key():
    output = columnar.word_to_key("CONVENIENCE")
    assert output == columnar.zero_base_key([1, 10, 7, 11, 3, 8, 6, 4, 9, 2, 5])
