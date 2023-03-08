//Date & Time

function updateDateTime() {
  let now = new Date();

  let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let currentDay = daysOfWeek[now.getDay()];
  let currentDateNumber = now.getDate();
  let currentMonth = monthsOfYear[now.getMonth()];
  let currentYear = now.getFullYear();
  let currentDate = `${currentDateNumber} ${currentMonth} ${currentYear}`;

  let currentTime = now.toLocaleTimeString();
  document.getElementById("day").innerHTML = currentDay;
  document.getElementById("date").innerHTML = currentDate;
  document.getElementById("time").innerHTML = currentTime;
}

setInterval(updateDateTime, 1000);

//Temperature change celcius-fahrenheit

function temperatureCelsius(event) {
  event.preventDefault();
  let currentDegrees = document.querySelector("#main-temp");
  currentDegrees.innerHTML = 29;
}

let celsius = document.querySelector("#main-temp-c");
celsius.addEventListener("click", temperatureCelsius);

function temperatureFahrenheit(event) {
  event.preventDefault();
  let currentDegrees = document.querySelector("#main-temp");
  currentDegrees.innerHTML = 84;
}

let fahrenheit = document.querySelector("#main-temp-f");
fahrenheit.addEventListener("click", temperatureFahrenheit);

//Search API
function searchCity(city) {
  let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  searchCity(searchInput.value);
  searchInput.value = "";
}
let inputGroup = document.querySelector("#searchInput");
inputGroup.addEventListener("submit", search);

//Weather API
function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector(
    "#search-results"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = `${temperature}`;

  let temperatureDes = response.data.weather[0].description;
  let description = document.querySelector(".temperatureDes");
  description.innerHTML = `${temperatureDes}`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
}

//Geolocation API (Current Location)
function showPosition(position) {
  let apiKey = "1fd8093fa5ff12d796d7de756cc9d6b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentLoc");
button.addEventListener("click", getCurrentPosition);
