import {autocomplete as placeApi, getWeather} from "../utils/apis.js";

const routes = [
    // { path: '/', component: Home, props: {user : user} },
    // { path: '/register', component: Register },
    // { path: '/login', component: Login}
];

const router = new VueRouter({
    routes: routes
});


const app = new Vue({
    el: '#app',
    components: {},
    data: {},
    methods: {
        search(input) {
            return placeApi(input);
        },
        submit(city) {
            return getWeather(city)
        }
    },
    router
});

Vue.use(Autocomplete)