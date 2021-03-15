from src.transposition import disrupted
from src.utils import remove_whitespace as rw, word_to_key

examples = [
    (
        rw("HERE IS A SECRET MESSAGE ENCIPHERED BY TRANSPOSITION"),
        word_to_key("CONVENIENCE"),
        rw("HEESPNI RR SSEES EIY A SCBT EMGEPN ANDI CT RTAHSO IEERO"),
    ),
    (
        rw("WE ARE DISCOVERED FLEE AT ONCE"),
        word_to_key("ZEBRAS"),
        rw("EE ASRLC EIOEFN REEE A WDCVDTO"),
    ),
    (
        rw("SECURITY OF COMPUTER NETWORKS"),
        word_to_key("BSK"),
        rw("SERTYCMPENEOKS UFTW CIOOURTR"),
    )
]


def test_cipher():
    for example in examples:
        message, key, result = example
        output = disrupted.cipher(message, key)
        assert output == result


def test_disrupted_k1():
    message = result = rw("ANY MESSAGE AT ALL")
    key = [0]
    output = disrupted.cipher(message, key)
    assert output == result


def test_decipher():
    for example in examples:
        ciphertext, key, result = example
        output = disrupted.decipher(result, key)
        assert output == ciphertext


def test_composition():
    for example in examples:
        message, key, result = example
        ciphertext = disrupted.cipher(message, key)
        deciphered = disrupted.decipher(ciphertext, key)
        assert deciphered == message
