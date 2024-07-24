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
    const csvContent =
      'data:text/csv;charset=utf-8,' + selectedItems.join('\n');
    const encodedUri = encodeURI(csvContent);
    saveAs(encodedUri, `${selectedItems.length}_items.csv`);
  };

  if (selectedItems.length === 0) return null;

  return (
    <div className="flyout">
      <p>{selectedItems.length} items selected</p>
      <button onClick={() => dispatch(unselectAll())}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Flyout;
