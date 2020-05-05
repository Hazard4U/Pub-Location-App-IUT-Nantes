import {getCookies} from "../utils/tools.js";

let socket = io();
let map = undefined;
let messages = [];

let USER_DATA = undefined;

socket.on("connect", () => {
    socket.emit("getSession", getCookies().id);
});

socket.on("setSession",(data) => {
    USER_DATA = data;
});

socket.on("addMessage", (data) => {
    console.log("Données :", data);
    addMessage(data);
});

// window.addEventListener("DOMContentLoaded", () => {
//     this.map = L.map('mapid').setView([51.505, -0.09], 13);
//     L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//         id: 'mapbox/streets-v11',
//         tileSize: 512,
//         zoomOffset: -1,
//         accessToken: 'pk.eyJ1IjoiaGF6YXJkNHUiLCJhIjoiY2p5ZGg0cnBtMHM5ajNta28xc3Y1ZWk4NiJ9.tNknm3zp2lIct3SQVxFiNg'
//     }).addTo(map);
// });
