def cipher(
        message: str,
        key: list[int],
        /,
):
    """
    Encrypts message using row transposition cipher using supplied key.
    """
    rows = len(message)//len(key) + (1 if len(message) % len(key) else 0)
    output = []
    for row in range(rows):
        output.append(['']*len(key))
        for i, key_value in enumerate(key):
            output[row][i] = message[len(key)*row + key_value] if len(key)*row + key_value < len(message) else '\ufffd'
        output[row] = ''.join(output[row])
    return ''.join(output)


def decipher(
        ciphertext: str,
        key: list[int],
        /,
):
    """
    Decrypts row transposition-encrypted ciphertext using supplied key.
    """
    if len(ciphertext) % len(key):
        raise ValueError("Ciphertext length must be multiple of key length!")
    rows = len(ciphertext) // len(key)
    output = []
    for row in range(rows):
        output.append(['']*len(key))
        for i, key_value in enumerate(key):
            output[row][key_value] = ciphertext[len(key)*row + i]
        output[row] = ''.join(output[row])
    output = ''.join(output)
    if (padding_index := output.find('\ufffd')) != -1:
        return output[:padding_index]
    return output
