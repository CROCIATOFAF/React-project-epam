// src/components/DetailedCard.tsx
import React from 'react';
import { Pokemon } from '../../types/index';
import './DetailedCard.css';

interface DetailedCardProps {
  item: Pokemon;
  onClose: () => void;
}

const DetailedCard: React.FC<DetailedCardProps> = ({ item, onClose }) => (
  <div className="detailed-card">
    <button className="close-button" onClick={onClose}>
      Close
    </button>
    <h2>{item.name}</h2>
    <p>{item.description}</p>
  </div>
);

export default DetailedCard;
