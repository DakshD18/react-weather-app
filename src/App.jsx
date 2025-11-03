import React, { useState } from 'react';
import WeatherForm from './WeatherForm';

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

    try {
      const response = await fetch(
        `${API_BASE_URL}?q=${searchCity}&appid=${import.meta.env.VITE_APP_API_KEY}&units=metric`
      );

    // Error handling for 404 (City not found)
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`City "${searchCity}" not found. Please try again.`);
        }
        throw new Error('Failed to fetch weather data.');
      }

      const data = await response.json();
      setWeatherData(data); // Store data
      setCity(''); // Clear input field

    } catch (err) {
      setError(err.message);
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