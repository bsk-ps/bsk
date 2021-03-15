def caesar(message: str, key: int, encrypt: bool, /, ) -> str:
    """
    Encrypts or decrypts message with supplied key using caesar cipher,
    depending on `encrypt` value.
    """
    output = ""

    for i in range(len(message)):
        char = message[i]
        expression = (ord(char) + key) if encrypt else (ord(char) - key)
        if char.isupper():
            output += chr((expression - 65) % 26 + 65)
        else:
            output += chr((expression - 97) % 26 + 97)
    return output
