import React, {useState} from 'react'
import axios from 'axios'
import './styles/App.scss'
import ParticleBackground from "./ParticleBackground";
// import './App.css'

function App() {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState([]);
    const [transforming, setTransforming] = useState(false);

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleUpload = async () => {
        if (!files.length) return alert("Please select at least one file to execute. ");
        const formData = new FormData();

        for (let file of files){
            formData.append('files', file);
        }
        
        try {
            setUploading(true);
            setProgress(0);
            setTransforming(true);

            const res = await axios.post('/upload', formData, {
                headers:{'Content-Type': 'multipart/form-data'},
                onUploadProgress: (e) => {
                const percent = Math.round((e.loaded * 100) / e.total);
                setProgress(percent);
                }
            });

            console.log('Upload result: ', res.data);
            setUploading(false);
            setProgress(100);
            setTransforming(false);
            setResults(res.data);
        }catch (err) {
            console.error(err);
            setUploading(false);
            setTransforming(false);
        }    
    }
    return (
        <>
            <ParticleBackground />
            <div className='app'>
                <h1 className='title'> Video to Transcript </h1>
                <p className='paragraph'>Upload videos to get the Transcript!</p>
                <div className='input-submit'>
                    <input className='upload-file' type="file" multiple onChange={handleFileChange} />
                    <button className="submit-button" onClick={handleUpload} disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Submit'}
                    </button>
                </div>

                {uploading && <p className='paragraph-2'> Progress: {progress}%</p>}
                {transforming && <p className='paragraph-2'> Transforming video to transcript... </p>}
                <div className='results'>
                    {results.map((r, i) => (
                    <div key={i} className='result'>
                        <h3 className='header-3'>transcript preview: {r.filename}</h3>
                        <pre className='transcript-pre'>{r.transcript.slice(0, 150)}{r.transcript.length > 100 ? '...' : ''}</pre>
                        <a className='paragraph-2' href={r.download_url} download>Download Transcript</a>
                    </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default App
