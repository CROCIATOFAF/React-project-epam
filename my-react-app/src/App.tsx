// import { AppState, Pokemon } from './types/index';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Search from './components/Search/Search';
// import Results from './components/Results/Results';
import NotFound from './pages/NotFound/NotFound';
import Pagination from './components/Pagination/Pagination';
import CardList from './components/CardList/CardList';
import DetailedCard from './components/DetailedCard/DetailedCard';
import { Pokemon } from './types/index';
import './App.css';

const ITEMS_PER_PAGE = 4;

const App: React.FC = () => {
  const [results, setResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCard, setSelectedCard] = useState<Pokemon | null>(null);
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
    setSelectedCard(card);
  };

  const handleCloseDetail = () => {
    setSelectedCard(null);
  };

  const throwError = () => {
    throw new Error('Simulated Error');
  };

  return (
    <Router>
      <div className="app-container">
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="top-section">
                    <Search onSearch={handleSearch} />
                    <button onClick={throwError} className="error-button">
                      Throw Error
                    </button>
                  </div>
                  <div className="bottom-section">
                    {loading ? (
                      <div className="loading-message">Loading...</div>
                    ) : (
                      <>
                        <CardList
                          items={results}
                          onCardClick={handleCardClick}
                        />
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                        />
                        {selectedCard && (
                          <DetailedCard
                            item={selectedCard}
                            onClose={handleCloseDetail}
                          />
                        )}
                      </>
                    )}
                  </div>
                </>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </Router>
  );
};

export default App;
