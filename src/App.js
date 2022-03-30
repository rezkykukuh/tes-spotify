import './App.css';
import Index from './components/index/Index';
import data from './components/data/data';
import Spotify from './containers/spotify';
function App() {
  
  console.log(data.uri)

  return (
    <div>
      <Spotify/>
      </div>

  )
}

export default App;
