def cipher(
        message: str,
        key: list[int],
        *,
        group_separator: str = ''
) -> str:
    """
    Encrypts message with supplied key using the columnar transposition cipher
    """
    full_rows = len(message)//len(key)
    requires_padding = full_rows != len(key)*len(message) and not len(key) == 1
    groups = []

    for column in range(len(key)):
        groups.append('')
        column_position = key.index(column)

        for row in range(full_rows):
            groups[column] += message[column_position + row*len(key)]

        if column_position < (len(message) % len(key)):
            groups[column] += message[column_position + full_rows*len(key)]
        elif requires_padding:
            groups[column] += '\ufffd'

    return group_separator.join(groups)


def decipher(
        ciphertext: str,
        key: list[int],
        /,
) -> str:
    """
    Decrypts ciphertext encrypted by columnar transposition cipher using supplied key.

    IMPORTANT: We assume that the text is padded so that length of ciphertext is a multiple of key length
    """
    if len(ciphertext) % len(key):
        raise ValueError("Ciphertext length must be multiple of key length!")

    full_columns = len(ciphertext) // len(key)
    output = [list(' '*len(key)) for _ in range(full_columns)]

    for i, column in enumerate(key):
        for row in range(full_columns):
            output[row][i] = ciphertext[row + full_columns*column]
    output = ''.join([''.join(row) for row in output])
    if (padding_index := output.find('\ufffd')) != -1:
        return output[:padding_index]
    return output
