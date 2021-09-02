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
citySearch("Barcelona");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;

  document.querySelector("h2").innerHTML = ` ${temperature}℃ `;
  document.querySelector("#sky").innerHTML = ` ${description}`;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind: ${response.data.wind.speed} km/h`;
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

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", search);

let button = document.querySelector("#button");
button.addEventListener("click", position);
