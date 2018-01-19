import React, { Component } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My playlist',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    if(!this.state.playlistTracks.find(ctrack => ctrack.id === track.id)){
      let tempList = this.state.playlistTracks.concat(track);
      this.setState({
        playlistTracks: tempList
      });
    }
  }

  removeTrack(track){
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(cTrack => track.id !== cTrack.id)
    });
  }

  updatePlaylistName(name){
    this.setState({playListName: name});
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(track => track.url);
    Spotify.savePlaylist(this.state.playListName, trackURIs);
    this.setState({
      searchResults: []
    });
    this.updatePlaylistName('New Playlist');
    console.log('new playList name');
  }

  search(term){
    Spotify.search(term)
    .then(searchResult => this.setState({
      searchResults: searchResult
    }));
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            {console.log('Playlist track:')}
            {console.log(this.state.playlistTracks)}
            {console.log('End.')}
            <Playlist playlistName={this.state.playListName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
