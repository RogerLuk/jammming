const clientId = '0f355ce21c5143a4854e3167ed4888a6';
const redirectURL = 'http://localhost:3000/';
const spotifyURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURL}`;
let accessToken = undefined;
let expiresIn = undefined;

const headers = {Authorization: `Bearer ${accessToken}`};

const Spotify = {
  getAccessToken(){
    if(accessToken){
      return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpirationTime = window.location.href.match(/expires_in=([^&]*)/);

    if(urlAccessToken && urlExpirationTime){
      accessToken = urlAccessToken;
      expiresIn = urlExpirationTime;
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
    }else{
      window.location = spotifyURL;
    }
  },

  search(term){
    const searchURL = `https://api.spotify.com/v1/search?type=track&q=${term.replace(' ', '%20')}`;

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

    Spotify.getAccessToken();
    const userIdUrl = 'https://api.spotify.com/v1/me';
    let userId = undefined;
    let playlistId = undefined;
    fetch(userIdUrl, {headers:headers})
    .then(response => response.json())
    .then(jsonResponse => userId = jsonResponse.id)
    .then(() => {
      const PlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
      fetch(PlaylistUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({name: playlistName})
      })
      .then(response => response.json())
      .then(jsonResponse => playlistId = jsonResponse.id)
      .then(() => {
          const addPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;
          fetch(addPlaylistUrl, {
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
