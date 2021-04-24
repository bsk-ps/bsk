from src.des import des


def test_composition():
    from random import randbytes
    block, key = randbytes(8), randbytes(8)
    subkeys = des.produce_subkeys(key)
    assert block == des.cipher(des.cipher(block, subkeys), subkeys[::-1])
