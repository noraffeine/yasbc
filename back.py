from sysconfig import get_path_names
from utils.read_write_json import read_json, write_json
from itertools import combinations
import numpy as np
import string
from collections import Counter

all_words = read_json('./word_list/words_38170.json')
words = [w for w in all_words if len(w)>3]

letters = [i for i in string.ascii_lowercase]
c_dict = dict(zip(letters, range(0,26)))

def convert(s):
    '''String of characters to list of indices e.g 'abd' to [0,1,3].'''
    return [c_dict[c] for c in s]

def numwords(words):
    '''Counts number of unique sets by number of distinct letters.'''
    sets = get_sets(words)
    lens = [len(list(w)) for w in sets]
    print(Counter(lens))

def get_sets(words):
    '''Get set of distinct characters in each word. Then return unique sets.'''
    sets = [set(w) for w in words]
    string_list = ["".join(sorted(w)) for w in sets]
    return list(set(string_list))

def make_array(letters, words):
    '''Make array with 1s where the letter is in the word, 0 everywhere else.'''
    arr = np.zeros((len(letters),len(words)))
    for idx1,c in enumerate(letters):
        for idx2,w in enumerate(words):
            if c in w:
                arr[idx1][idx2] = 1
    return arr

def get_words(M,combo):
    '''Returns list of words indices which have all the letters (by list of letter indices).'''
    F = (M[combo][:]).sum(axis=0).flatten()
    G = np.argwhere(~(F < len(combo))).flatten()
    return G

def get_map(M,combos):

    def g(c):
        c_i = convert(c)
        G = get_words(M,c_i)
        w = list(np.array(words)[G])
        return w

    d = {c: g(c) for c in combos}

    return d

def get_dict():
    M = make_array(letters, words)
    combos = get_sets(words)
    map = get_map(M,combos)
    #v = {k:v for k,v in map.items() if (len(v) >= 20 and len(v)<=75)}
    return map

def saves():
    games = get_dict()
    filtered_games = {k:v for k,v in games.items() if (len(v) >= 20 and len(v)<=75)}
    write_json('./games/all_games.json', games)
    write_json('./games/filtered_games.json', games)
    for i in range(3,10):
        n = {k:v for k,v in filtered_games.items() if len(k) == i}
        write_json(f'./games/{i}_letters.json', n)

saves()