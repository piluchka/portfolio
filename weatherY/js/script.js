"use strict"

const API_KEY = "a4dd0a16a99e173c6827e799f7c35f17"

const WEATHER_CONDITIONS = {
  Clear: "img/clear.svg",
  Clouds: "img/clouds.svg",
  Drizzle: "img/drizzle.svg",
  Rain: "img/rain.svg",
  Snow: "img/snow.svg",
  Mist: "img/mist.svg",
  Thunderstorm: "img/thunderstorm.svg",
}
// get access from user to geo
async function getGeo(apiKey, WEATHER_CONDITIONS) {
  if ("geolocation" in navigator) {
    const successCallback = async (position) => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      await getCityName(latitude, longitude, apiKey, WEATHER_CONDITIONS)
    }

    const errorCallback = async () => {
      await checkWeather("New York", apiKey, WEATHER_CONDITIONS)
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  }
}

getGeo(API_KEY, WEATHER_CONDITIONS)

// get city name by coords
async function getCityName(latitude, longitude, apiKey, WEATHER_CONDITIONS) {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
  )
  if (response.ok) {
    let data = await response.json()
    await checkWeather(data[0].name, apiKey, WEATHER_CONDITIONS)
  } else {
    await checkWeather("New York", apiKey, WEATHER_CONDITIONS)
  }
}

// get info about weather in a city
async function checkWeather(city, apiKey, WEATHER_CONDITIONS) {
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
  await fetch(apiUrl + city + `&appid=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".condition").innerText = data.weather[0].main
      document.querySelector(".temp").innerText = `${Math.round(data.main.temp)}°C`
      document.querySelector(".city").innerText = data.name
      document.querySelector(".humidity-percents").innerText = `${data.main.humidity}%`
      document.querySelector(".wind-speed").innerText = `${Math.round(data.wind.speed)} km/h`
      document.querySelector(".feels").innerText = `Feels like ${Math.round(data.main.feels_like)}°C`
      createWeatherImage(data, WEATHER_CONDITIONS)
    })
    .catch((err) => {
      const inp = document.querySelector("#city")
      inp.placeholder = "City is incorrect"
      inp.value = ""
      inp.classList.add("_error")
    })
    .finally(() => {
      setTimeout(() => {
        const inp = document.querySelector("#city")
        inp.classList.remove("_error")
        inp.placeholder = "Your city"
      }, 2000)
    })
}

// add image for a weather
function createWeatherImage(data, WEATHER_CONDITIONS) {
  const conditionImage = document.querySelector(".main-image")
  const currentCondititon = data.weather[0].main

  for (const condition in WEATHER_CONDITIONS) {
    if (condition === currentCondititon) {
      conditionImage.src = WEATHER_CONDITIONS[condition]
    }
  }
}

// Click-handler for button
function buttonSearchHandler(apiKey, WEATHER_CONDITIONS) {
  return async function () {
    const city = document.getElementById("city").value
    await checkWeather(city, apiKey, WEATHER_CONDITIONS)
  }
}

const searchBtn = document.querySelector(".weather__search")
searchBtn.addEventListener("click", buttonSearchHandler(API_KEY, WEATHER_CONDITIONS))

// Key-handler for input
function inputSearchHandler(apiKey, WEATHER_CONDITIONS) {
  return async function (e) {
    if (e.key === "Enter") {
      const city = document.getElementById("city").value
      await checkWeather(city, apiKey, WEATHER_CONDITIONS)
    }
  }
}

const searchInp = document.querySelector("#city")
searchInp.addEventListener("keyup", inputSearchHandler(API_KEY, WEATHER_CONDITIONS))
