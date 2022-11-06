import './App.css';
import CircleContainer from './CircleContainer';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import FileField from './FileField';
import PlayController from './PlayController';
import React, { useEffect } from 'react';



function App() {

  const [soundFileURL, setSoundFileURL] = React.useState(process.env.PUBLIC_URL + "test.mp3");
  const [toPlay, setToPlay] = React.useState(false);
  const [audio] = React.useState(new Audio());
  const [analyserNode, setAnalyserNode] = React.useState(null);
  const [NUM] = React.useState(256);

  const onUpload = (files) => {
    console.log("A file was uploaded");
    setSoundFileURL(URL.createObjectURL(files[0]));
  };

  const handleAudioEnded = () => {
    setToPlay(false);
  };

  const customSetToPlay = () => {
    if (!analyserNode){
      audio.addEventListener("ended", handleAudioEnded);

      const audioContext = new AudioContext();
      const audioSourceNode = audioContext.createMediaElementSource(audio);
      const aNode = audioContext.createAnalyser(); 
      audioSourceNode.connect(aNode);
      aNode.fftSize = NUM * 2;
      aNode.connect(audioContext.destination);
      setAnalyserNode(aNode);
    }
    setToPlay(!toPlay);
  }

  useEffect( () => {
    toPlay ? audio.play() : audio.pause();
  }, [audio, toPlay]);

  useEffect( () => {
    audio.src = soundFileURL;
  }, [audio, soundFileURL]);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div className='wrapper'>
          <FileField onUpload={onUpload}/>
          <ReactP5Wrapper sketch={CircleContainer} toPlay = {toPlay} aNode={analyserNode} NUM = {NUM}/>  
        </div>
        <div className = "slider-container">
          <input type = "range" className = "slider"/>
        </div>
        {/* <div className='range'></div> */}
        <PlayController toPlay = {toPlay} togglePlay = {customSetToPlay}></PlayController>
      </header>
    </div>
  );
}

export default App;
