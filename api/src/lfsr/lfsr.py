def lfsr(seed: str, polynomial: tuple, n: int):
    lfsr = list(seed)
    sum=0

    for i in range(n):
     for i in range(len(lfsr)):
        if (i+1) in polynomial:
          sum += int(lfsr[i])
     if(sum% 2 ==0):
        lfsr.insert(0,'0')
     else:
        lfsr.insert(0,'1')
     print(lfsr.pop())
     sum=0



lfsr('11001001', (8, 7, 6, 1), 17)

