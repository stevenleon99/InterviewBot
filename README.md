## Interview robot based on ChatGPT
- ChatGPT acts as the interviewer / interviewee

- speech2text function based on Whisper API
```
# you can create test audio track via:
https://online-voice-recorder.com/
```
![transcribed text display](img/image.png)

- text2speech function
```
# you can transform text to speech via:
https://elevenlabs.io/
```

- ChatGPT uses chat history stored in your DB (MongDB or Json)


## project environment setup and test

- create file .env (get from https://platform.openai.com/)
```
OPEN_AI_ORG=
OPEN_AI_KEY=
```

- GUI ([fastAPI](c:/Users/Steve/AppData/Local/Microsoft/Windows/INetCache/IE/JLD6YHZX/N8928GYB))
```
# start/reload the main file
uvicorn main:app --reload
# or 
http://127.0.0.1:8000/docs#/
```
