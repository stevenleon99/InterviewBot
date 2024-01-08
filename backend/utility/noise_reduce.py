import noisereduce as nr
from scipy.io import wavfile
import subprocess
import os

audio_path = "../voice/audio.webm"
output_audio_path = "../voice/audio.wav"
denoise_audio_path = "../voice/audio_reduce_noise.mp3"

def convert_webm_to_wav(input_file, output_file):
    subprocess.run(["ffmpeg", "-i", input_file, output_file])
    
def reduceNoise():
    convert_webm_to_wav(audio_path, output_audio_path)
    rate, data = wavfile.read(output_audio_path)
    reduced_noise = nr.reduce_noise(y=data, sr=rate)
    wavfile.write(denoise_audio_path, rate, reduced_noise)

def deleteAudios():
    os.unlink(output_audio_path)
    # os.unlink(denoise_audio_path)

if __name__ == "__main__":
    # reduceNoise()
    # print(os.getcwd())
    pass