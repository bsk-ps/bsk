def cipher(
        message: str,
        key: int,
        /,
):
    """
    Encrypts message using railfence cipher using supplied key.
    """
    if key == 1:
        return message
    cycle = key * 2 - 2
    output = ['' for _ in range(key)]
    for position in range(len(message)):
        output[key - 1 - abs(cycle//2 - position % cycle)] += message[position]
    return ''.join(output)


def decipher(
        ciphertext: str,
        key: int,
        /,
):
    """
    Decrypts railfence-encrypted ciphertext using supplied key.
    """
    if key == 1:
        return ciphertext
    cycle = key * 2 - 2
    output = list(' '*len(ciphertext))
    position = 0
    for y in range(key):
        for x in range(len(ciphertext)):
            if (y + x) % cycle == 0 or (y - x) % cycle == 0:
                output[x] = ciphertext[position]
                position += 1
    return ''.join(output)
