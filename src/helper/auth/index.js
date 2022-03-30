var client_id = process.env.REACT_APP_CLIENT_ID;
var redirect_uri = 'http://localhost:3000/';

var state = "m-songs_Berdi";

localStorage.setItem("TOKEN", state);
var scope = 'user-read-private user-read-email';

var url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&state=' + encodeURIComponent(state);

export default url;