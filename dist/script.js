"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiKey = "c42a0a5ad28661feb1597a3c56f198cf"; // api الخاص بي
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
function checkWeather(city) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const response = yield fetch(apiUrl + city + `&appid=${apiKey}`);
        let error = document.querySelector(".error");
        let styles = document.querySelector(".weather");
        if (response.status == 404) {
            if (error && styles) {
                error.style.display = "block";
                styles.style.display = "none";
            }
        }
        else {
            const data = yield response.json();
            const cityElement = document.querySelector(".city");
            if (cityElement) {
                cityElement.innerHTML = data.name;
            }
            const tempElement = document.querySelector(".temp");
            if (tempElement) {
                tempElement.innerHTML = Math.round(data.main.temp) + "°C";
            }
            const humidityElement = document.querySelector(".humidity");
            if (humidityElement) {
                humidityElement.innerHTML = data.main.humidity + "%";
            }
            const windElement = document.querySelector(".wind");
            if (windElement) {
                windElement.innerHTML = data.wind.speed + " km/h";
            }
            const weatherCondition = (_a = data.weather[0]) === null || _a === void 0 ? void 0 : _a.main;
            if (weatherIcon) {
                switch (weatherCondition) {
                    case "Clouds":
                        weatherIcon.src = "../images/Clouds.png";
                        break;
                    case "Clear":
                        weatherIcon.src = "../images/clear.png";
                        break;
                    case "Rain":
                        weatherIcon.src = "../images/rain.png";
                        break;
                    case "Drizzle":
                        weatherIcon.src = "../images/drizzle.png";
                        break;
                    case "Mist":
                        weatherIcon.src = "../images/mist.png";
                        break;
                    default:
                        weatherIcon.src = "../images/default.png";
                }
            }
            if (styles) {
                styles.style.display = "block";
            }
        }
    });
}
searchBtn === null || searchBtn === void 0 ? void 0 : searchBtn.addEventListener("click", () => {
    const city = searchBox === null || searchBox === void 0 ? void 0 : searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});
searchBox === null || searchBox === void 0 ? void 0 : searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = searchBox === null || searchBox === void 0 ? void 0 : searchBox.value.trim();
        if (city) {
            checkWeather(city);
        }
    }
});
