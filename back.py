from utils.read_write_json import read_json, write_json
from itertools import combinations
import numpy as np
import string

words = read_json('./word_list/words.json')

letters = [i for i in string.ascii_lowercase]

combos = list(combinations(letters, 3))
test = [0, 2, 3]


def make_array():
    arr = np.zeros((len(letters),len(words)))
    for idx1,c in enumerate(letters):
        for idx2,w in enumerate(words):
            if c in w:
                arr[idx1][idx2] = 1
    return arr

M = make_array()
F = (M[test][:]).sum(axis=0).flatten()
G = np.argwhere(F>2).flatten()
print(G)

