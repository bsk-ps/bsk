def cipher(
        message: str,
        key: list[int],
        /,
) -> str:
    cursor = 0
    matrix = []
    indices = [key.index(value) for value in range(len(key))]
    while cursor < len(message):
        for key_position in indices:
            matrix.append(message[cursor:cursor+key_position+1])
            cursor += key_position+1
    output = ['']*len(key)
    for row in matrix:
        for column, letter in enumerate(row):
            output[key[column]] += letter
    return ''.join(output)


def decipher(
        ciphertext: str,
        key: list[int],
        /,
) -> str:
    ciphertext = list(ciphertext)
    indices = [key.index(value) for value in range(len(key))]
    output = []
    remaining = len(ciphertext)
    row = 0
    while remaining:
        row_length = min(indices[row]+1, remaining)
        output.append(['']*row_length)
        remaining -= row_length
        row = (row + 1) % len(key)
    for key_value, column in list(zip(list(range(len(key))), indices)):
        for row in output:
            if len(row) > column and row[column] == '':
                row[column] = ciphertext.pop(0)
    return ''.join([''.join(row) for row in output])
