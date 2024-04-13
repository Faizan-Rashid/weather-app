//  WEATHER APP

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const Card = document.querySelector(".card");
const apiKey = `1514cb8559a6b6f529bae9576cbc555d`;


weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    } else {
        displayError(`enter some input`);
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error(`error occurr while fetching the required data`);
    } else {
        return await response.json();
    }
}

function displayWeatherInfo(data) {
    // console.log(data);
    const {
        name: city,
        main: {
            temp,
            humidity
        },
        weather: [{
            description,
            id
        }]
    } = data

    Card.textContent = "";
    Card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descriptionDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp-273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `humididty: ${humidity}%`;
    descriptionDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("tempDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descriptionDisplay.classList.add("descriptionDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    Card.appendChild(cityDisplay);
    Card.appendChild(tempDisplay);
    Card.appendChild(humidityDisplay);
    Card.appendChild(descriptionDisplay);
    Card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {

    if (weatherId >= 100 && weatherId < 300)
        return `⛈️`;
    else if (weatherId >= 300 && weatherId < 400)
        return `🌧️`;
    else if (weatherId >= 500 && weatherId < 600)
        return `🌨️`;
    else if (weatherId >= 600 && weatherId < 700)
        return `❄️`;
    else if (weatherId >= 700 && weatherId < 800)
        return `💨`;
    else if (weatherId === 800)
        return `☀️`;
    else if (weatherId >= 801 && weatherId < 810)
        return `☁️`;
    else
        return `❓`;



}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    Card.textContent = "";
    Card.style.display = "flex";
    Card.appendChild(errorDisplay);
}