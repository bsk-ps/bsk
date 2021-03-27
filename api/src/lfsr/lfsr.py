""""
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
     yield lfsr.pop()
     sum=0


"""


def lfsr(seed: str, polynomial: tuple, n: int):
    lfsr = list(seed)
    cipher=[]
    sum=0

    for i in range(n):
     for i in range(len(lfsr)):
        if (i+1) in polynomial:
          sum += int(lfsr[i])
     if(sum% 2 ==0):
        lfsr.insert(0,'0')
     else:
        lfsr.insert(0,'1')
     cipher.append(lfsr.pop())
     sum=0
    return cipher


if __name__ == "__main__":
    print(lfsr("1011011",(8,7,6,1),50))




