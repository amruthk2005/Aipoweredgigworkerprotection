/**
 * Weather Monitoring Service for Parametric Triggers
 */

const getWeatherData = async () => {
    // Phase 1 Mock: Replace with real OpenWeather API + AQI in Phase 2
    return {
      rain: Math.floor(Math.random() * 80),   // Current rainfall in mm
      temp: 32 + (Math.random() * 12),       // Ambient temperature in Celsius
      aqi: 50 + (Math.random() * 300)        // Air Quality Index (AQI)
    };
  };
  
module.exports = { getWeatherData };
