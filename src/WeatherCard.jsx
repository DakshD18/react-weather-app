import React from 'react';

// The 'data' prop contains the full JSON object fetched from the API
function WeatherCard({ data }) {
  // Use Destructuring to easily access nested properties
  const { name, main, weather } = data;
  const description = weather[0].description;
  const iconCode = weather[0].icon; 

  // URL for the weather icon (OpenWeatherMap standard)
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="weather-card">
      <h2>{name}</h2> 
      
      {/* Display icon and description */}
      <div className="weather-details">
        <img src={iconUrl} alt={description} />
        <p className="description">{description}</p>
      </div>

      {/* Display temperature */}
      <p className="temperature">{Math.round(main.temp)}°C</p>
      
      {/* Display min/max */}
      <p className="min-max">
        Min: {Math.round(main.temp_min)}°C / Max: {Math.round(main.temp_max)}°C
      </p>
    </div>
  );
}

export default WeatherCard;