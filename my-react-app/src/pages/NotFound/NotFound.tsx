import React, { useEffect } from 'react';
import './NotFound.css';

const NotFound: React.FC = () => {
  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.classList.add('not-found-active');
    }
    return () => {
      if (rootElement) {
        rootElement.classList.remove('not-found-active');
      }
    };
  }, []);

  return (
    <div className="app-container">
      <h2 className="not-found">404 &pi;-kachu Not Found</h2>
    </div>
  );
};

export default NotFound;
