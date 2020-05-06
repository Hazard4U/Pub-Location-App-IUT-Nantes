import {getCookies} from "../utils/tools.js";

let socket = io();

let USER_DATA = undefined;

socket.on("connect", () => {
    socket.emit("getSession", getCookies().id);
});

socket.on("setSession",(data) => {
    USER_DATA = data;
});

export {socket};