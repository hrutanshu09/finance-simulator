# backend/simulation_engine.py

import numpy as np

def run_simulation(config):
    """
    Runs a Monte Carlo simulation for financial planning.

    Args:
        config (dict): A dictionary containing simulation parameters.
            - initial_value (float): The starting value of the portfolio.
            - annual_contribution (float): The amount added to the portfolio each year.
            - years_to_simulate (int): The number of years to simulate.
            - goal_amount (float): The target portfolio value.
            - mean_return (float): The expected average annual return (e.g., 0.08 for 8%).
            - std_dev (float): The standard deviation of annual returns (volatility).
            - num_simulations (int): The number of simulation runs to perform.

    Returns:
        dict: A dictionary containing the results of the simulation.
    """
    # Unpack configuration for clarity
    initial_value = config.get('initial_value', 0)
    annual_contribution = config.get('annual_contribution', 0)
    years_to_simulate = config.get('years_to_simulate', 1)
    goal_amount = config.get('goal_amount', 0)
    mean_return = config.get('mean_return', 0.0)
    std_dev = config.get('std_dev', 0.0)
    num_simulations = config.get('num_simulations', 1000)

    # This list will store the final value of each simulation run
    final_portfolio_values = []

    for i in range(num_simulations):
        # Start each simulation with the initial portfolio value
        current_portfolio_value = initial_value

        # Simulate year by year
        for year in range(years_to_simulate):
            # Generate a random return for this year based on mean and standard deviation
            yearly_return = np.random.normal(mean_return, std_dev)

            # Update the portfolio value with the return and the annual contribution
            current_portfolio_value = current_portfolio_value * (1 + yearly_return) + annual_contribution

        # Store the final value for this simulation run
        final_portfolio_values.append(current_portfolio_value)

    # --- Analyze the results of all simulations ---

    median_outcome = np.median(final_portfolio_values)
    percentile_10 = np.percentile(final_portfolio_values, 10) # Worst 10% case
    percentile_90 = np.percentile(final_portfolio_values, 90) # Best 10% case

    # Calculate the probability of reaching the financial goal
    successful_simulations = [value for value in final_portfolio_values if value >= goal_amount]
    probability_of_success = len(successful_simulations) / num_simulations

    # Return the results in a structured dictionary
    return {
        "median_outcome": median_outcome,
        "percentile_10": percentile_10,
        "percentile_90": percentile_90,
        "probability_of_success": probability_of_success,
        "all_results": final_portfolio_values # For charting later
    }


# --- Test Block ---
# This part only runs when you execute this file directly (python simulation_engine.py)
# It allows us to test our engine without needing the Flask server.
if __name__ == '__main__':
    # Define a sample scenario
    test_config = {
        "initial_value": 2500000,          # ₹25 Lakh
        "annual_contribution": 600000,   # ₹50k/month
        "years_to_simulate": 20,
        "goal_amount": 50000000,         # ₹5 Crore
        "mean_return": 0.12,             # 12% average annual return
        "std_dev": 0.15,                 # 15% volatility
        "num_simulations": 5000
    }

    # Run the simulation with the test data
    results = run_simulation(test_config)

    # Print the results to the console
    print("--- Simulation Results ---")
    print(f"Median Portfolio Value after 20 years: ₹{results['median_outcome']:,.2f}")
    print(f"Worst 10% Case: ₹{results['percentile_10']:,.2f}")
    print(f"Best 10% Case: ₹{results['percentile_90']:,.2f}")
    print(f"Probability of reaching ₹5 Crore: {results['probability_of_success']:.2%}")