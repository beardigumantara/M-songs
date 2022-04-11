import './App.css';
import LoginPage from './components/Pages/login';
import CreatePlaylistPage from './components/Pages/CreatePlaylist';
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link, 
  Redirect
} from 'react-router-dom'

function App() {
  const isLogin = useSelector(state => state.token.isLogin)

  return (
    <>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
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
