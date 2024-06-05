const searchInput = document.querySelector('.search-input');
        const addBtn = document.querySelector('.add-btn');
        const weatherInfo = document.querySelector('.weather-info');

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }

        function Weather(img, city, temperature, description, humidity) {
            this.img = img;
            this.city = city;
            this.temperature = temperature;
            this.description = description;
            this.humidity = humidity;
        }

        async function showWeather(city) {
            if (!city) {
                alert("Please enter a city name.");
                return null;
            }
            const key = '5d4936eb93fd4cab1fbdb6742799ee9a';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}&units=metric`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('City not found');
                }
                const data = await response.json();
                return data;
            } catch (error) {
                alert(error.message);
                return null;
            }
        }

        function addDivWithWeatherParameters(data) {
            if (!data) return;
            const city = data.name;
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const humidity = data.main.humidity;
            const img = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            const weather = new Weather(img, city, temperature, description, humidity);
            const weatherDiv = document.createElement('div');
            weatherDiv.classList.add('weather-div');
            weatherDiv.innerHTML = `
                <img src="${weather.img}" alt="weather-icon">
                <h2>Weather in ${weather.city}</h2>
                <p>Temperature: ${weather.temperature} ℃</p>
                <p>Description: ${capitalizeFirstLetter(weather.description)}</p>
                <p>Humidity: ${weather.humidity}%</p>
                <button class="delete-btn">Delete</button>
            `;

            const deleteBtn = weatherDiv.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                weatherInfo.removeChild(weatherDiv);
                removeForecastData(weather.city);
            });

            weatherInfo.appendChild(weatherDiv);
        }

        function saveForecastData(data) {
            const forecastData = getForecastData() || {};
            forecastData[data.name] = data;
            localStorage.setItem('forecastData', JSON.stringify(forecastData));
            localStorage.setItem('lastUpdated', new Date().getTime());
        }

        function getForecastData() {
            const forecastData = localStorage.getItem('forecastData');
            return forecastData ? JSON.parse(forecastData) : null;
        }

        function removeForecastData(city) {
            const forecastData = getForecastData();
            if (forecastData) {
                delete forecastData[city];
                localStorage.setItem('forecastData', JSON.stringify(forecastData));
            }
        }

        function isForecastDataExpired() {
            const lastUpdated = localStorage.getItem('lastUpdated');
            if (!lastUpdated) return true;
            const currentTime = new Date().getTime();
            return currentTime - lastUpdated > 5 * 60 * 1000; 
        }

        async function updateWeather() {
            const forecastData = getForecastData();
            if (forecastData) {
                weatherInfo.innerHTML = '';
                for (const city in forecastData) {
                    addDivWithWeatherParameters(forecastData[city]);
                }
            }

            if (isForecastDataExpired()) {
                for (const city in forecastData) {
                    const data = await showWeather(city);
                    if (data) {
                        addDivWithWeatherParameters(data);
                        saveForecastData(data);
                    }
                }
            }
        }

        addBtn.addEventListener('click', async () => {
            const city = searchInput.value.trim();
            const data = await showWeather(city);
            if (data) {
                addDivWithWeatherParameters(data);
                saveForecastData(data);
            }
        });

        searchInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                const city = searchInput.value.trim();
                const data = await showWeather(city);
                if (data) {
                    addDivWithWeatherParameters(data);
                    saveForecastData(data);
                }
            }
        });

        document.addEventListener('DOMContentLoaded', () => {
            updateWeather();
        });

        setInterval(updateWeather, 5 * 60 * 1000); 