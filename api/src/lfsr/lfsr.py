from collections.abc import Iterable

from collections import deque
from functools import reduce
from itertools import islice


class LFSR:
    _seed: deque[int]
    _polynomial: list[int]

    def __init__(self, seed: Iterable[int], polynomial: list[int]):
        self._seed = deque(seed)
        self._polynomial = polynomial
        self._polynomial_indexes = [index for index, value in enumerate(polynomial) if value]

    def generate(self):
        while True:
            new = sum([self._seed[i] for i in self._polynomial_indexes]) % 2
            self._seed.appendleft(new)
            yield self._seed.pop()

    def generate_n(self, n: int) -> list[int]:
        return list(islice(self.generate(), n))

    def generate_n_bytes(self, n: int) -> list[int]:
        """
        Returns a list of n unsigned byte-integers (integers with values between 0 and 255)
        """
        return [reduce(lambda byte, bit: byte << 1 | bit, self.generate_n(8)) for _ in range(n)]
