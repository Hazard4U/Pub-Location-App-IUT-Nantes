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



export {autocomplete};