//Feature #1 Date and Hour

let now = new Date();

let date = now.getDate();
console.log(date);
let day = now.getDay();
console.log(day);
let year = now.getFullYear();
console.log(year);
let month = now.getMonth();
console.log(month);
let hour = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayName = days[day];

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
let monthName = months[month];

let heading = document.querySelector("h2");
heading.innerHTML = `${dayName}, ${monthName} ${date}, ${year} ${hour}:${minutes}`;

//Feature #2 Search Button and Country

let form = document.querySelector(".search-container");
let input = document.querySelector(".placeholder-text");
let cityElement = document.querySelector(".city");
let searchButton = document.querySelector(".fa-solid.fa-magnifying-glass");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let cityName = input.value;
  if (cityName.length === 0) {
    var err0 = "City Name is empty: Setting default to Bangkok";
    document.getElementById("logging").innerHTML = err0;
    cityName = "Bangkok";
    document.getElementById("city").innerHTML = cityName;
  } else {
    document.getElementById("logging").innerHTML = "";
    let capitalizedCityName = capitalizeCityName(cityName);
    cityElement.textContent = capitalizedCityName;
    input.value = "";
  }

  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
});

searchButton.addEventListener("click", function (event) {
  event.preventDefault();

  let cityName = input.value;
  if (cityName.length === 0) {
    var err0 = "Enter your location is empty: Setting default to London";
    document.getElementById("logging").innerHTML = err0;
    cityName = "London";
    document.getElementById("city").innerHTML = cityName;
  } else {
    document.getElementById("logging").innerHTML = "";
    let capitalizedCityName = capitalizeCityName(cityName);
    cityElement.textContent = capitalizedCityName;
    input.value = "";
  }

  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
});

function capitalizeCityName(cityName) {
  let words = cityName.split(" ");
  let capitalizedWords = words.map((word) => {
    let lowercaseWord = word.toLowerCase();
    let capitalizedWord =
      lowercaseWord.charAt(0).toUpperCase() + lowercaseWord.slice(1);
    return capitalizedWord;
  });
  return capitalizedWords.join(" ");
}

//Feature #3 Temperature

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let h1 = document.querySelector("h1");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.dataset.originalValue = temperature;
  h1.innerHTML = `${city}`;
  temperatureElement.innerHTML = `${temperature}<sup>°</sup>`;

  displayTemperature(response);
}

function convertToFaren(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let originalTemperature = parseInt(temperatureElement.dataset.originalValue);
  let convertedTemperature = (originalTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(
    convertedTemperature
  )}<sup>°</sup>`;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let originalTemperature = parseInt(temperatureElement.dataset.originalValue);
  temperatureElement.innerHTML = `${Math.round(
    originalTemperature
  )}<sup>°</sup>`;
}

let faren = document.querySelector("#faren");
faren.addEventListener("click", convertToFaren);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

//Feature #4

function displayTemperature(response) {
  console.log(response.data);
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feelElement = document.querySelector("#feels");
  let weatherIcon = document.querySelector("#principal-weather-gif");

  feelElement.innerHTML = Math.round(response.data.main.feels_like);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  descriptionElement.innerHTML = response.data.weather[0].description;

  //Weathers

  if (response.data.weather[0].main == "Clouds") {
    weatherIcon.src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/700/original/output-onlinegiftools.gif?1688700481";
  } else if (response.data.weather[0].main == "Drizzle") {
    weatherIcon.src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/704/original/output-onlinegiftools%282%29.gif?1688702896";
  } else if (response.data.weather[0].main == "Thunderstorm") {
    weatherIcon.src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/707/original/output-onlinegiftools%285%29.gif?1688702911";
  } else if (response.data.weather[0].main == "Rain") {
    weatherIcon.src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/703/original/output-onlinegiftools%281%29.gif?1688702891";
  } else if (response.data.weather[0].main == "Snow") {
    weatherIcon.src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/705/original/output-onlinegiftools%283%29.gif?1688702901";
  } else if (response.data.weather[0].main == "Mist") {
    weatherIcon.src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/700/original/output-onlinegiftools.gif?1688700481";
  } else if (response.data.weather[0].main == "Smoke") {
    weatherIcon.src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/709/original/output-onlinegiftools%287%29.gif?1688702923";
  } else if (response.data.weather[0].main == "Haze") {
    weatherIcon.src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/702/original/output-onlinegiftools_%282%29.gif?1688702884";
  } else if (response.data.weather[0].main == "Dust") {
    weatherIcon.src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/709/original/output-onlinegiftools%287%29.gif?1688702923";
  } else if (response.data.weather[0].main == "Fog") {
    weatherIcon.src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/702/original/output-onlinegiftools_%282%29.gif?1688702884";
  } else if (response.data.weather[0].main == "Ash") {
    weatherIcon.src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/700/original/output-onlinegiftools.gif?1688700481";
  } else if (response.data.weather[0].main == "Squall") {
    weatherIcon.src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/709/original/output-onlinegiftools%287%29.gif?1688702923";
  } else if (response.data.weather[0].main == "Tornado") {
    weatherIcon.src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/709/original/output-onlinegiftools%287%29.gif?1688702923";
  } else if (response.data.weather[0].main == "Clear") {
    weatherIcon.src =
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/708/original/output-onlinegiftools%286%29.gif?1688702917";
  }
}
