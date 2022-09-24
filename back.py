from utils.read_write_json import read_json, write_json
import itertools
import string

words = read_json('./word_list/words.json')

letters = string.ascii_lowercase.split('')
print(letters)