const clientId = '0f355ce21c5143a4854e3167ed4888a6';
const redirectUri = 'http://localhost:3000/';
const spotifyURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
let accessToken = undefined;
let expiresIn = undefined;



const Spotify = {
  getAccessToken(){
    if(accessToken){
      return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpirationTime = window.location.href.match(/expires_in=([^&]*)/);

    if(urlAccessToken && urlExpirationTime){
      accessToken = urlAccessToken[1];
      expiresIn = urlExpirationTime[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    }else{
      window.location = spotifyURL;
    }
  },

  search(term){
    const searchURL = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;
    const accessToken = Spotify.getAccessToken();

    return fetch(searchURL, {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => response.json())
    .then(jsonResponse => {
      if(!jsonResponse.tracks){
        return [];
      }
      return jsonResponse.tracks.items.map(track => {
        return{
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          url: track.uri
        };
      })
    });
  },

  savePlaylist(playlistName, trackURIs){
    if(!playlistName || !trackURIs || trackURIs.length === 0){
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};

    let userId = undefined;
    let playlistId = undefined;
    return fetch('https://api.spotify.com/v1/me', {headers:headers})
    .then(response => response.json())
    .then(jsonResponse => userId = jsonResponse.id)
    .then(() => {
      const PlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
      return fetch(PlaylistUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({name: playlistName})
      })
      .then(response => response.json())
      .then(jsonResponse => playlistId = jsonResponse.id)
      .then(() => {
          const addPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
          return fetch(addPlaylistUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              uris: trackURIs
            })
          });
        })
      })

  }

};

export default Spotify;
