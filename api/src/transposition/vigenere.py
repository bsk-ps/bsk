def key_gen(text, key):
    if (len(text) == len(key)):
        return key
    elif (len(text) > len(key)):
        for i in range(len(text) - len(key)):
            key.append(key[i % len(key)])
        return key
    else:
        # key is too long
        return 0;

def encode(text, key):
    cipher=[]
    mod_key = key_gen(text, list(key))

    for i in range (len(text)):
        offset = (ord(mod_key[i]) - ord('a'))
        x = ord('a') + (ord(text[i]) - ord('a') + offset) %26
        cipher.append(chr(x))
    return("".join(cipher))


def decode(text, key):
    decipher = []
    mod_key = key_gen(text, list(key))
    for i in range(len(text)):
        offset = (ord(mod_key[i]) + ord('a'))
        x = ord('a') + (ord(text[i]) + ord('a') - offset) % 26
        decipher.append(chr(x))
    return ("".join(decipher))

