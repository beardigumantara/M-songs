import ButtonTrack from './components/button-props/index';
import './App.css';
import data from './data';
import TrackMusic from './components/track/index';
import axios from "axios";
import url from './helper/auth';
import {useEffect, useState} from "react";

function App() {
  const [token, setToken] = useState("");
  const [searchSong, setSearchSong] = useState("");
  const [songData, setSongData] = useState([]);
  const [selectedSong, setSelectedSong ] = useState ([]);
  
  useEffect(() => {
    const queryString = new URL(window.location.href.replace('#', '?')).searchParams;
    const accessToken = queryString.get('access_token');
    setToken(accessToken);
  }, []);

  const getSong = async () => {
    await axios
      .get(`https://api.spotify.com/v1/search?q=${searchSong}&type=track&access_token=${token}`)
      .then((response) =>{
        setSongData(response.data.tracks.items);
      })
      .catch((err) =>{
        console.log(err)
      });
  };

  const handleSelectedSong = (uri) => {
    const alreadySelected = selectedSong.find(s => s === uri);
    if (alreadySelected) {
      setSelectedSong(selectedSong.filter(s => s === uri))
    } else {
      setSelectedSong([...selectedSong, uri])
    }
    console.log(selectedSong)
  }

  const renderSong = songData.map((music) => 
    <TrackMusic 
      key={music.id}
      images={music.album.images[1].url}
      title={music.name}
      artist={music.artists[0].name}
      album={music.album.name}
      onSelectSong={handleSelectedSong}
    />

  )

  return (
    <div className="App">
      <div className="main">
        <header>
          <div className="navbar">
          <h1>Create Playlist</h1>
          <a href={url}>login</a>
          </div>
        </header>
      </div>
      <main>
        <div className="search-bar">
          <input type="search" onChange={(e) =>setSearchSong(e.target.value)}/>
          <button type="button" onClick={getSong}>search</button>
        </div>
        <div className="music-desc">
          <div className="container">
            <div className="music">
              {renderSong}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
