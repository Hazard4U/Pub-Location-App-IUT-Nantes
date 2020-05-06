import {autocomplete as placeApi} from "../utils/api.js";

const Home  = {
    template: `
        <div id="background">
            <div>
                <autocomplete
                        :search="search"
                        placeholder="Chercher une ville"
                        aria-label="Chercher une ville"
                        @submit="submit"
                ></autocomplete>
            </div>
        </div>`,
    methods: {
        search(input) {
            return placeApi(input);
        },
        submit(input) {
            this.$router.push({path:'/main',query:{search:input},params:{search2:input}})
        }
    }
};
export {Home};