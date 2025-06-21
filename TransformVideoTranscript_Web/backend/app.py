from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from Transform import extract_audio, transcribe_audio

UPLOAD_FOLDER = "uploads"
TRANSCRIPT_FOLDER = "transcripts"
# create directies if !exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(TRANSCRIPT_FOLDER, exist_ok=True)

app = Flask(__name__)   #declare this is a flask app; create flask application instance; used to define routes
CORS(app)               #cross origin resource sharing, 

@app.route("/")
def home():
    return "Hello from Flask!"

@app.route("/upload", methods=["POST"])
def upload_files():
    print(">>> Received upload request")
    if "files" not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    files = request.files.getlist("files")
    if not files or files[0].filename == "":
        return jsonify({"error": "No selected files"}), 400
    results = []

    for file in files:
        filename = file.filename
        save_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(save_path)

        audio_path = extract_audio(save_path)
        text = transcribe_audio(audio_path)

        transcript_name = filename.rsplit(".", 1)[0] + ".txt"               #rigth split to get the file name without extension
        transcript_path = os.path.join(TRANSCRIPT_FOLDER, transcript_name)
        with open(transcript_path, "w") as f:
            f.write(text)
        results.append({
            "filename": filename,
            "transcript": text,
            "download_url": f"/download/{transcript_name}"
        })
    return jsonify(results)

@app.route("/download/<name>", methods=["GET"])      #default method: get
def download_file(name):
    return send_from_directory(TRANSCRIPT_FOLDER, name, as_attachment=True)

@app.route("/test", methods=["POST"])
def test_route():
    print(">>> Test route hit!")
    return jsonify({"message": "success"})
if __name__ == "__main__":
    app.run(debug=True, port=3001)