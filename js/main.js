const APIKey = "f9e4f0a5f166c1e5ffeece72611d9803";
async function getWeatherData (cityName){
    let request = new Request(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=imperial`)
    let result = await fetch(request);
    let response = await result.json();
    // console.log(result);
    console.log(response);
    return response;
}

function getWeatherIconUrl(icon){
    return `http://openweathermap.org/img/wn/${icon}@2x.png`
}

function displayDegreesF(temp){
    return `${Math.round(temp)}°F`
}

function degreesToCompass(deg){
    if (348.75 < deg || deg <= 11.25){return "N"}
    else if (11.25 < deg && deg <= 33.75){return "NNE"}
    else if (33.75 < deg && deg <= 56.25){return "NE"}
    else if (56.25 < deg && deg <= 78.75){return "ENE"}
    else if (78.75 < deg && deg <= 101.25){return "E"}
    else if (101.25 < deg && deg <= 123.75){return "ESE"}
    else if (123.75 < deg && deg <= 146.25){return "SE"}
    else if (146.25 < deg && deg <= 168.75){return "SSE"}
    else if (168.75 < deg && deg <= 191.25){return "S"}
    else if (191.25 < deg && deg <= 213.75){return "SSW"}
    else if (213.75 < deg && deg <= 236.25){return "SW"}
    else if (236.25 < deg && deg <= 258.75){return "WSW"}
    else if (258.75 < deg && deg <= 281.25){return "W"}
    else if (281.25 < deg && deg <= 303.75){return "WNW"}
    else if(303.75 < deg && deg <= 326.25){return "NW"}
    else if (326.25 < deg && deg <= 348.75){return "NNW"}
}


// select weather data form
const mainWeatherContainer = document.querySelector(".mainWeatherContainer")
const form = document.querySelector("#weatherDataForm");
const tempDiv = document.getElementById("temp");
const highLowTempDiv = document.getElementById("highLowTemp")
// const lowTempDiv = document.getElementById("lowTemp");
// const highTempDiv = document.getElementById("highTemp");
const humidityDiv = document.getElementById("humidity");
// const pressureDiv = document.getElementById("pressure");
const windDiv = document.getElementById("wind");
// const windGustDiv = document.getElementById("windGust");
// const windDirDiv = document.getElementById("windDirection");
const weatherTypeDiv = document.getElementById("weatherType");
const weatherIcon = document.getElementById("weatherIcon");
// const lowTempDiv = document.getElementById("lowTemp");
// const lowTempDiv = document.getElementById("lowTemp");
// const lowTempDiv = document.getElementById("lowTemp");
// const lowTempDiv = document.getElementById("lowTemp");
// const lowTempDiv = document.getElementById("lowTemp");

// function kelvinToF(temp){
//     return `${Math.round((temp - 273.15) * 9/5 + 32)}°F`
// }

form.addEventListener('submit', async (event) =>{
    // prevent page refresh when clicking submit button
    event.preventDefault();
    // this grabs the value of the data box from the submit event
    let city = event.path[0][0].value;
    // use that city value to make the API call
    let weatherData = await getWeatherData(city);
    // log out the data to the console
    console.log("from button click:", weatherData);
    // access specific bits
    if (weatherData.cod == 200){
        mainWeatherContainer.style.display = "flex";
        tempDiv.innerHTML = displayDegreesF(weatherData.main.temp);
        highLowTempDiv.innerHTML = `${displayDegreesF(weatherData.main.temp_max)} / ${displayDegreesF(weatherData.main.temp_min)}`
        humidityDiv.innerHTML = `${weatherData.main.humidity}% humidity`;
        // highTempDiv.innerHTML = displayDegreesF(weatherData.main.temp_max);
        // lowTempDiv.innerHTML = displayDegreesF(weatherData.main.temp_min);
        let tempFeelsLike = weatherData.main.feels_like;
        windDiv.innerHTML = `${weatherData.wind.speed} mph ${degreesToCompass(weatherData.wind.deg)}`;
        let weatherType = weatherData.weather[0].description;
        weatherTypeDiv.innerHTML =  weatherType.charAt(0).toUpperCase() + weatherType.slice(1);
        weatherIcon.src = getWeatherIconUrl(weatherData.weather[0].icon);


        // tempDiv.innerHTML = displayDegreesF(temp);
        // humidityDiv.innerHTML = humidity;
        // lowTempDiv.innerHTML = displayDegreesF(lowTemp);
        // highTempDiv.innerHTML = displayDegreesF(hiTemp);
        // humidityDiv.innerHTML = humidity;
        // pressureDiv.innerHTML = pressure;
        // windGustDiv.innerHTML = windGust;
        // windDirDiv.innerHTML = windDirection;
        // weatherTypeDiv.innerHTML = weatherType;
        // weatherIcon.src = getWeatherIconUrl(icon);
    }
    else if (weatherData.cod == 404){
        alert("City not found. Please try again")
    }
    else{
        alert("Error getting weather data. Please try again later.")
    }
    // ...etc
})

// form.submit();