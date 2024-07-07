import React, { Component } from 'react';
import { ResultsProps } from '../types/index';
import './Results.css';

class Results extends Component<ResultsProps> {
  render() {
    const { items, loading, hasError } = this.props;

    if (hasError) {
      throw new Error('Test error');
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="results-container">
        {items.map(item => (
          <div key={item.name} className="result-item">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Results;
