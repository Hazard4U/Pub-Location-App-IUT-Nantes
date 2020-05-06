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
    });
    socket.on("joinChat", (data) => {
        const userData = server.getData()[data.id];
        const actualUserRoom = userData.room;
        if (actualUserRoom)
            socket.leave(actualUserRoom, ()=>{
            io.to(actualUserRoom).emit('sendMessage', {username: undefined, message:data.name+" a quitté le chat !"});
        });

        socket.join(data.room, ()=>{
            server.setData(
                {[data.id]: {
                    ...userData,
                    room:data.room,
                    name:data.name,
                    color: '#'+Math.floor(Math.random()*16777215).toString(16)}
                }
            );
            io.to(data.room).emit('sendMessage', {username: undefined, message:data.name+" a rejoint le chat !"});
        });
    })
    socket.on("sendMessage", (data) => {
        const userData = server.getData()[data.id];
        const actualUserRoom = userData.room;
        io.to(actualUserRoom).emit('sendMessage', {message:data.message, username: userData.name, color: userData.color});
    })
});



