def remove_whitespace(text: str):
    return ''.join(text.replace('\n', ' ').split(' '))


def zero_base_key(key: list[int]) -> list[int]:
    return [word-1 for word in key]
