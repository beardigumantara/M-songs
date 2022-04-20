// eslint-disable-next-line no-undef
var client_id = process.env.REACT_APP_CLIENT_ID;
var redirect_uri = 'https://m-tify.vercel.app/';

var state = 'm-songs_Berdi';

localStorage.setItem('TOKEN', state);
var scope = 'playlist-modify-private';

var url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&state=' + encodeURIComponent(state);

export default url;