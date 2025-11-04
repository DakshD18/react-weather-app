import React, { useState } from 'react';
import WeatherForm from './WeatherForm';
import './App.css';

function App() {
  //state declaration
  const [city, setCity] = useState(''); // Stores the city the user types
  const [weatherData, setWeatherData] = useState(null); // Stores data fetched from the API
  const [error, setError] = useState(null); // Stores any API/network errors
  //API Key and base URL
  const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeather = async (searchCity) => {
    setError(null); // Clear previous errors
    setWeatherData(null); // Clear previous data

    // Debug: show whether the VITE API key is available (masked). Remove this after debugging.
    try {
      const _rawKey = import.meta.env.VITE_APP_API_KEY;
      if (_rawKey) {
        const masked = `${_rawKey.slice(0, 4)}...${_rawKey.slice(-4)}`;
        console.info('VITE_APP_API_KEY present (masked):', masked);
      } else {
        console.warn('VITE_APP_API_KEY is NOT present (import.meta.env.VITE_APP_API_KEY is falsy)');
      }
    } catch (e) {
      // In some test environments import.meta may not be available; catch to avoid crashing
      console.warn('Could not read import.meta.env for debugging:', e);
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}?q=${searchCity}&appid=${import.meta.env.VITE_APP_API_KEY}&units=metric`
      );

      // Better error handling: parse API error message when available
      if (!response.ok) {
        // Try to parse JSON error body from the API (OpenWeatherMap returns { message })
        let errBody = null;
        try {
          errBody = await response.json();
        } catch (e) {
          // ignore parse errors
        }

        const apiMessage = errBody && errBody.message ? errBody.message : response.statusText;

        if (response.status === 404) {
          throw new Error(`City "${searchCity}" not found. ${apiMessage}`);
        }
        if (response.status === 401) {
          throw new Error(`Invalid or missing API key. ${apiMessage}`);
        }

        throw new Error(`Failed to fetch weather data: ${apiMessage}`);
      }

      const data = await response.json();
      setWeatherData(data); // Store data
      setCity(''); // Clear input field

    } catch (err) {
      // Log to console for easier debugging in devtools
      // (user-facing message shown below)
      console.error('fetchWeather error:', err);
      setError(err.message || 'Failed to fetch weather data.');
    }
  };

  return (
    <div className="weather-container">
      <h1>Simple Weather Viewer</h1>
      
      {/* 1. Input Form component will go here */}
      <WeatherForm city={city} setCity={setCity} fetchWeather={fetchWeather} />
      
      {/* 2. Weather Card component will go here (Conditionally rendered) */}
      {weatherData && <WeatherCard data={weatherData} />}
      
      {/* 3. Error message (Conditional rendering) */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;