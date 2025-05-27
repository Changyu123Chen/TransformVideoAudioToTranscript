import subprocess
import os
import sys
import whisper

def extract_audio(video_path, audio_path="temp_audio.wav"):
    print("🎧 extracting audio...")
    command = [
        "ffmpeg",
        "-i", video_path,
        "-vn",                # no video
        "-acodec", "pcm_s16le",  # WAV format
        "-ar", "16000",          # freq
        "-ac", "1",              # mono
        audio_path
    ]
    subprocess.run(command, check=True)
    return audio_path

def transcribe_audio(audio_path, model_size="small"):
    print("🧠 Loading Whisper and generating transcript...")
    model = whisper.load_model(model_size)
    result = model.transcribe(audio_path)
    return result["text"]

def main():
    if len(sys.argv) < 2:
        print("❗how to use: python video_to_transcript.py <video file path>")
        return

    video_path = sys.argv[1]
    audio_path = "temp_audio.wav"
    output_text_file = os.path.splitext(video_path)[0] + "_transcript.txt"

    try:
        extract_audio(video_path, audio_path)
        transcript = transcribe_audio(audio_path)
        
        with open(output_text_file, "w", encoding="utf-8") as f:
            f.write(transcript)

        print(f"✅ success！output file: {output_text_file}")
    finally:
        if os.path.exists(audio_path):
            os.remove(audio_path)
            print("🧹 clean temporary audio file。")

if __name__ == "__main__":
    main()