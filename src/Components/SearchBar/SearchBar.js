import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      term: ''
    };

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleTermChange(event){
    const temp = event.target.value;
    this.setState({term: temp});
  }

  handleSearchClick(event){
    this.search(this.state.term);
  }

  search(term){
    this.props.onSearch(term);
  }
  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.handleSearchClick}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
