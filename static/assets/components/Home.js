import {autocomplete as placeApi} from "../utils/api.js";

const Home  = {
    template: `<autocomplete
                :search="search"
                placeholder="Search for a country"
                aria-label="Search for a country"
                @submit="submit"
        ></autocomplete>`,
    methods: {
        search(input) {
            return placeApi(input);
        },
        submit(input) {
            this.$router.push({path:'/main'})
        }
    }
};
export {Home};