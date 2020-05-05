let map = undefined;
let messages = [];

const Main = {
    data() {
        return {
            data: undefined,
            breweries: undefined
        }
    },
    template: `
        <v-row justify="space-around" style="height: 100%" no-gutters>
            <v-col style="height: 100%">
                  <v-card width="100%" height="100%">
                    <v-row id="mapid" style="height: 50%; width: calc(100% + 12px)"></v-row>
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title class="headline">{{this.data ? this.data.weatherData.name:""}}</v-list-item-title>
                        <v-list-item-subtitle>{{this.data ? weatherDesc(this.data.weatherData):""}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                
                    <v-card-text style="padding-bottom: 0">
                      <v-row align="center">
                        <v-col class="display-3" cols="6">
                          {{this.data ? Math.round(this.data.weatherData.main.temp):""}}&deg;C
                        </v-col>
                        <v-col cols="6">
                          <v-img
                            v-bind:src="weatherIcon()"
                            alt="Sunny image"
                            width="92"
                          ></v-img>
                        </v-col>
                      </v-row>
                    </v-card-text>
                
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-send</v-icon>
                      </v-list-item-icon>
                      <v-list-item-subtitle>{{this.data ? this.data.weatherData.wind.speed*3.6:""}} km/h</v-list-item-subtitle>
                    </v-list-item>
                
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-cloud-download</v-icon>
                      </v-list-item-icon>
                      <v-list-item-subtitle>{{this.data ? this.data.weatherData.main.humidity:""}}%</v-list-item-subtitle>
                    </v-list-item>
                
                  </v-card>
            </v-col>
            <v-col style="height: 100%"> 
            </v-col>
        </v-row>
`,
    methods: {
        weatherIcon: function () {
            if (!this.data)
                return "";
            const id = this.data.weatherData.weather[0].icon;
            return `https://openweathermap.org/img/wn/${id}@2x.png`;
        },
        weatherDesc: function (weatherData){
            const timezone = weatherData.timezone;
            const description = weatherData.weather[0].description;
            const tzDate = calcDate(timezone/60/60);
            let desc = "";
            switch (tzDate.getDay()) {
                case 1: desc+= "Lundi, ";
                    break;
                case 2: desc+= "Mardi, ";
                    break;
                case 3: desc+= "Mercredi, ";
                    break;
                case 4: desc += "Jeudi, ";
                    break;
                case 5: desc += "Vendredi, ";
                    break;
                case 6: desc += "Samedi, ";
                    break;
                default: desc += "Dimanche, ";
            }
            desc += tzDate.getHours()+":"+("0"+tzDate.getMinutes()).slice(-2)+", ";
            let test = " fsdf";
            return description.charAt(0).toUpperCase() + description.slice(1);
        }
    },
    created() {
        fetch(`/login?search=${this.$route.query.search}`)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                this.data = data;
                initMap(data.weatherData.coord);

                fetch(`/api/brewery/near?lat=${data.weatherData.coord.lat}&long=${data.weatherData.coord.lon}&radius=${50000}`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        this.breweries = data;
                        data.forEach(brewery => {
                            addBreweryPoint(brewery)
                        });
                    })
            })
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

// pos = [lat,lon]
function addBreweryPoint(brewery) {
    const pos = brewery.coordinates.split(',');
    var myIcon = L.icon({
        iconUrl: '/static/assets/images/food-and-restaurant.svg',
        iconSize: [38, 95],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    });
    L.marker(pos, {icon: myIcon, title: brewery.breweries}).addTo(map).on('click', (event) => {
        //TODO event.latlng
        console.log(event.latlng);
    });
}

// data = {pos: [lat,lon], username: string, message: string}
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

const initMap = (coord) => {
    map = L.map('mapid').setView([coord.lat, coord.lon], 10);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/%22%3EOpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/%22%3ECC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/%22%3EMapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiaGF6YXJkNHUiLCJhIjoiY2p5ZGg0cnBtMHM5ajNta28xc3Y1ZWk4NiJ9.tNknm3zp2lIct3SQVxFiNg'
    }).addTo(map);
};

// offset in houre
function calcDate(city, offset) {
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000*offset));
}