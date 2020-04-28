import {getCookies} from "./utils";

let socket = io();
let domName = undefined;
let map = undefined;
let messages = [];

socket.on("connect", () => {
    console.log("Client");
    console.log("id: ", getCookies().id);
    socket.emit("getSession", getCookies().id);
});






socket.on("setName", (name) => {
    console.log("Nom reçu :", name);
    setName(name);
});

socket.on("addMessage", (data) => {
    console.log("Données :", data);
    addMessage(data);
});

function setData(data) {
    if (!domName)
        domName = document.querySelectorAll("h1 #name");
    domName.textContent = data.username;
}



function addMessage(data) {
    L.marker(data.pos).addTo(map);
    const popup = L.popup({ autoClose: false, offset: [0, -14] })
        .setLatLng(data.pos)
        .setContent(`Nouveau message de <b>${data.username}</b>`)
        .openOn(map);

    console.log(popup.getElement())
    popup.getElement().addEventListener("click", function () {
        popup.setContent(`<b>${data.username}</b>:<br/> ${data.message}`)
    });

    popup.getElement().children[2].addEventListener("click", function () {
        console.log("closed");
        removeMessage(data);
    });
    data.popup = popup;
    messages.push(data);
    updateMessage();
    console.log(messages);
}

function removeMessage(data) {
    // Pour une suppression corecte il faudrait rajouter la prise en compte d'une timestamp
    const index = messages.findIndex((element) => {
        return element.username == data.username && element.message == data.message
    })
    messages.splice(index, 1);
    updateMessage();
    console.log(messages);
}

function updateMessage() {
    const popups = messages.map((message) => message.popup)
    const group = new L.featureGroup(popups);
    map.fitBounds(group.getBounds());
}


window.addEventListener("DOMContentLoaded", () => {
    map = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiaGF6YXJkNHUiLCJhIjoiY2p5ZGg0cnBtMHM5ajNta28xc3Y1ZWk4NiJ9.tNknm3zp2lIct3SQVxFiNg'
    }).addTo(map);

    // var marker2 = L.marker([51, -0.09]).addTo(mymap);
    addMessage({ pos: [51.5, -0.09], username: "Théo", message: "Test" });
    addMessage({ pos: [51.5, -0.04], username: "Théo", message: "T" });


    // let group = new L.featureGroup([marker, marker2]);
    // map.fitBounds(group.getBounds());
})