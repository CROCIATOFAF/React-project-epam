import { FC } from 'react';
import { ResultsProps, Pokemon } from '../types/index';
import './Results.css';

const Results: FC<ResultsProps> = ({ items, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (items.length === 0) {
    return <div>No Pokémon found</div>;
  }

  return (
    <div className="results-container">
      {items.map((item: Pokemon) => (
        <div key={item.name} className="result-item">
          <h2>{item.name}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Results;
