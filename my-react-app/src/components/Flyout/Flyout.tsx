import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  unselectAll,
  selectSelectedItems,
} from '../../redux/slices/itemsSlice';
import { saveAs } from 'file-saver';
import './Flyout.css';

const Flyout: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(selectSelectedItems);

  const handleDownload = () => {
    console.log('Selected Items:', selectedItems);

    const headers = ['Name', 'Description', 'URL', 'Image'];
    const rows = selectedItems.map(item => {
      console.log('Item:', item);
      const cleanedDescription = item.description
        .replace(/"/g, '""')
        .replace(/\n/g, ' ')
        .replace(/\f/g, ' ');
      return [
        item.name,
        `"${cleanedDescription}"`,
        item.url || '',
        item.image || '',
      ].join(',');
    });

    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    console.log('CSV Content:', csvContent);
    const encodedUri = encodeURI(csvContent);
    const itemLabel = selectedItems.length > 1 ? 'pokemons' : 'pokemon';
    saveAs(encodedUri, `${selectedItems.length}_${itemLabel}.csv`);
  };

  if (selectedItems.length === 0) return null;

  return (
    <div className="flyout">
      <p>
        {selectedItems.length}{' '}
        {selectedItems.length > 1 ? 'items are' : 'item is'} selected
      </p>
      <button onClick={() => dispatch(unselectAll())}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Flyout;
