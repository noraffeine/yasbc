import json

def write_json(filepath, data):
    with open(filepath, 'w') as f:
        json.dump(data, f, allow_nan=True)

def read_json(filepath):
    with open(filepath, 'r') as f:
        return json.load(f)    
