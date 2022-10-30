import logo from './logo.svg';
import './App.css';
import CircleContainer from './CircleContainer';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import FileField from './FileField';

function App() {

  const onUpload = (files) => {
    console.log(files);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div className='wrapper'>
          <FileField onUpload={onUpload}/>
          <ReactP5Wrapper sketch={CircleContainer}/>  
        </div>
        <div className = "range"></div>
      </header>
    </div>
  );
}

export default App;
