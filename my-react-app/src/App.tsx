import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Search from './components/Search/Search';
import NotFound from './pages/NotFound/NotFound';
import Pagination from './components/Pagination/Pagination';
import CardList from './components/CardList/CardList';
import DetailedCard from './components/DetailedCard/DetailedCard';
import { Pokemon, PokemonDetails } from './types/index';
import './App.css';

const ITEMS_PER_PAGE = 4;

const App: React.FC = () => {
  const [results, setResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCard, setSelectedCard] = useState<PokemonDetails | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return localStorage.getItem('searchTerm') || '';
  });

  const fetchData = async (term: string, page: number) => {
    setLoading(true);
    try {
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const url = term
        ? `https://pokeapi.co/api/v2/pokemon/${term.toLowerCase()}`
        : `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`;

      const response = await fetch(url);
      const data = await response.json();

      if (term) {
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        const description = speciesData.flavor_text_entries.find(
          (entry: { language: { name: string } }) =>
            entry.language.name === 'en',
        )?.flavor_text;
        setResults([
          {
            name: data.name,
            url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
            description: description || 'No description available',
            image: data.sprites.front_default,
          },
        ]);
        setTotalPages(1);
      } else {
        const fetchedResults = await Promise.all(
          data.results.map(async (item: { url: string }) => {
            const pokeResponse = await fetch(item.url);
            const pokeData = await pokeResponse.json();
            const speciesResponse = await fetch(pokeData.species.url);
            const speciesData = await speciesResponse.json();
            const description = speciesData.flavor_text_entries.find(
              (entry: { language: { name: string } }) =>
                entry.language.name === 'en',
            )?.flavor_text;
            return {
              name: pokeData.name,
              url: `https://pokeapi.co/api/v2/pokemon/${pokeData.id}/`,
              description: description || 'No description available',
              image: pokeData.sprites.front_default,
            };
          }),
        );
        setResults(fetchedResults);
        setTotalPages(Math.ceil(data.count / ITEMS_PER_PAGE));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults([]);
    }
    setLoading(false);
  };

  const fetchDetailedData = async (name: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`,
      );
      const data = await response.json();
      const speciesResponse = await fetch(data.species.url);
      const speciesData = await speciesResponse.json();
      const description = speciesData.flavor_text_entries.find(
        (entry: { language: { name: string } }) => entry.language.name === 'en',
      )?.flavor_text;
      const detailedData: PokemonDetails = {
        name: data.name,
        image: data.sprites.front_default,
        description: description || 'No description available',
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map(
          (ability: { ability: { name: string } }) => ability.ability.name,
        ),
      };
      setSelectedCard(detailedData);
    } catch (error) {
      console.error('Error fetching detailed data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(searchTerm, currentPage);
  }, [searchTerm, currentPage]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
    localStorage.setItem('searchTerm', term);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCardClick = (card: Pokemon) => {
    const params = new URLSearchParams(window.location.search);
    params.set('details', card.name);
    window.history.pushState({}, '', `/?${params.toString()}`);
    fetchDetailedData(card.name);
  };

  const handleCloseDetail = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete('details');
    window.history.pushState({}, '', `/?${params.toString()}`);
    setSelectedCard(null);
  };

  const throwError = () => {
    throw new Error('Simulated Error');
  };

  return (
    <Router>
      <div className="app-container">
        <ErrorBoundary>
          <div className="top-section">
            <Search onSearch={handleSearch} />
            <button onClick={throwError} className="error-button">
              Throw Error
            </button>
          </div>
          <div className="bottom-section">
            <div className={`left-section ${selectedCard ? 'shrink' : ''}`}>
              {loading ? (
                <div className="loading-message">Loading...</div>
              ) : (
                <>
                  <CardList items={results} onCardClick={handleCardClick} />
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </div>
            {selectedCard && (
              <div className="right-section open">
                <DetailedCard item={selectedCard} onClose={handleCloseDetail} />
              </div>
            )}
          </div>
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </Router>
  );
};

export default App;
