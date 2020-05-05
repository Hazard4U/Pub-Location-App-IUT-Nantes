let map = undefined;
let messages = [];

const Main = {
    props:{
      test: String
    },
    data() {
        return {
            description: undefined,
            temperature: undefined,
            pression: undefined,
            humidite: undefined,
        }
    },
    template: `
            <div class="left">
                <div id="mapid"></div>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Propriété</th>
                            <th>Valeur</th>
    
                        </tr>
                        </thead>
                        <tbody>
                        <tr id="description">
                            <td>Description</td>
                            <td>{{description}}</td>
                        </tr>
                        <tr id="temp">
                            <td>Temperature</td>
                            <td>{{temperature}}</td>
                        </tr>
                        <tr id="pressure">
                            <td>Pression</td>
                            <td>{{pression}}</td>
                        </tr>
                        <tr id="humidity">
                            <td>Humidite</td>
                            <td>{{humidite}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div>{{test}}</div>
                </div>
            </div>
            <div class="right">
        </div>
`,
    methods: {},
    mounted() {
        console.log(Main.$props)
        console.log(this.$route.params);
        initMap(this.map);
    }
};
export {Main};

function addMessage(data) {
    L.marker(data.pos).addTo(map);
    const popup = L.popup({autoClose: false, offset: [0, -14]})
        .setLatLng(data.pos)
        .setContent(`Nouveau message de <b>${data.username}</b>`)
        .openOn(map);

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

function removeMessage(data) {
    // Pour une suppression correcte il faudrait rajouter la prise en compte d'une timestamp
    const index = messages.findIndex((element) => {
        return element.username == data.username && element.message == data.message
    })
    messages.splice(index, 1);
    updateMessage();
}

function updateMessage() {
    const popups = messages.map((message) => message.popup);
    const group = new L.featureGroup(popups);
    map.fitBounds(group.getBounds());
}

const initMap = () => {
    map = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/%22%3EOpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/%22%3ECC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/%22%3EMapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiaGF6YXJkNHUiLCJhIjoiY2p5ZGg0cnBtMHM5ajNta28xc3Y1ZWk4NiJ9.tNknm3zp2lIct3SQVxFiNg'
    }).addTo(map);
};
