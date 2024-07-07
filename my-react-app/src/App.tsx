import React, { Component } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import ErrorBoundary from './components/ErrorBoundary';
import { AppState, Pokemon } from './types/index';
import './App.css';

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
      loading: false,
      hasError: false,
    };
  }

  componentDidMount() {
    const savedTerm = localStorage.getItem('searchTerm') || '';
    this.fetchData(savedTerm);
  }

  fetchData = async (term: string) => {
    this.setState({ loading: true });
    try {
      const results: Pokemon[] = [];
      if (term) {
        // Fetches specific Pokémon by name or ID
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${term.toLowerCase()}`,
        );
        if (response.ok) {
          const data = await response.json();
          const speciesResponse = await fetch(data.species.url);
          const speciesData = await speciesResponse.json();
          const description = speciesData.flavor_text_entries.find(
            (entry: { language: { name: string } }) =>
              entry.language.name === 'en',
          )?.flavor_text;
          results.push({
            name: data.name,
            url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
            description: description || 'No description available',
          });
        }
      } else {
        // Fetches a list of Pokémon
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`,
        );
        const data = await response.json();
        for (const item of data.results) {
          const pokeResponse = await fetch(item.url);
          const pokeData = await pokeResponse.json();
          const speciesResponse = await fetch(pokeData.species.url);
          const speciesData = await speciesResponse.json();
          const description = speciesData.flavor_text_entries.find(
            (entry: { language: { name: string } }) =>
              entry.language.name === 'en',
          )?.flavor_text;
          results.push({
            name: pokeData.name,
            url: `https://pokeapi.co/api/v2/pokemon/${pokeData.id}/`,
            description: description || 'No description available',
          });
        }
      }
      this.setState({ results, loading: false });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ loading: false });
    }
  };

  handleSearch = (term: string) => {
    this.setState({ searchTerm: term });
    this.fetchData(term);
  };

  throwError = () => {
    this.setState({ hasError: true });
  };

  render() {
    const { results, loading, hasError } = this.state;

    return (
      <div className="app-container">
        <div className="top-section">
          <Search onSearch={this.handleSearch} />
          <button onClick={this.throwError} className="error-button">
            Throw Error
          </button>
        </div>
        <div className="bottom-section">
          <ErrorBoundary>
            <Results items={results} loading={loading} hasError={hasError} />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default App;
