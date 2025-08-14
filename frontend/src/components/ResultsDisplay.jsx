// src/components/ResultsDisplay.jsx
import React from 'react';

// A helper function to format numbers as Indian currency
const formatCurrency = (number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(number);
};

function ResultsDisplay({ results }) {
  // If there are no results yet, don't display anything
  if (!results) {
    return null;
  }

  return (
    <div className="results-container">
      <h2>Simulation Results</h2>
      <div className="results-grid">
        <div className="result-card">
          <h4>Median Outcome</h4>
          <p>{formatCurrency(results.median_outcome)}</p>
        </div>
        <div className="result-card">
          <h4>Probability of Success</h4>
          <p>{(results.probability_of_success * 100).toFixed(2)}%</p>
        </div>
        <div className="result-card">
          <h4>Worst 10% Case</h4>
          <p>{formatCurrency(results.percentile_10)}</p>
        </div>
        <div className="result-card">
          <h4>Best 10% Case</h4>
          <p>{formatCurrency(results.percentile_90)}</p>
        </div>
      </div>
    </div>
  );
}

export default ResultsDisplay;