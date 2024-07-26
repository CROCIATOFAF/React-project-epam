import React from 'react';
import { PokemonDetails } from '../../types/index';
import './DetailedCard.css';

interface DetailedCardProps {
  item: PokemonDetails;
  onClose: () => void;
}

const DetailedCard: React.FC<DetailedCardProps> = ({ item, onClose }) => (
  <div className="detailed-card">
    <button className="close-button" onClick={onClose}>
      Close
    </button>
    <h2>{item.name}</h2>
    <img src={item.image} alt={item.name} className="detailed-card-image" />
    <p>{item.description}</p>
    <p>
      <strong>Height:</strong> {item.height}
    </p>
    <p>
      <strong>Weight:</strong> {item.weight}
    </p>
    <p>
      <strong>Abilities:</strong> {item.abilities.join(', ')}
    </p>
  </div>
);

export default DetailedCard;
