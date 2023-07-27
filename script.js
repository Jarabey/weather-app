// Global Variables
let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
let defaultCity = "Bangkok";
let hou;

//Feature #1 Date and Hour
function weather_datetime(response) {
  let timezone = response.data.timezone;
  let local = new Date();
  let country_now = new Date();
  let timezone_diff = country_now.getTime() + timezone * 1000;
  country_now.setTime(timezone_diff);
  let now = country_now;
  // now.setTime(timezone_diff);
  let date = now.getUTCDate();
  console.log(date);
  let day = now.getUTCDay();
  console.log(day);
  let year = now.getFullYear();
  console.log(year);
  let month = now.getMonth();
  console.log(month);
  var ampm;
  var local_ampm;
  var hour = now.getUTCHours().toLocaleString("en-GB", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  let minutes = now.getUTCMinutes().toLocaleString("en-GB", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  let secs = now.getSeconds().toLocaleString("en-GB", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  var local_hour = local.getHours().toLocaleString("en-GB", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  let local_minutes = local.getMinutes().toLocaleString("en-GB", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  if (hour >= 12) {
    ampm = "PM";
  } else {
    ampm = "AM";
  }
  if (local_hour >= 12) {
    local_ampm = "PM";
  } else {
    local_ampm = "AM";
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
  let heading = document.querySelector("#dates");
  let local_heading = document.querySelector("#local_dates");
  heading.innerHTML = `${dayName}, ${monthName} ${date}, ${year} ${hour}:${minutes} ${ampm}`;
  local_heading.innerHTML = `Your Current Local Time - ${local_hour}:${local_minutes} ${local_ampm}`;
  setTimeout(function () {
    weather_datetime(response);
  }, 1000);
}

//Feature #2 Search Button and Country

let form = document.querySelector(".search-container");
let input = document.querySelector(".placeholder-text");
let cityElement = document.querySelector(".city");
let searchButton = document.querySelector(".fa-solid.fa-magnifying-glass");

form.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    // window.alert(
    //   "PLEASE PRESS SEARCH BUTTON IN THE FUTURE - Otherwise you'll miss the pretty animations!!"
    // );
    searchButton.click();
  }
});
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let cityName = input.value;

  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
});

searchButton.addEventListener("click", function (event) {
  event.preventDefault();

  let cityName = input.value;

  if (cityName.length === 0) {
    var err0 = `City Name is empty: Setting default to ${defaultCity}`;
    document.getElementById("logging").innerHTML = err0;
    cityName = defaultCity;
    document.getElementById("city").innerHTML = cityName;
  } else {
    defaultCity = cityName;
    document.getElementById("logging").innerHTML = "";
    let capitalizedCityName = capitalizeCityName(cityName);
    cityElement.textContent = capitalizedCityName;
    input.value = "";
  }
  `https://api.openweathermap.org/data/2.5/weather?q=london&appid=cabdbda40038ba7d1165b953b1c7bd6c&units=metric`;
  // let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  //  let country_name = document.getElementById("country-name").innerHTML; // no.
  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(weather_datetime);
  axios.get(apiUrl).then(getForecast);
});
//   axios
//     .get(apiUrl)
//     .then(
//       (response) =>
//         `https://restcountries.com/v3.1/alpha/${response.data.sys.country}`
//     )
//     .then((resp) => {
//       country_name = resp.data[0].name.common;
//       console.log(country_name);
//     });
//   axios
//     .get(apiUrl)
//     .then(weather_datetime(response, (country_name = country_name)));
// });

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
  // displayOthers(response);
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
//DarkMode

let darkModeToggle = document.getElementById("dark-mode-toggle");
let body = document.body;

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
});

// Forecast Settings

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      let weatherIconUrl = getWeatherIconUrl(forecastDay.weather[0].main);
      forecastHTML =
        forecastHTML +
        `
    <div class="col">
      <span class="dates">${formatDay(forecastDay.dt)}</span>
      <br />
      <span class="climate-gif">
        <img
          src="${weatherIconUrl}"
          width="60px"
        />
        <br />
      </span>
      <span class="hot"><span class="max"> ${Math.round(
        forecastDay.temp.max
      )}</span>º/<span class="min"> ${Math.round(
          forecastDay.temp.min
        )}</span>º</span>
    </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
function getForecast(response) {
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// Weather Icons

function getWeatherIconUrl(weatherCondition) {
  const weatherIconMap = {
    Clouds:
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/700/original/output-onlinegiftools.gif?1688700481",
    Drizzle:
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/704/original/output-onlinegiftools%282%29.gif?1688702896",
    Thunderstorm:
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/707/original/output-onlinegiftools%285%29.gif?1688702911",
    Rain: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/703/original/output-onlinegiftools%281%29.gif?1688702891",
    Snow: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/705/original/output-onlinegiftools%283%29.gif?1688702901",
    Mist: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/700/original/output-onlinegiftools.gif?1688700481",
    Smoke:
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/709/original/output-onlinegiftools%287%29.gif?1688702923",
    Haze: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/702/original/output-onlinegiftools_%282%29.gif?1688702884",
    Dust: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/709/original/output-onlinegiftools%287%29.gif?1688702923",
    Fog: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/702/original/output-onlinegiftools_%282%29.gif?168870288",
    Ash: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/700/original/output-onlinegiftools.gif?1688700481",
    Squall:
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/709/original/output-onlinegiftools%287%29.gif?1688702923",
    Tornado:
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/709/original/output-onlinegiftools%287%29.gif?1688702923",
    Clear:
      "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/708/original/output-onlinegiftools%286%29.gif?1688702917",
  };

  return (
    weatherIconMap[weatherCondition] ||
    "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/088/708/original/output-onlinegiftools%286%29.gif?1688702917"
  );
}
