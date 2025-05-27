# 🎬 TransformVideoTranscript

A lightweight CLI tool to extract audio from a video file and generate a transcript using OpenAI's Whisper model.

## 📦 Features

- 🎧 Automatically extracts audio from a video file using `ffmpeg`
- 🧠 Uses OpenAI Whisper (`base`, `small`, etc.) to transcribe the audio
- 📝 Saves the transcript as a `.txt` file next to the original video
- 🧹 Cleans up temporary audio files after processing

## 🚀 Installation

### 1. Install Python 3.10+

We recommend using Python 3.10 or 3.11. You can install it via [Homebrew](https://brew.sh/) on macOS:

```bash
brew install python@3.10
echo 'alias python3="/opt/homebrew/bin/python3.10"' >> ~/.zshrc
echo 'alias pip3="/opt/homebrew/bin/pip3.10"' >> ~/.zshrc
source ~/.zshrc
```

### 2. Install ffmpeg

```bash
brew install ffmpeg
```

### 3. Install dependencies

```bash
pip3 install -r requirements.txt
```

### 4. Run the script

```bash
python video_to_transcript.py your_video.mp4
```

This will:
- Extract audio from `your_video.mp4`
- Generate a transcript using Whisper
- Save the result to `your_video_transcript.txt`

## 📄 Suggested `.gitignore`

```
venv/
__pycache__/
*.wav
*.txt
```