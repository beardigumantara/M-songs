import ButtonTrack from './components/button-props/index';
import './App.css';
import data from './data';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from './components/store/slice-token';
import TrackMusic from './components/track/index';
import axios from "axios";
import url from './helper/auth';
import {useEffect, useState} from "react";
import CreatePlaylist from './components/track/playlist';

function App() {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [accToken, setAccToken] = useState('') ;
  const [searchSong, setSearchSong] = useState('');
  const [songData, setSongData] = useState([]);
  const [selectedSong, setSelectedSong ] = useState ([]);
  const [combinedSong, setCombinedSong] = useState([]);
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const queryString = new URL(window.location.href.replace('#', '?')).searchParams;
    const accessToken = queryString.get('access_token');
    setAccToken(accessToken);
    if (accessToken !== null) {
      setAccToken(accessToken);
      setIsLogin(accessToken !== null);

      const setUserProfile = async () => {
        try {
          const requestOptions = {
            headers: {
              'Authorization': 'Bearer ' + accessToken,
              'Content-Type': 'appliaction/json',
            },
          };
          console.log(requestOptions);
          console.log(accessToken)

          const response = await fetch(`https://api.spotify.com/v1/me`, requestOptions).then(data => data.json());
          console.log(response);
          setUser(response);
        } catch(err) {
          alert(err)
        }
      }
      dispatch(setToken(accessToken));
      setUserProfile();
    }
  }, [dispatch]);

  const getSong = async () => {
    await axios
      .get(`https://api.spotify.com/v1/search?q=${searchSong}&type=track&access_token=${accToken}`)
      .then((response) => setSongData(response.data.tracks.items))
      .catch((err) =>{
        console.log(err);
      });
  };

  const handleSelectedSong = (uri) => {
    const alreadySelected = selectedSong.find(s => s === uri);
    if (alreadySelected) {
      setSelectedSong(selectedSong.filter(s => s !== uri))
    } else {
      setSelectedSong([...selectedSong, uri])
    }
    console.log(selectedSong);
  }

  useEffect(() => {
    const combinedSongWithSelectedSong = songData.map((song) => ({
      ...song,
      isSelected: selectedSong.find((s)  => s === song.uri) ? true : false,
    }));
    setCombinedSong(combinedSongWithSelectedSong);
    console.log(combinedSongWithSelectedSong)
  }, [selectedSong, songData]);

  const renderSong = combinedSong.map((music) => 
    <TrackMusic 
      key={music.id}
      images={music.album.images[1].url}
      title={music.name}
      artist={music.artists[0].name}
      album={music.album.name}
      onSelectSong={handleSelectedSong}
      uri={music.uri}
      isSelected={music.isSelected}
    />

  )

  return (
    <div className="App">
      <div className="main">
        <header>
          <div className="navbar">
          <h1>Create Playlist</h1>
          {!isLogin && (<a href={url}>Login</a>)}
          </div>
        </header>
      </div>
      <main>
        <div className='playlist-contemt'>
        {isLogin && (
          <>
          <CreatePlaylist accessToken={accToken} userId={user.id} uris={selectedSong}/>
          </>
        )}
        </div>
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
