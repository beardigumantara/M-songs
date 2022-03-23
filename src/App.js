
import './App.css';
import data from './data';


function App() {
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
            <img
              className="img-icon"
              src={data.album.images[1].url}
              alt=""
            />
            <h3>Title : {data.name}</h3>
            <p>Artists : {data.artists[0].name}</p>
            <p>Albums : {data.album.name}</p>
            <button class="button2" type="submit">Nothing</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const spotify_secret_key = process.env.REACT_APP_SPOTIFY_KEY;
export default App;
