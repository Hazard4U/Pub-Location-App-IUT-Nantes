const API_PLACE_BASE = "https://maps.googleapis.com/maps/api/place/autocomplete/json?";
const API_GOOGLE_KEY = "AIzaSyDULNZVGex5jIEtmS1ClRfxxkukBw3qk4U";
const PROXY_CORS = "https://cors-anywhere.herokuapp.com/";

const autocomplete = (input) => {
    return new Promise(resolve => {
        fetch(`${PROXY_CORS}${API_PLACE_BASE}input=${input}&key=${API_GOOGLE_KEY}`)
            .then(res =>res.json())
            .then(data => {
                console.log(data);
                resolve(data.predictions.map(result=>result.description));
            })
    })
}

const API_WEATHER_BASE = "api.openweathermap.org/data/2.5/weather?";
const API_WEATHER_KEY = "2f0fe5b16e0db94ac034c7187e94180b"


const getWeather = (city) => {
    return new Promise(resolve => {
        fetch(`${PROXY_CORS}${API_WEATHER_BASE}q=${city}&appid=${API_WEATHER_KEY}&lang=15&units=metric`)
            .then(res =>res.json())
            .then(data => {
                console.log(data);
                //resolve(data.predictions.map(result=>result.description));
            })
    })
}

export {autocomplete,getWeather};