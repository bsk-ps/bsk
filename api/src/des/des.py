from collections import deque
from textwrap import wrap

from .des_constants import (
    initial_permutation,
    final_permutation,
    permuted_choice,
    compression_permutation,
    expansion_permutation,
    substitution_boxes,
    select_permutation,
)


def permute(permuted: str, permutation_table: list[int]) -> str:
    return ''.join([permuted[permutation_index-1] for permutation_index in permutation_table])


def bytes_to_bin(arg: bytes) -> str:
    return ''.join(map(lambda a: bin(a)[2:].zfill(8), list(arg)))


def xor_blocks(a: str, b: str) -> str:
    return bin(int(a, 2) ^ int(b, 2))[2:].zfill(max(len(a), len(b)))


def select(right_subblock: str, subkey: str) -> str:
    expanded = permute(right_subblock, expansion_permutation)
    output = []
    for i, mini_block in enumerate(wrap(xor_blocks(expanded, subkey), 6)):
        row = int(mini_block[0] + mini_block[5], 2)
        column = int(mini_block[1:5], 2)
        output.append(bin(substitution_boxes[i][row][column])[2:].zfill(4))
    return permute(''.join(output), select_permutation)


def produce_subkeys(key: bytes) -> list[str]:
    key = permute(bytes_to_bin(key), permuted_choice)
    output = []
    left, right = deque(key[:28]), deque(key[28:])
    for i in range(16):
        rotation = -1 if i+1 in [1, 2, 9, 16] else -2
        left.rotate(rotation)
        right.rotate(rotation)
        subkey = permute(''.join(left + right), compression_permutation)
        output.append(subkey)
    return output


def cipher(
        block: bytes,
        subkeys: list[str],
) -> bytes:
    # apply initial permutation to the block
    initial = permute(bytes_to_bin(block), initial_permutation)
    # split output into left and right parts
    left, right = initial[:32], initial[32:]

    for i in range(16):
        left, right = right, xor_blocks(left, select(right, subkeys[i]))

    # apply inverse of initial permutation
    output = permute(right + left, final_permutation)

    return bytes.fromhex(hex(int(output, 2))[2:])
