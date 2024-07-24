import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { unselectAll } from '../../redux/slices/itemsSlice';
import { saveAs } from 'file-saver';
import './Flyout.css';

const Flyout: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(state => state.items.selectedItems);
  const items = useAppSelector(state => state.items.items);

  const downloadItems = () => {
    const selectedDetails = items.filter(item =>
      selectedItems.includes(item.name),
    );
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      selectedDetails
        .map(e => `${e.name},${e.description},${e.url}`)
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    saveAs(encodedUri, `${selectedItems.length}_items.csv`);
  };

  if (selectedItems.length === 0) return null;

  return (
    <div className="flyout">
      <p>{selectedItems.length} items selected</p>
      <button onClick={() => dispatch(unselectAll())}>Unselect all</button>
      <button onClick={downloadItems}>Download</button>
    </div>
  );
};

export default Flyout;
