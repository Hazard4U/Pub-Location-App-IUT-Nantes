const express = require("express");
const  cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.argv[2] || 3000;

const bodyParser = require("body-parser");
const database = require('./app/config/dbconfig');

const server = require("./app/model/server").getServer();
const LogServeur = require("./utils").LogServeur;

process.on('exit', function (code) {
    return console.log(`About to exit with code ${code}`);
});

database
    .init
    .then((db) => {

        http.listen(port, function () {
        LogServeur("Server listening on port : " + port);
        });

        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());

        /* Router configuration */
        const INIT_ROOT = '/';
        app.use(INIT_ROOT, require('./app/routes/router'));

        //accès aux pages statiques
        app.use('/static', express.static('static'));
    });

io.on("connection", (socket) => {
    socket.on("getSession", (id) => {
        const userData = server.getData()[id];
        console.log(userData);
        LogServeur("Id Connected "+id);
        socket.emit("setSession", userData);
    })
});



