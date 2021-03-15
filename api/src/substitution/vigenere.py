def key_gen(key: str, message_len: int) -> str:
    return key*(message_len//len(key)) + key[:message_len % len(key)]


def encode(message: str, key: str) -> str:
    cipher = []
    mod_key = key_gen(key, len(message))

    for i in range(len(message)):
        if message[i].isupper():
            offset = (ord(mod_key[i]) - ord('A'))
            x = ord('A') + (ord(message[i]) - ord('A') + offset) % 26
        else:
            offset = (ord(mod_key[i]) - ord('a'))
            x = ord('a') + (ord(message[i]) - ord('a') + offset) % 26
        cipher.append(chr(x))
    return "".join(cipher)


def decode(message: str, key: str) -> str:
    decipher = []
    mod_key = key_gen(key, len(message))
    for i in range(len(message)):
        if message[i].isupper():
            offset = (ord(mod_key[i]) + ord('A'))
            x = ord('A') + (ord(message[i]) + ord('A') - offset) % 26
        else:
            offset = (ord(mod_key[i]) + ord('a'))
            x = ord('a') + (ord(message[i]) + ord('a') - offset) % 26
        decipher.append(chr(x))
    return "".join(decipher)
