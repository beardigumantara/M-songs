import ButtonTrack from './components/button-props/index';
import './App.css';
import data from './data';
import TrackMusic from './components/track/index';

function App() {

  const renderSong = data.map((music) => 
    <TrackMusic 
      images={music.album.images[1].url}
      title={music.name}
      artist={music.artists[0].name}
      album={music.album.name}
    />
  )

  return (
    <div className="App">
      <div className="main">
        <header>
          <h1>Create Playlist</h1>
        </header>
      </div>
      <div className="music-desc">
        <div className="container">
          <div className="music">
            {renderSong}
          </div>
        </div>
      </div>
    </div>
  );
}

const spotify_secret_key = process.env.REACT_APP_SPOTIFY_KEY;
export default App;
