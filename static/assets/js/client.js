import {getCookies} from "../utils/tools.js";

let socket = io();


socket.on("connect", () => {
    socket.emit("getSession", getCookies().id);
});

export {socket};