from src.lfsr import lfsr

examples = [
    (
        "101100111",
        (8,7,6,1),
        40,
        "1110011011011111111010101110011100100110",
    ),
]


def test_generate():
    for example in examples:
        seed, polynomial, n, result = example
        output = lfsr.lfsr(seed,polynomial,n, True)
        assert output == result
