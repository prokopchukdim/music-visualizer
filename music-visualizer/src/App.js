import logo from './logo.svg';
import './App.css';
import CircleContainer from './CircleContainer';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import FileField from './FileField';
import PlayController from './PlayController';
import React from 'react';



function App() {

  const [soundFileURL, setSoundFileURL] = React.useState(null);
  const [toPlay, setToPlay] = React.useState(false);

  const onUpload = (files) => {
    console.log("A file was uploaded");
    setSoundFileURL(URL.createObjectURL(files[0]));
  };

  const customSetToPlay = () => {
    setToPlay(!toPlay);
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div className='wrapper'>
          <FileField onUpload={onUpload}/>
          <ReactP5Wrapper sketch={CircleContainer} fileURL={soundFileURL} toPlay = {toPlay}/>  
        </div>
        <div className = "range"></div>
        <PlayController toPlay = {toPlay} togglePlay = {customSetToPlay}></PlayController>
      </header>
    </div>
  );
}

export default App;
