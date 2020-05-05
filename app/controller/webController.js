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
        const params = req.body;
        let uid = req.cookies.id;
        if (uid == undefined){
            uid = Math.random();
            res.cookie('id', uid);
        }
        let userData = {uid,search:params.search};
        getWeather(userData.search).then(data=>{
            userData.weatherData = {...data};
            server.setData({ [uid]: userData});
            res.redirect('/chat');
        })
        .catch((error)=>{
            console.error(error);
        })

    }
}


module.exports = WebController;