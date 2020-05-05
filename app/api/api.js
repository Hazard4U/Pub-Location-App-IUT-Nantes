const fetch = require("node-fetch");

//Constantes
const API_WEATHER_BASE = "http://api.openweathermap.org/data/2.5/weather?";
const API_WEATHER_KEY = "2f0fe5b16e0db94ac034c7187e94180b";


exports.getWeather = (city) => {
    return new Promise(resolve => {
        fetch(`${API_WEATHER_BASE}q=${city}&appid=${API_WEATHER_KEY}&lang=15&units=metric`)
            .then(res =>res.json())
            .then(data => {
                resolve(data);
            })
    })
}