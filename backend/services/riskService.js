/**
 * AI-Driven Risk Assessment & Dynamic Pricing Logic
 * Now utilizing the 'ML Intelligence' Service for predictive risk modeling.
 */

const { predictWeeklyRisk } = require("./mlService");

/**
 * Calculates current dynamic risk score of a worker using ML integration.
 */
const calculateRiskForWorker = (zone, driverHistory = { reliability: 0.9 }) => {
    // Phase 1 Mocking Predicted Weather (e.g., probability of a storm next week)
    const nextWeekForecast = {
      storm_probability: 0.85,  // Heavy monsoon forecast
      heatwave_index: 2,         // Moderate heat
    };
  
    // Run the ML predictive model
    const mlRiskScore = predictWeeklyRisk(zone, nextWeekForecast, driverHistory);
    return mlRiskScore;
  };

/**
 * Weekly Dynamic Premium Logic (matches the typical earnings cycle)
 */
const calculatePremium = (riskScore) => {
    const baseWeeklyPremium = 20; // Base rate in ₹ (SafeRide Gold standard)
    
    // Dynamic adjustment (Risk Score: 0-100)
    // Premium will range from approx ₹20 (Low Risk) to ₹60 (High Risk)
    const premium = baseWeeklyPremium + (riskScore * 0.4);
    
    return Math.max(Math.round(premium), 20);
};

module.exports = { calculateRiskForWorker, calculatePremium };
