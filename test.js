const axios = require("axios");
const moment = require("moment-timezone");
let country_code = "HN";
let cityName = "London";
let api_url = `https://timezone.abstractapi.com/v1/current_time/?api_key=5c0c7133b3b4440392d8854d9aee3e63&location=${cityName}`;

async function fetchData() {
  try {
    const response = await axios.get(api_url);
    // const country = response.data[0].name.common;
    let norm = new Date();
    let time = response.data.datetime;
    let base = moment
      .tz(response.data.timezone, response.data.timezone_location)
      .format("HH");
    console.log(time);
    console.log(base);
  } catch (error) {
    // Handle the error here
    console.error("An error occurred:", error.message);
  }
}

fetchData();
// type what you want? rn nothing it was just that you had the ?
// timezone_location;
