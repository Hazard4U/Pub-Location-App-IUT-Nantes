import {Home} from "../components/Home.js";
import {Main} from "../components/Main.js";

const routes = [
    { path: '/', component: Home},
    { path: '/main', component: Main}
];

const router = new VueRouter({
    routes: routes
});

const app = new Vue({
    el: '#app',
    router
});

Vue.use(Autocomplete);