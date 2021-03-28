from .lfsr import lfsr


def encrypt(seed: str, text: str, polynomial: tuple):
    cipher = []
    sum_ = 0
    stream = lfsr(seed, polynomial, len(text))
    for i in range(len(stream)):
        sum_ += int(stream[i]) + int(text[i])
        if sum_ % 2 == 0:
            cipher.append('0')
        else:
            cipher.append('1')
        sum_ = 0
    return ''.join(cipher)
