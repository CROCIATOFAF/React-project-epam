import React, { Component } from 'react';
import { SearchProps, SearchState } from '../types/index';
import './Search.css';

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    const savedTerm = localStorage.getItem('searchTerm') || '';
    this.state = { searchTerm: savedTerm };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    const trimmedTerm = searchTerm.trim();
    this.props.onSearch(trimmedTerm);
    if (trimmedTerm) {
      localStorage.setItem('searchTerm', trimmedTerm);
    }
  };

  render() {
    return (
      <div className="search-container">
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          className="search-input"
          placeholder="Search Pokémon"
        />
        <button onClick={this.handleSearch} className="search-button">
          Search
        </button>
      </div>
    );
  }
}

export default Search;
