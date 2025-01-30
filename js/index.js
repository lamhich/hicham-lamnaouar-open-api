// Fetch weather data from Open-Meteo API
fetch('https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current_weather=true')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Log the response to the console
    const weatherData = document.getElementById('weather-data');
    const temperature = data.current_weather.temperature;
    const weatherCode = data.current_weather.weathercode;

    // Display the data on the page
    weatherData.innerHTML = `
      <p>Temperature: ${temperature}°C</p>
      <p>Weather Condition: ${getWeatherCondition(weatherCode)}</p>
    `;
  })
  .catch(error => console.error('Error fetching data:', error));

  // Helper function to interpret weather codes
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
      99: 'Thunderstorm with heavy hail'
    };
    return weatherConditions[code] || 'Unknown weather condition';
  }
  