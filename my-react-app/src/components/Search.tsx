// import { SearchProps, SearchState } from '../types/index';
import { SearchProps } from '../types/index';
import React, { useState, useEffect } from 'react';
import usePersistedState from '../hooks/usePersistedState';
import './Search.css';

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return localStorage.getItem('searchTerm') || '';
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    onSearch(trimmedTerm);
    if (trimmedTerm) {
      localStorage.setItem('searchTerm', trimmedTerm);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        className="search-input"
        placeholder="Search Pokémon"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default Search;
