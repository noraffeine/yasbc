import pandas as pd
from utils.read_write_json import write_json, read_json

data = pd.read_csv('./word_list/en_50k.txt', sep=" ", header=None)
as_list = list(data[:][0])
words = list(read_json('./word_list/more_words.json').keys())
a_b = read_json('./word_list/american_to_british_spelling.json')

intersect = list(set(as_list).intersection(words))

def apply_convert(a_b,l):
    for idx,w in enumerate(l):
        if w in list(a_b.keys()):
            l[idx] = a_b[w]
    return list(set(l))

out = apply_convert(a_b, intersect)
write_json(f'./word_list/words_{len(out)}.json', intersect)