import React, { Component } from 'react';
import { ResultsProps } from '../types/index';
import './Results.css';

class Results extends Component<ResultsProps> {
  render() {
    const { items, loading } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="results-container">
        {items.map(item => (
          <div key={item.name} className="result-item">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            {/* <a href={item.url}>{item.url}</a> */}
          </div>
        ))}
      </div>
    );
  }
}

export default Results;
