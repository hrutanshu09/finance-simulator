// src/components/InputForm.jsx
import React, { useState } from 'react';

function InputForm({ onSimulate, isLoading }) {
  const [formData, setFormData] = useState({
    initial_value: 2500000,
    annual_contribution: 600000,
    years_to_simulate: 20,
    goal_amount: 50000000,
    mean_return: 12,
    std_dev: 15,
    num_simulations: 5000
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: Number(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSimulate(formData);
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      {/* Your input fields go here, they remain the same */}
      <div className="form-group"> <label>Initial Investment (₹)</label> <input type="number" name="initial_value" value={formData.initial_value} onChange={handleChange} /> </div>
      <div className="form-group"> <label>Annual Contribution (₹)</label> <input type="number" name="annual_contribution" value={formData.annual_contribution} onChange={handleChange} /> </div>
      <div className="form-group"> <label>Years to Simulate</label> <input type="number" name="years_to_simulate" value={formData.years_to_simulate} onChange={handleChange} /> </div>
      <div className="form-group"> <label>Goal Amount (₹)</label> <input type="number" name="goal_amount" value={formData.goal_amount} onChange={handleChange} /> </div>
      <hr />
      <div className="form-group"> <label>Expected Annual Return (%)</label> <input type="number" name="mean_return" value={formData.mean_return} onChange={handleChange} /> </div>
      <div className="form-group"> <label>Expected Volatility (Std. Dev. %)</label> <input type="number" name="std_dev" value={formData.std_dev} onChange={handleChange} /> </div>
      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? 'Simulating...' : 'Run Simulation'}
      </button>
    </form>
  );
}

export default InputForm;