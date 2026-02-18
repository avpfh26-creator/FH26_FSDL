// Real scenario: Processing weather API data
const todaysWeather = {
  city: 'New York',
  temperature: 72,
  condition: 'Sunny'
};

const hourlyForecast = {
  morning: 68,
  afternoon: 75,
  evening: 70
};

// Spread operator to combine data
const completeWeather = {
  ...todaysWeather,
  forecast: { ...hourlyForecast },
  lastUpdated: new Date().toLocaleString()
};

// Rest operator to collect multiple cities
const displayForecast = (city, ...temperatures) => {
  const avgTemp = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
  console.log(`🌤️ Weather in ${city}:
  Today: ${todaysWeather.condition}
  Hourly temps: ${temperatures.join('°F, ')}°F
  Average: ${avgTemp.toFixed(1)}°F`);
};

console.log('Complete weather data:', completeWeather);
displayForecast('New York', 68, 72, 75, 70, 71);