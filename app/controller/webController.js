const server = require("../model/server").getServer();
const getWeather = require("../api/api").getWeather;

class WebController {

    constructor() {
        this.root = __dirname + "../../../static";
    }

    showLoginPage(req, res) {
        res.sendFile('index.html', { root: this.root });
    }

    login(req, res) {
        let uid = req.cookies.id;
        if (uid == undefined){
            uid = Math.random();
            res.cookie('id', uid);
        }
        let userData = {uid,search:req.query.search};
        getWeather(userData.search).then(data=>{
            userData.weatherData = {...data};
            server.setData({ [uid]: userData});
            res.status(200);
            res.json(userData);
        })
        .catch((error)=>{
            console.error(error);
            res.status(404);
            res.json(undefined);
        })

    }
}


module.exports = WebController;