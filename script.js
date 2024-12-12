// Replace with your OpenWeatherMap API key
const apiKey = '71befe464930fb11038e971fccaccaaf'; 

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

// Add event listener for the search button
searchBtn.addEventListener('click', function() {
    const city = cityInput.value.trim();
    if (city !== '') {
        getWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

// Fetch weather data from the API based on city name
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        // Fetch the weather data from OpenWeatherMap API
        const response = await fetch(url);
        const data = await response.json();
        
        // If city is not found
        if (data.cod === '404') {
            weatherInfo.style.display = 'none'; // Hide weather info section
            alert('City not found. Please try again.');
        } else {
            // Display the weather info if the city is found
            weatherInfo.style.display = 'block'; // Show the weather info section
            cityName.textContent = `${data.name}, ${data.sys.country}`;
            temperature.textContent = `Temperature: ${data.main.temp}°C`;
            description.textContent = `Description: ${data.weather[0].description}`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        }
    } catch (error) {
        // Handle any errors with the API request
        weatherInfo.style.display = 'none'; // Hide weather info section
        alert('Error fetching weather data. Please try again.');
    }
}
