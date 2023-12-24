import json

def save_personInfo(messages):
  file = "../db/personinfo.json"
  with open(file, 'w') as f:
    json.dump(messages, f)