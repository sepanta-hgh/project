// 1.
function formatDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hour}:${minute}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// 2.
function showTemperature(response) {
  let name = document.querySelector("#city");
  name.innerHTML = response.data.name;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let units = "metric";
  let apiKey = "97bed167ec49bff56e6c1b63daef9c86";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let units = "metric";
  let apiKey = "97bed167ec49bff56e6c1b63daef9c86";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getPosition);
