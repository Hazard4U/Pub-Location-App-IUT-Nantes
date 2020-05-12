import {socket} from "../js/client.js";
import {getCookies, calcDate} from "../utils/tools.js";
import {login as loginApi, nearestBreweries as nearestBreweriesApi, beerByBrewery as beerByBreweryApi} from "../utils/api.js";
import {initMap, addBreweryPointOnMap} from "../utils/map.js";

const Main = {
    data() {
        return {
            data: undefined,
            dialogPhone: false,
            dialogName: false,
            phone: undefined,
            breweryName: undefined,
            breweries: [],
            beers: [],
            title: "",
            username: undefined,
            messages: [],
            msg: "",
            text: "test",
            tab: null,
            chat: undefined
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
                      <v-list-item-subtitle>{{this.data ? (this.data.weatherData.wind.speed*3.6).toFixed(2):""}} km/h</v-list-item-subtitle>
                    </v-list-item>
                
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>mdi-cloud-download</v-icon>
                      </v-list-item-icon>
                      <v-list-item-subtitle>{{this.data ? this.data.weatherData.main.humidity:""}}%</v-list-item-subtitle>
                    </v-list-item>
                
                  </v-card>
            </v-col>
            <v-col style="height: 100vh; padding: 10px;" class="d-flex flex-column align-center overflow-y-hidden">
                <v-card style="width:100%">
                        <v-card-title style="height:10vh">{{this.data ? this.title:""}}</v-card-title>

                        <v-tabs
                            style="height:10vh"
                          v-model="tab"
                          background-color="deep-purple accent-4"
                          centered
                          dark
                          icons-and-text
                        >
                          <v-tabs-slider></v-tabs-slider>
                    
                          <v-tab href="#tab-breweries">
                           Brasseries
                            <v-icon>mdi-google-maps</v-icon>
                          </v-tab>
                    
                          <v-tab href="#tab-beers">
                            Bières
                            <v-icon>mdi-beer</v-icon>
                          </v-tab>
                    
                          <v-tab href="#tab-chat" @click.stop="dialogName = true">
                            Chat
                            <v-icon>mdi-message</v-icon>
                          </v-tab>
                        </v-tabs>
                    
                        <v-tabs-items v-model="tab" style="height:80vh" class="overflow-y-auto">
                          <v-tab-item value="tab-breweries">
                            <v-col style="padding: 10px;" class="d-flex flex-wrap justify-center">
                            <v-card v-for="brewery in breweries" class="d-flex flex-column" width="45%" min-height="200px" style="margin: 5px; padding: 5px">
                                <v-card-title>{{(brewery.breweries).length >= 20 ? (brewery.breweries).slice(0,20)+"...":(brewery.breweries)}}</v-card-title>
                                <v-card-subtitle class="pb-0">{{brewery.address1}}</v-card-subtitle>
                                <v-card-actions>
                                <v-btn  style="text-align: left" color="orange" text @click.stop="dialogPhone = true; phone = brewery.phone; breweryName = brewery.breweries">
                                    Téléphone
                                  </v-btn>
                                  <v-btn style="text-align: left"  color="orange" text @click="window.open(brewery.website)">
                                    Site
                                  </v-btn>
                                </v-card-actions>
                                <v-row class="justify-center align-end">
                                    <v-btn dark color="blue" @click="selectBrewery(brewery);" href="#tab-beers">
                                        Selectionner
                                    </v-btn>
                                </v-row>
                            </v-card>
                            <v-col>
                          </v-tab-item>
                          <v-tab-item value="tab-beers">
                            <v-col style="padding: 10px;" class="d-flex flex-wrap justify-center">
                                <v-card v-for="beer in beers" class="d-flex flex-column" width="45%" height="158px" style="margin: 5px; padding: 5px">
                                    <v-card-title>{{(beer.name).length >= 20 ? (beer.name).slice(0,20)+"...":(beer.name)}}</v-card-title>
                                    <v-card-subtitle class="pb-0">{{beer.category}}</v-card-subtitle>
                                </v-card>
                            <v-col>
                          </v-tab-item>
                          <v-tab-item value="tab-chat" style="height:100%">
                            <v-col style="padding: 10px;height:100%" class="d-flex flex-wrap justify-center">
                                <v-card class="d-flex flex-column elevation-12" color="primary lighten-4" width="100%" height="100%">
                                    <v-toolbar dark color="primary darken-1" style="max-height:70px">
                                        <v-toolbar-title>Chat</v-toolbar-title>
                                    </v-toolbar>
                                    <v-card-text style="min-height: 60%">
                                        <v-list ref="chat" id="messages" style="height: 100%" class="overflow-y-auto">
                                            <template v-for="(item, index) in messages" class="d-flex flex-column">
                                            <v-row style="margin-left: 10px">
                                                <v-chip v-if="item.username != undefined" class="ma-2" :color="item.color" text-color="white">
                                                        <v-avatar left>
                                                            <v-icon>mdi-account-circle</v-icon>
                                                        </v-avatar>
                                                        <span><b>{{item.username}}:</b>  {{item.message}}</span>
                                                </v-chip>
                                                <v-subheader v-if="item.username == undefined">{{item.message}}</v-subheader>
                                            </v-row>
                                                
                                            </template>
                                        </v-list>
                                    </v-card-text>
                                    <v-card-actions >
                                        <v-form @submit.prevent="submit">
                                            <v-text-field v-model="msg" label="Message" single-line solo-inverted></v-text-field>
                                            <v-btn fab dark small color="primary" type="submit">
                                                <v-icon dark style="font-size: 1em">send</v-icon>
                                            </v-btn>
                                        </v-form>
                                    </v-card-actions>
                                </v-card>
                            <v-col>
                          </v-tab-item>
                        </v-tabs-items>
                    </v-card>    
                    <div v-if="breweries.length == 0">
                        <v-alert  type="info">
                            Il n'y a peut être pas de brasserie dans ce coin, cherchez ailleurs !
                        </v-alert>
                    </div>
            </v-col>
            <v-dialog v-model="dialogPhone" max-width="290" style="z-index:1000">
              <v-card>
                <v-card-title class="headline">Téléphone</v-card-title>
                <v-card-subtitle class="pb-0" style="margin-bottom: 20px">{{breweryName}}</v-card-subtitle>
                <v-card-text>
                    <v-icon color="indigo">mdi-phone</v-icon> {{phone}}
                </v-card-text>
                 <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="dialogPhone = false"
                  >
                    Merci !
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogName" max-width="290" style="z-index:10000">
              <v-card>
                <v-card-title class="headline">Information...</v-card-title>
                <v-card-subtitle class="pb-0" style="margin-bottom: 20px">Entre ton nom:</v-card-subtitle>
                <v-card-text>
                   <v-text-field label="Nom d'utilisateur*" v-model="username" required></v-text-field>
                </v-card-text>
                 <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="dialogName = false; joinChat()"
                  >
                    Rejoindre
                  </v-btn>
                  <v-btn
                    color="red darken-1"
                    text
                    @click="dialogName = false;"
                  >
                    Abandonner
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
            return desc + description.charAt(0).toUpperCase() + description.slice(1);
        },
        selectBrewery: function(brewery){
            beerByBreweryApi(brewery.id)
                .then(data=>{
                    this.beers = data;
                    this.title = brewery.breweries;
                    this.tab='tab-beers';
                })
        },
        joinChat: function(){
            this.messages = [];
            console.log("Join")
            socket.emit("joinChat",{room:this.title, name:this.username, id:getCookies().id});
        },
        submit() {
            console.log("Send")
            socket.emit("sendMessage",{id:getCookies().id, message:this.msg});
            this.msg = "";
        }
    },
    watch: {
        messages() {
            setTimeout(() => {
                this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
            }, 0);
        }
    },
    created() {
        loginApi(this.$route.query.search)
            .then((data) => {
                this.data = data;
                initMap(data.weatherData.coord);
                nearestBreweriesApi(data.weatherData.coord.lat,data.weatherData.coord.lon,20000)
                    .then(data => {
                        this.breweries = data;
                        this.selectBrewery(data[0]);
                        data.forEach(brewery => {
                            addBreweryPointOnMap(brewery, this.selectBrewery)
                        });
                    })
            })

            // Abonnement aux évènements de chat
            socket.on("sendMessage", (data)=>{
                this.messages.push(data);
                console.log("Receive", data)
            });
    }
};
export {Main};

