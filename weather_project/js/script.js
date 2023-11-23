const apiKey = '54b164d29b4999e01b1cb926234f7b0b';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const search = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const body = document.querySelector('body')

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block';
    } else {
        let data = await response.json();

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + " C°";
        document.querySelector('.humidity').innerHTML = data.main.humidity + " %";
        document.querySelector('.wind').innerHTML = data.wind.speed + " KM/H";

        if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = './assets/images/clouds.png';
            body.style.backgroundImage = 'url(/assets/images/nuvens.jpg)'
        } else if (data.weather[0].main == 'Clear') {
            weatherIcon.src = './assets/images/clear.png'
            body.style.backgroundImage = 'url(assets/images/sol.jpg)'
        } else if (data.weather[0].main == 'Rain') {
            weatherIcon.src = './assets/images/rain.png'
            body.style.backgroundImage = 'url(assets/images/chuva.jpg)'
        } else if (data.weather[0].main == 'Drizzle') {
            weatherIcon.src = './assets/images/drizzle.png'
            body.style.backgroundImage = 'url(assets/images/nublado.jpg)'
        } else if (data.weather[0].main == 'Mist') {
            weatherIcon.src = './assets/images/mist.png'
            body.style.backgroundImage = 'url(assets/images/nevoeiro.jpg)'
        }

        document.querySelector('.weather').style.display = 'block';
    }
};

searchBtn.addEventListener('click', () => {
    checkWeather(search.value);
});
