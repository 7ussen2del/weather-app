const apiKey = ""; // api الخاص بي
const apiUrl =
    "";

const searchBox = document.querySelector<HTMLInputElement>(".search input");
const searchBtn = document.querySelector<HTMLButtonElement>(".search button");
const weatherIcon = document.querySelector<HTMLImageElement>(".weather-icon");

async function checkWeather(city: string): Promise<void> {

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    let error = document.querySelector<HTMLElement>(".error");
    let styles = document.querySelector<HTMLDivElement>(".weather");
    if (response.status == 404) {
        if (error && styles) {
            error.style.display = "block";
            styles.style.display = "none";
        }
    } else {
        const data = await response.json();

        const cityElement = document.querySelector(".city") as HTMLElement | null;
        if (cityElement) {
            cityElement.innerHTML = data.name;
        }

        const tempElement = document.querySelector(".temp") as HTMLElement | null;
        if (tempElement) {
            tempElement.innerHTML = Math.round(data.main.temp) + "°C";
        }

        const humidityElement = document.querySelector(
            ".humidity"
        ) as HTMLElement | null;
        if (humidityElement) {
            humidityElement.innerHTML = data.main.humidity + "%";
        }

        const windElement = document.querySelector(".wind") as HTMLElement | null;
        if (windElement) {
            windElement.innerHTML = data.wind.speed + " km/h";
        }

        const weatherCondition = data.weather[0]?.main;
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
}

searchBtn?.addEventListener("click", () => {
    const city = searchBox?.value.trim();
    if (city) {
        checkWeather(city);
    }
});

searchBox?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = searchBox?.value.trim();
        if (city) {
            checkWeather(city);
        }
    }
});
