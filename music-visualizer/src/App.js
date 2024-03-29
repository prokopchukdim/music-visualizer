import './App.css';
import axios from 'axios';
import CircleContainer from './CircleContainer';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import FileField from './FileField';
import PlayController from './PlayController';
import React, { useEffect } from 'react';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SearchMenu from './SearchMenu';
import {ErrorContextProvider} from './ErrorHandler';
import ErrorOverlay from './ErrorOverlay';

function App() {
  const [soundFileURL, setSoundFileURL] = React.useState('');//React.useState(process.env.PUBLIC_URL + "test.mp3");
  const [soundFile, setSoundFile] = React.useState('');
  const [isUploaded, setUploaded] = React.useState(false);
  const [toPlay, setToPlay] = React.useState(false);
  const [audio] = React.useState(new Audio());
  const [analyserNode, setAnalyserNode] = React.useState(null);
  const [NUM] = React.useState(256);
  const [timeVal, setTimeVal] = React.useState(audio.currentTime);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchIconSize, setsearchIconSize] = React.useState(window.innerWidth <= 600 ? 30 : 45);
  const [songs, setSongs] = React.useState([]);

  const updateSongsFromServer = () => {
    axios.get(process.env.REACT_APP_API_ROOT + "getMusicFiles/").then(res => {
      setSongs(res.data);
    });
  }
 
  const handleResize = () => {
    if (window.innerWidth <= 600) {
      setsearchIconSize(30);
    }
    else{
      setsearchIconSize(45);
    }
}

  const onUpload = (file) => {
    // console.log("A file was uploaded");
    setUploaded(true);
    setSoundFileURL(URL.createObjectURL(file));
    setSoundFile(file);
    setToPlay(false);
  };

  const handleAudioEnded = () => {
    setToPlay(false);
  };

  const customSetToPlay = () => {
    if (soundFileURL === ''){
      return null;
    }
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

  useEffect( () => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect( () => {
    updateSongsFromServer();

  }, []);

  audio.addEventListener('timeupdate', (e) => {
    setTimeVal(audio.currentTime);
  });

  const changeTime = (newTime) => {
    audio.currentTime = newTime;
    setTimeVal(newTime);
  }

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  }

  return (
    <ErrorContextProvider>
      <div className="App">
        <ErrorOverlay></ErrorOverlay>
        <div className='search-bar'>
            <ManageSearchIcon className = 'search-menu-icon' onClick = {handleSearchClick} sx = {{fontSize:searchIconSize}} style = {{color: searchOpen ? '#37123C' : '#DDA77B', transition: 'all 0.3s ease-in-out'}}></ManageSearchIcon>
        </div>
        <SearchMenu iconSize = {searchIconSize} searchOpen = {searchOpen} songs = {songs} onUpload={onUpload} updateSongsFromServer={updateSongsFromServer} soundFile={soundFile}></SearchMenu>
        <header className="app-wrapper">
          <div className='wrapper'>
            <FileField onUpload={onUpload} isUploaded={isUploaded} setUploaded={setUploaded}/>
            <ReactP5Wrapper sketch={CircleContainer} toPlay = {toPlay} aNode={analyserNode} NUM = {NUM}/>  
          </div>
          <div className = "slider-container">
            <input type = "range" className = "slider" min="0" max={ isNaN(audio.duration) ? 0 : audio.duration * 1000} value = {timeVal * 1000} onChange={(e) => changeTime(e.target.value / 1000)}/>
          </div>
          {/* <div className='range'></div> */}
          <PlayController toPlay = {toPlay} togglePlay = {customSetToPlay} isUploaded = {isUploaded}></PlayController>
        </header>
      </div>
    </ErrorContextProvider>
  );
}

export default App;
