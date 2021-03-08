def cipher(
        message: str,
        key: int,
        /,
):
    """
    Encrypts message with railfence cipher using supplied key.
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
    cycle_length = cycle = key * 2 - 2
    output = ['']*len(ciphertext)
    position = 0
    for row in range(key):
        cursor = row
        while cursor < len(ciphertext):
            output[cursor] = ciphertext[position]
            position += 1
            cursor += cycle
            if not cycle_length == cycle:
                cycle = cycle_length - cycle
        cycle = cycle_length if cycle_length == (row+1) * 2 else (cycle_length - (row+1)*2)
    return ''.join(output)
