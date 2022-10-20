import logo from './logo.svg';
import './App.css';
import CircleContainer from './CircleContainer';
import { ReactP5Wrapper } from 'react-p5-wrapper';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <ReactP5Wrapper sketch={CircleContainer}/>
        <div class = "circle"></div>
        <div class = "circle-hider"></div>
        <div class="range"></div>
      </header>
    </div>
  );
}

export default App;
