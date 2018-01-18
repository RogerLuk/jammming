import React from 'react';
import from './Track.css';

class Track extends React.Component {
  constructor(props){
    super(props);

    this.addTrack() = this.addTrack().bind(this);
  }

  addTrack(event){
    this.props.onAdd(this.props.track);
  }

  render() {
    return(
      <div class="Track">
        <div class="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a class="Track-action" onClick={this.addTrack}><!-- + or - will go here --></a>
      </div>
    );
  }
}

export default Track;
