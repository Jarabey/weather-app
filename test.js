const axios = require("axios");
let country_code = "HN";
let api_url = `https://restcountries.com/v3.1/alpha/${country_code}`;

async function fetchData() {
  try {
    const response = await axios.get(api_url);
    const country = response.data[0].name.common;
    console.log(country);
  } catch (error) {
    // Handle the error here
    console.error("An error occurred:", error.message);
  }
}

fetchData();
