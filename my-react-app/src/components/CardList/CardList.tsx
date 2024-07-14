import React from 'react';
import Card from '../Card/Card';
import { Pokemon } from '../../types/index';
import './CardList.css';

interface CardListProps {
  items: Pokemon[];
  onCardClick: (item: Pokemon) => void;
}

const CardList: React.FC<CardListProps> = ({ items, onCardClick }) => (
  <div className="card-list">
    {items.length ? (
      items.map(item => (
        <Card key={item.name} item={item} onClick={() => onCardClick(item)} />
      ))
    ) : (
      <p>No cards available</p>
    )}
  </div>
);

export default CardList;
