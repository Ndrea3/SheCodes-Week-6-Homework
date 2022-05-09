function formatDate(curDate) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekDay = weekDays[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let hours = curDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = curDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let month = months[curDate.getMonth()];
  let year = curDate.getFullYear();
  let day = curDate.getDate();
  return `${weekDay}, ${month} ${day}, ${year}  ${hours}:${minutes}`;
}
let now = new Date();
let dateElement = document.querySelector("#curDate");
dateElement.innerHTML = formatDate(now);

function submitCity(event) {
  event.preventDefault();
  let input = document.querySelector("#enterFavCity");
  let form = document.querySelector("#enterCity");
  form.innerHTML = `${input.value}`;
  searchCity(input.value);
}

function searchCity(city) {
  let apiKey = "f98ba7e599adf93cd93e20273e395b25";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

let form = document.querySelector("#favCity");
form.addEventListener("submit", submitCity);

function showWeather(response) {
  let h5 = document.querySelector("h5");
  let temperature = Math.round(response.data.main.temp);
  h5.innerHTML = `${temperature}°C`;
}

//

navigator.geolocation.getCurrentPosition(retrievePosition);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "f98ba7e599adf93cd93e20273e395b25";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}
&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#curCityTemp");
  currentTemp.innerHTML = `${temperature}°C`;
  let high = document.querySelector("#highTemp");
  high.innerHTML = `High: ${Math.round(response.data.main.temp_max)}°C`;
  let low = document.querySelector("#lowTemp");
  low.innerHTML = `Low: ${Math.round(response.data.main.temp_min)}°C`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let humidity = document.querySelector("#hum");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}°C`;
  let weatherDesc = document.querySelector("#tempDesc");
  weatherDesc.innerHTML = response.data.weather[0].main;
  let weatherIcon = document.querySelector("#weathIcon");
  weatherIcon.innerHTML = response.data.weather[0].icon;
  let wPressure = document.querySelector("#press");
  wPressure.innerHTML = `Pressure: ${response.data.main.pressure} mmHg`;
}
navigator.geolocation.getCurrentPosition(showPosition);
