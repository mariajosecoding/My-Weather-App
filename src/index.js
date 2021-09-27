//real time showing
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  //Date showing
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

///////Forecast
function displayForecast(response) {
  let forecast= response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="col"> 
              <div class="date-forecast">${formatDay(forecastDay.dt)}</div>
           <img src="http://openweathermap.org/img/wn/${
             forecastDay.weather[0].icon
           }@2x.png" width="42">
           <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max"> 
             ${Math.round(forecastDay.temp.max)}°
            </span>
            <span class="weather-forecast-temperature-min"> 
             ${Math.round(forecastDay.temp.min)}°
              </span>
           </div>
        </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  
}

let dateElement = document.querySelector("#dateTime");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function citySearch(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  citySearch(searchInput.value);
  citySearch(city);
}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search); 
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", search);
let button = document.querySelector("#button");
button.addEventListener("click", position);


function getForecast(coordinates) {
  
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  
}

function displayWeather(response) {
  
  celsiusTemperature = response.data.main.temp;
  let temperatureElement = Math.round(celsiusTemperature);
  let description = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");

  document.querySelector("#temperature").innerHTML = ` ${temperatureElement}`;
  document.querySelector("#sky").innerHTML = ` ${description}`;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = `<i class="material-icons">water_drop</i> ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `<i class="material-icons">air</i>${Math.round(
    response.data.wind.speed
  )} km/h`;

  getForecast(response.data.coord);
 
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}


function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}


function position(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

citySearch("Barcelona");




