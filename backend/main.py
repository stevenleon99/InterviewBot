from typing import Union
from fastapi import FastAPI, UploadFile
from dotenv import load_dotenv, dotenv_values
import os
import openai
from openai import OpenAI
import json
from utility.gpt_message import transcribe_auido, get_chat_response
from utility.frontPage_message import  save_personInfo
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# load the enviroment variable from .env
load_dotenv()
# print(dotenv_values(".env")) # ordered dict structure


client = OpenAI()

app = FastAPI()

origins = [
    "http://localhost:8000",  # React's default port
    # Add other origins if necessary
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

 
@app.get("/api")
async def root():
    return {"message": "Welcome to InterviewBot"}

# send the audio *name file to chatGPT
@app.post("/talk")
async def post_audio(file:UploadFile):
  user_msg = transcribe_auido(client, file)
  '''
  sample transcription: 
  Transcription(text='Our voice recorder is a convenient and simple 
  online tool that can be used right in your browser.')
  '''
  ## test user message
  # user_msg = {"role": "user", "content": "Please briefly introduce what is robotics?"}
  # chat_response = get_chat_response(user_msg)
  
  chat_response = get_chat_response(client, {"role": "user", "content": user_msg.text})
  
  return {"message": "chatGPT response received"}

# Pydantic model for registration data
class RegistrationData(BaseModel):
    position: str
    company: str
    jobdescription: str

@app.post("/api/register")
async def post_register(message:RegistrationData):
  message = {'position':message.position,
             'company':message.company,
             'jobdescription':message.jobdescription}
  
  '''
  position='Sr Verification Engineer' 
  company='Medtronic' 
  jobdescription='verify Medical Device functions and standard requirements.'
  '''
  save_personInfo(message)
  return {"message": "Person information saved"}