import React from 'react';

// This component takes the necessary state and function setters as props
function WeatherForm({ city, setCity, fetchWeather }) {

  // Handler for when the user types in the input field
  const handleInputChange = (e) => {
    // Updates the 'city' state in App.jsx every time a key is pressed
    setCity(e.target.value); 
  };

  // Handler for when the user submits the form
  const handleSubmit = (e) => {
    e.preventDefault(); // Crucial: Prevents the page from reloading
    if (city.trim()) {
      fetchWeather(city.trim()); // Call the function from App.jsx with the current city value
    }
  };

  return (
    <form onSubmit={handleSubmit} className="weather-form">
      <input
        type="text"
        placeholder="Enter city name..."
        value={city} // ⬅️ The input is 'controlled' by the state
        onChange={handleInputChange} // ⬅️ The state is updated on every change
        aria-label="City Name"
      />
      <button type="submit">Get Weather</button>
    </form>
  );
}

export default WeatherForm;