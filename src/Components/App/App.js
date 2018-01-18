import React, { Component } from 'react';
import './App.css';

import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import Playlist from './Playlist/Playlist';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {name: 'A', artist: 'ArtistA', album: 'AlbumA'},
        {name: 'B', artist: 'ArtistA', album: 'AlbumA'},
        {name: 'A2', artist: 'ArtistA', album: 'AlbumA2'},
        {name: 'B2', artist: 'ArtistA', album: 'AlbumA2'}
      ],
      playListName: 'My Playlist',
      playlistTracks: [
        {name: 'B', artist: 'ArtistA', album: 'AlbumA'},
        {name: 'A2', artist: 'ArtistA', album: 'AlbumA2'},
      ]
    };

    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track){
    if(track.id !== this.state.playlistTracks){
      this.state.playlistTracks = this.state.playlistTracks.push(track);
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <!-- Add a SearchBar component -->
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playListName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
