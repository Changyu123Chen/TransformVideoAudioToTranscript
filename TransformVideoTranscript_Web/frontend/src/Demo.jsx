import React, {useState} from "react";
import './styles/App.scss'

const Demo = () => {
  return (
    <div className='app'>
      <h1 className='title'>Demo video</h1>
      {/* <p className='paragraph'>Here is a demonstration of how the system works.</p> */}
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <video width="60%" controls>
          <source src="/demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <a
            className="github-link"
            href="https://github.com/Changyu123Chen/TransformVideoAudioToTranscript"
            target="_blank"
            rel="noopener noreferrer"
        >
            Click here to download the code and run it locally
        </a>        
      </div>
    </div>
  );
};

export default Demo;