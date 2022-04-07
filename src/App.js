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
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom'

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
              'Content-Type': 'application/json',
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

  const LoginPage = () => {
    return (
      <div className="login-page">
        <div className="login-content">
          <h1>Login To Spotify</h1>
          <a href={url}>
            <button>Login</button>
          </a>
        </div>
      </div>
    )
  }

  const CreatePlaylistPage = () => {
    return (
      <div className="main">
        <header>
          <div className="navbar">
            <div className="logo">
              <h1>M-Songs</h1>
            </div>
            <div className="login">
              {!isLogin ? (<a href={url}>Login</a>) : (<a href="http://localhost:3000/">Logout</a>)}
            </div>
          </div>
          <h1>Create Playlist</h1>
        </header>
        <main>
          <div className='playlist-contemt'>
          {/* {isLogin && (
            <>
            <CreatePlaylist accessToken={accToken} userId={user.id} uris={selectedSong}/>
            </>
          )} */}
          <CreatePlaylist
            accessToken={accToken}
            userId={user.id}
            uris={selectedSong}
          />
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

  return (
    <>
      <Router>
        <div>
          <nav>
            <ul>
              {/* <li>
                <Link to="/">Login</Link>
              </li> */}
              <li>
                <Link to="/create-playlist">Create Playlist</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/create-playlist">
              {isLogin ? <CreatePlaylistPage /> : <Redirect to="/" />}
            </Route>
            <Route path="/">
              <LoginPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
