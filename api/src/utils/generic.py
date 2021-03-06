def remove_whitespace(text: str):
    return ''.join(text.replace('\n', ' ').split(' '))
