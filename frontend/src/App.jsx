// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import InputForm from './components/InputForm.jsx';
import ResultsDisplay from './components/ResultsDisplay.jsx';
import GeminiInsights from './components/GeminiInsights.jsx'; // <-- Import new component
import { runSimulationAPI } from './services/api.js';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [insights, setInsights] = useState(''); // <-- State for AI insights

// This is the corrected function for App.jsx
  const handleSimulation = async (formData) => {
    setIsLoading(true);
    setResults(null);
    setInsights('');

    // The fix is here: we now correctly use formData
    const apiData = {
      ...formData,
      mean_return: formData.mean_return / 100,
      std_dev: formData.std_dev / 100,
    };

    try {
      // The API now returns an object with two keys
      const { simulationResults, aiInsights } = await runSimulationAPI(apiData);
      setResults(simulationResults);
      setInsights(aiInsights);
    } catch (error) {
      console.error("Simulation failed in App component:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header"><h1>Financial Future Simulator 🔮</h1></header>
      <main>
        <InputForm onSimulate={handleSimulation} isLoading={isLoading} />
        <div className="output-container">
          <ResultsDisplay results={results} />
          <GeminiInsights initialInsights={insights} simulationResults={results} />
        </div>
      </main>
    </div>
  );
}
export default App;