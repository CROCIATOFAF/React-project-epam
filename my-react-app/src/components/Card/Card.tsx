import React from 'react';
import { Pokemon } from '../../types/index';
import './Card.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectItem,
  unselectItem,
  selectSelectedItems,
} from '../../redux/slices/itemsSlice';

interface CardProps {
  item: Pokemon;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ item, onClick }) => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(selectSelectedItems);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(selectItem(item));
    } else {
      dispatch(unselectItem(item.name));
    }
  };

  return (
    <div className="card" onClick={onClick}>
      <input
        className="checkbox"
        type="checkbox"
        checked={selectedItems.some(
          selectedItem => selectedItem.name === item.name,
        )}
        onChange={handleCheckboxChange}
        onClick={e => e.stopPropagation()}
      />
      <img src={item.image} alt={item.name} className="card-image" />
      <div className="card-info__container">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export default Card;
