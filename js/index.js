// DOM Elements
const locationInput = document.getElementById('location-input');
const searchBtn = document.getElementById('search-btn');
const weatherData = document.getElementById('weather-data');

// Event Listener for Search Button
searchBtn.addEventListener('click', () => {
  const location = locationInput.value.trim();
  if (location) {
    fetchWeather(location);
  } else {
    alert('Please enter a location.');
  }
});

// Fetch Weather Data from Open-Meteo API
async function fetchWeather(location) {
  try {
    // Convert location to latitude and longitude (using a simple approach for demonstration)
    const [latitude, longitude] = location.split(',').map(coord => parseFloat(coord.trim()));

    if (isNaN(latitude) || isNaN(longitude)) {
      throw new Error('Invalid coordinates. Please enter latitude and longitude (e.g., 40.71,-74.01).');
    }

    // Fetch weather data from the API
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
    );

    // Check if the response is valid
    if (!response.ok) {
      throw new Error('Failed to fetch weather data. Please try again later.');
    }

    const data = await response.json();

    // Ensure current_weather exists and contains valid data
    if (!data.current_weather || typeof data.current_weather.temperature === 'undefined' || typeof data.current_weather.weathercode === 'undefined') {
      throw new Error('Weather data not available for the given location.');
    }

    // Display weather data
    const temperature = data.current_weather.temperature;
    const weatherCode = data.current_weather.weathercode;

    weatherData.innerHTML = `
      <p><strong>Location:</strong> ${latitude}, ${longitude}</p>
      <p><strong>Temperature:</strong> ${temperature}°C</p>
      <p><strong>Condition:</strong> ${getWeatherCondition(weatherCode)}</p>
    `;
  } catch (error) {
    weatherData.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

// Helper Function to Convert Weather Code to Condition
function getWeatherCondition(code) {
  const weatherConditions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  return weatherConditions[code] || 'Unknown';
}

