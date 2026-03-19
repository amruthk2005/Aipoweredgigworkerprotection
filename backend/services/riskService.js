/**
 * AI-Driven Risk Assessment Logic
 * Dynamically adjusts weekly premiums based on hyperlocal risk factors.
 */

const calculateRisk = (weather) => {
    let risk = 10;
  
    if (weather.rain > 50) risk += 30;
    if (weather.temp > 40) risk += 25;
    if (weather.aqi > 300) risk += 20;
  
    return Math.min(risk, 100);
  };
  
const calculatePremium = (riskScore) => {
    const baseWeeklyPremium = 20; // Base rate in ₹
    return baseWeeklyPremium + (riskScore * 0.5);
};
  
module.exports = { calculateRisk, calculatePremium };
