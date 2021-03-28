def lfsr(seed: str, polynomial: tuple, n: int):
    seed = list(seed)
    cipher = []
    sum_ = 0

    for _ in range(n):
        for i in range(len(seed)):
            if (i + 1) in polynomial:
                sum_ += int(seed[i])
        if sum_ % 2 == 0:
            seed.insert(0, '0')
        else:
            seed.insert(0, '1')
        cipher.append(seed.pop())
        sum_ = 0
    return ''.join(cipher)
