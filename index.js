document.addEventListener("DOMContentLoaded", function () {
  let form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let locationInput = document.querySelector("#location");
    let location = locationInput.value;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=6a0bac9dced487830ce6066218a5481c&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        let weatherDescription = data.weather[0].description;
        let temperature = data.main.temp;
        let maxTemperature = data.main.temp_max;
        let minTemperature = data.main.temp_min;

        let weatherIcon = document.querySelector(".card-title span");
        let weatherText = document.querySelector(".card-title strong");
        let temperatureText = document.querySelector(".card-title br");
        let humidityText = document.querySelector(".card-text");

        weatherText.textContent = weatherDescription;
        temperatureText.textContent = `${temperature}°C ↑ ${minTemperature}°C ↓`;
        humidityText.textContent = `💧 ${data.main.humidity}% humidity`;

        if (weatherDescription.includes("rain")) {
          weatherIcon.textContent = "🌧️";
        } else if (weatherDescription.includes("cloud")) {
          weatherIcon.textContent = "☁️";
        } else {
          weatherIcon.textContent = "🌞";
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  });
});
