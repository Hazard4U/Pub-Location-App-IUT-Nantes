/*
Fichier contenant tous les différents fetch côté client
 */

const API_PLACE_BASE = "https://maps.googleapis.com/maps/api/place/autocomplete/json?";
const API_GOOGLE_KEY = "AIzaSyDULNZVGex5jIEtmS1ClRfxxkukBw3qk4U";
const PROXY_CORS = "https://cors-anywhere.herokuapp.com/";                                      // Utile pour le NO-CORS mais le serveur est down de temps à autre alors privilégier plugin navigateur


/*
Prend en entré un parametre de recherche: "Londr"
Sort un tableau contenant des prédictions: ["Londres", ...]
*/
const autocomplete = (search) => {
    return new Promise(resolve => {
        fetch(`${API_PLACE_BASE}input=${search}&key=${API_GOOGLE_KEY}`)
            .then(res =>res.json())
            .then(data => {
                resolve(data.predictions.map(result=>result.description));
            })
    })
}

/*
Prend en entré une adresse contenant une ville "Londres, Royaume-Uni"
Sort un json avec toutes les données clientes: {uid: 0.4398434, search: "Londres, Royaume-Uni", weatherData: {}}
*/
const login = (search) => {
    return new Promise(resolve => {
        fetch(`/login?search=${search}`)
            .then(res =>res.json())
            .then(data => {
                resolve(data);
            })
    })
}

/*
Récupère toutes les brasseries dans un certain rayon
*/
const nearestBreweries = (lat,long,radius) => {
    return new Promise(resolve => {
        fetch(`/api/brewery/near?lat=${lat}&long=${long}&radius=${radius}`)
            .then(res =>res.json())
            .then(data => {
                resolve(data);
            })
    });
}

export {autocomplete,login,nearestBreweries};