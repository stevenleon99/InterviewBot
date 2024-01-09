import os
import json
from utility.noise_reduce import reduceNoise, deleteAudios
import time

FILENAME = 'audio_reduce_noise.mp3'

def transcribe_auido(client):
    reduceNoise()
    audio_file = open(os.path.join("../voice", FILENAME), "rb")
    transcript = client.audio.transcriptions.create(
                    model="whisper-1", 
                    file=audio_file
                    )
    deleteAudios()
    return transcript


def get_chat_response(client, user_msg):
  messages = load_messages()
  # add new message at the end of history
  messages.append(user_msg)
  # get response from gpt
  response = client.chat.completions.create(
      model="gpt-3.5-turbo",
      messages=messages
    )
  '''
  ChatCompletion(id='chatcmpl-8Yh4aS5gPaVsZZX3VNzGbvl3oqelz', 
  choices=[Choice(finish_reason='stop', index=0, logprobs=None, 
            message=ChatCompletionMessage(content="Robotics is the field of study and development 
            that deals with creating intelligent machines, known as robots. These robots can perform 
            tasks autonomously or with human guidance. From household chores to exploring outer space, 
            robotics has endless possibilities! It's like bringing science fiction to life, but with lots of math.", role='assistant', function_call=None, tool_calls=None))], 
  created=1703279416, model='gpt-3.5-turbo-0613', object='chat.completion', system_fingerprint=None, usage=CompletionUsage(completion_tokens=60, prompt_tokens=62, total_tokens=122))
  '''
  ## test response
  # response = {"role": "assistant", "content": "Robotics is a subject to manipulate robot \
  #              and assist human on some repetitive task"}
  
  response_txt = {"role": "assistant", "content": response.choices[0].message.content}
  # save message to database
  messages.append(response_txt)
  save_message(messages)
  return messages
  
  
def load_messages():
  messages = []
  file = "../db/chathistory.json"
  empty = os.stat(file).st_size == 0
  
  # loop through history and add messages if not empty
  # add the context if empty
  if not empty:
    with open(file) as db:
      data = json.load(db)
      for item in data:
        messages.append(item)
  else:
    # change the context background if needed
    with open("../db/personinfo.json", "r") as info:
        personInfo = json.load(info)
    if personInfo:
      content = f"You are an experienced interviewee professional at {personInfo['jobdescription']}. You are applying for the position {personInfo['position']} from {personInfo['company']}. Answer the interview question from the user. Your name is Steve. The Interviewer is Sunny. Keep responses under 50 words and sometimes be funny."
      messages.append(
        {"role": "system", "content": content},
    )
    else:
      messages.append(
          {"role": "system", "content": "You are an experienced interviewee professional at computer science and robotics. Answer \
            the interview question from the user. Your name is Steve. The user is Sunny. Keep responses under 50 words and sometimes\
            be funny."},
    )
  return messages

def save_message(messages):
  file = "../db/chathistory.json"
  with open(file, 'w') as f:
    json.dump(messages, f)
    