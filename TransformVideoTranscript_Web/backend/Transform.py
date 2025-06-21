import uuid
import subprocess
import os
# import sys
import whisper

# folder consts
UPLOAD_FOLDER = "uploads"
AUDIO_FOLDER = "audio"
MODEL_NAME = "tiny" #based on Graphics Card (GPU)  for M2 Macbook, it runs on the CPU since Apple GPUs aren't directly supported by Pytorch yet

_model_instance = None

def get_model():
    global _model_instance
    if _model_instance is None:
        print("🔁 Lazy-loading Whisper model...")
        _model_instance = whisper.load_model(MODEL_NAME)
    return _model_instance

def extract_audio(video_path, audio_path="temp_audio.wav"):
    # print("🎧 extracting audio...") extract audio from video, and store with .wav, return to audio folder
    audio_filename = f"{uuid.uuid4().hex}.wav" #use uuid4 to avoid duplicare file name conflicts
    audio_path = os.path.join(AUDIO_FOLDER, audio_filename)

    command = [
        "ffmpeg",
        "-i", video_path,
        "-vn",                # no video
        "-acodec", "pcm_s16le",  # WAV format
        "-ar", "16000",          # 16kHz
        "-ac", "1",              # mono
        audio_path
    ]
    subprocess.run(command, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return audio_path

def transcribe_audio(audio_path) -> str:
    #print("🧠 Loading Whisper and generating transcript...") 
    #use Whisper to transform audio and return txt
    result = get_model().transcribe(audio_path)
    return result["text"]
