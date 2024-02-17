const searchInput = document.querySelector('#search-input')
const searchIcon = document.querySelector('#search-icon')
const weatherImg = document.querySelector('.weatherImg')
const deg = document.querySelector('.deg')
const cityName = document.querySelector('.city-name')
const humidity = document.querySelector('.humidity')
const windSpeed = document.querySelector('.wind-speed')
const form = document.querySelector('form')
const img = document.querySelector('.weatherImg')
const appBox = document.querySelector('#app-box')
const mainSec = document.querySelector('#main-section')
const nf = document.querySelector('.not-found-div')
const btn = document.querySelector('button')

if (new Date().getHours() >= 18) {
    document.body.classList.toggle('dark-mode')
}

async function calcWeather() {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=0adc576e610fee58bf24611448260629&units=metric`;

        const response = await fetch(apiURL);
        const jsonResponse = await response.json();

        if(jsonResponse.cod == '404') {

            mainSec.style.display = 'none';
            appBox.style = 'animation: 1s animationClose;'
            appBox.style.height = '200px'
            nf.style.display = 'block'
            
        } else {

        cityName.textContent = jsonResponse.name
        deg.textContent = `${Math.floor(jsonResponse.main.temp)}°C`;
        humidity.textContent = `${Math.floor(jsonResponse.main.humidity)}%`;
        windSpeed.textContent = `${Math.floor(jsonResponse.wind.speed)} km/h`;

        if (jsonResponse.name == 'Brooklyn' || jsonResponse.name == 'brooklyn') {
            cityName.textContent = 'Brooklyn Baby'
        }
        else if (jsonResponse.name == 'Paris' || jsonResponse.name == 'paris') {
            appBox.style = "background: center url('paris.png');"
        } 
        else if (jsonResponse.name == 'Los Angeles') {
            appBox.style = "background: center url('la.png');"
            // appBox.style = "background-size: contain"
        } 
        else {
            appBox.style = "background: var(--bg-color);"
        }
    
        if (jsonResponse.weather[0].main == 'Clouds') {
            img.src = 'clouds.png';
        } else if (jsonResponse.weather[0].main == 'Clear') {
            img.src = 'here comes the sun.png';
        }
    }
}

searchIcon.addEventListener('click', calcWeather);

searchInput.onkeydown = e => {
    if (e.key == 'Enter') {
        calcWeather();
    }
}