import logo from './logo.svg';
import './App.css';
import CircleContainer from './CircleContainer';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import FileField from './FileField';
import React from 'react';

function App() {

  const [soundFileURL, setSoundFileURL] = React.useState(null);

  const onUpload = (files) => {
    console.log("A file was uploaded");
    setSoundFileURL(URL.createObjectURL(files[0]));
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div className='wrapper'>
          <FileField onUpload={onUpload}/>
          <ReactP5Wrapper sketch={CircleContainer} fileURL={soundFileURL}/>  
        </div>
        <div className = "range"></div>
      </header>
    </div>
  );
}

export default App;
