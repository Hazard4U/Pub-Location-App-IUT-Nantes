const routes = [
    { path: '/', component: Home, props: {user : user} },
    { path: '/register', component: Register },
    { path: '/login', component: Login}
];

const router = new VueRouter({
    routes: routes
});

const app = new Vue({
    el: '#app',
    data :{
        user: user
    },
    methods : {

    },
    router
});
