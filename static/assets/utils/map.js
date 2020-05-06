//Variables globales
let _MAP = undefined;

// pos = [lat,lon]
function addBreweryPointOnMap(brewery, breweryClickCallBack) {
    const pos = brewery.coordinates.split(',');
    var myIcon = L.icon({
        iconUrl: '/static/assets/images/food-and-restaurant.svg',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    });
    const marker = L.marker(pos, {icon: myIcon, title: brewery.breweries}).addTo(_MAP)
        marker.on('click', (event) => {
        breweryClickCallBack(brewery);
        console.log("Brasserie",event);
    });
    marker.on('mouseover', (event) => {
        addPopUpBrewery(brewery,marker);
        console.log("Brasserie",event);
    });

}

function addPopUpBrewery(brewery,marker){
    marker.bindPopup(brewery.breweries).openPopup();
    const popup = marker.getPopup();

    marker.on('mouseleave', (event) => {
        console.log("loged")
        popup.remove();
    });
}
// Fonction qui permettait d'afficher un message d'un utilisateur sur la map
function addMessageOnMap(data) {
    L.marker(data.pos).addTo(_MAP);
    const popup = L.popup({autoClose: false, offset: [0, -14]})
        .setLatLng(data.pos)
        .setContent(`Nouveau message de <b>${data.username}</b>`)
        .openOn(_MAP);

    popup.getElement().addEventListener("click", function () {
        popup.setContent(`<b>${data.username}</b>:<br/> ${data.message}`)
    });

    popup.getElement().children[2].addEventListener("click", function () {
        removeMessage(data);
    });
    data.popup = popup;
    messages.push(data);
    updateMessage();
}

// data = {pos: [lat,lon], username: string, message: string}
function removeMessageOnMap(data) {
    // Pour une suppression correcte il faudrait rajouter la prise en compte d'une timestamp
    const index = messages.findIndex((element) => {
        return element.username == data.username && element.message == data.message
    });
    messages.splice(index, 1);
    updateMessage();
}

function updateMessageOnMap() {
    const popups = messages.map((message) => message.popup);
    const group = new L.featureGroup(popups);
    _MAP.fitBounds(group.getBounds());
}

const initMap = (coord) => {
    _MAP = L.map('mapid').setView([coord.lat, coord.lon], 10);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/%22%3EOpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/%22%3ECC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/%22%3EMapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiaGF6YXJkNHUiLCJhIjoiY2p5ZGg0cnBtMHM5ajNta28xc3Y1ZWk4NiJ9.tNknm3zp2lIct3SQVxFiNg'
    }).addTo(_MAP);
};

export {initMap,addBreweryPointOnMap};
