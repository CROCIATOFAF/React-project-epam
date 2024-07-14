import React from 'react';
import { Pokemon } from '../../types/index';
import './Card.css';

interface CardProps {
  item: Pokemon;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ item, onClick }) => (
  <div className="card" onClick={onClick}>
    <img src={item.image} alt={item.name} className="card-image" />
    <div className="card-info__container">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
    </div>
  </div>
);

export default Card;
