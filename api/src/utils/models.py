from typing import Union

import re

from .generic import zero_base_key


validation_regex: re.Pattern = re.compile(r"^\d+(?:-\d+)*$")


class TranspositionKey(list[int]):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        super().__init__(self.validate(self))

    @classmethod
    def validate(cls, v: Union[list[Union[int, str]], str]):
        if isinstance(v, list):
            if all(isinstance(value, int) for value in v):
                v = '-'.join(map(str, v))
            elif all(isinstance(value, str) for value in v):
                v = ''.join(v)
        if not isinstance(v, str):
            raise TypeError("String required")
        if not validation_regex.fullmatch(v):
            raise ValueError("Invalid key format")
        key = list(map(int, v.split('-')))
        if not all(value in key for value in range(len(key))):
            key = zero_base_key(key)
        if not all(value in key for value in range(len(key))):
            raise ValueError("Key is malformed")
        return key


def word_to_key(word: str) -> TranspositionKey:
    word = word.lower()
    ordered_letters = sorted(list(word))
    counter = dict(zip(list(word), [0 for _ in range(len(word))]))
    output = [0 for _ in range(len(word))]
    for i in range(len(word)):
        output[i] = ordered_letters.index(word[i]) + counter[word[i]]
        counter[word[i]] += 1

    return TranspositionKey(output)
