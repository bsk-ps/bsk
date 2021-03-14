
def key_gen(message: str, key: list) -> list:
    if (len(message) == len(key)):
        return key
    elif (len(message) > len(key)):
        for i in range(len(message) - len(key)):
            key.append(key[i % len(key)])
        return key
    else:
        # key is too long
        return 0;

def encode(message: str, key:str) -> str:
    cipher=[]
    mod_key = key_gen(message, list(key))

    for i in range (len(message)):
        if(message[i].isupper()):
            offset = (ord(mod_key[i]) - ord('A'))
            x = ord('A') + (ord(message[i]) - ord('A') + offset) % 26
        else:

          offset = (ord(mod_key[i]) - ord('a'))
          x = ord('a') + (ord(message[i]) - ord('a') + offset) %26
        cipher.append(chr(x))
    return("".join(cipher))


def decode(message: str, key: str) -> str:
    decipher = []
    mod_key = key_gen(message, list(key))
    for i in range(len(message)):
        if(message[i].isupper()):
            offset = (ord(mod_key[i]) + ord('A'))
            x = ord('A') + (ord(message[i]) + ord('A') - offset) % 26
        else:
            offset = (ord(mod_key[i]) + ord('a'))
            x = ord('a') + (ord(message[i]) + ord('a') - offset) % 26
        decipher.append(chr(x))
    return ("".join(decipher))


if __name__ == "__main__":
    print(encode("szymon", "fsda"))
    print(decode("xrbmtf", "fsda"))