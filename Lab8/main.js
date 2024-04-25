searchInput = document.querySelector('.search-input');
addBtn = document.querySelector('.add-btn');
weatherInfoCity = document.querySelector('.weather-info-city');
weatherTemperatureInfo = document.querySelector('.weather-info-temp');
weatherInfoDesc = document.querySelector('.weather-info-desc');
weatherInfoHumidity = document.querySelector('.weather-info-humidity');

//http://api.openweathermap.org/data/2.5/weather?q=Cracow&APPID=5d4936eb93fd4cab1fbdb6742799ee9a

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
async function showWeather() {
    const city = searchInput.value;
    const key = '5d4936eb93fd4cab1fbdb6742799ee9a';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}&units=metric`;
    const data = await fetch(url)
        .then(response => response.json());
    console.log(data);
    return data;
}

function addDivWithWeatherParameters(data) {
    const city = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const weather = new Weather(img, city, temperature, description, humidity);
    const weatherDiv = document.createElement('div');
    weatherDiv.classList.add('weather-div');
    weatherDiv.innerHTML = `
        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weather-icon">
        <h2>Weather in ${weather.city}</h2>
        <p>Temperature: ${weather.temperature} ℃</p>
        <p>Description: ${capitalizeFirstLetter(data.weather[0].description)}</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
    document.querySelector('.weather').appendChild(weatherDiv);
}


addBtn.addEventListener('click', async () => {
    const data = await showWeather();
    addDivWithWeatherParameters(data);
});




