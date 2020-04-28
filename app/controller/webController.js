const server = require("../model/server").getServer();
const LogServeur = require("../../utils").LogServeur;
const fetch = require("node-fetch");
class WebController {

    constructor() {
        this.root = __dirname + "../../../static";
    }

    showLoginPage(req, res) {
        res.sendFile('index.html', { root: this.root });
    }

    showChatPage(req, res) {
        res.sendFile('page.html', { root: this.root });
    }

    login(req, res) {
        const ip = req.ip.slice(7);
        LogServeur("[ INFO ] : Ip loged in " + ip);

        fetch(`https://api-adresse.data.gouv.fr/search/?q=${req.body.place}&autocomplete=0&limit=1`)
        .then( (fetchRes) => fetchRes.json())
        .then( (fetchRes) => {
            const userCoor = fetchRes.features[0].geometry.coordinates;
            res.cookie('id', ip);
            server.setData({ [ip]: { username: req.body.username, place: req.body.place, userCoor } });
            res.redirect('/chat');
        })
        .catch((error)=>{
            console.error(error);
            
        })

    }
}


module.exports = WebController;