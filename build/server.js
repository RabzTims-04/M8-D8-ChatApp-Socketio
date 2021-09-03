"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
var server = http_1.createServer(app);
var io = new socket_io_1.Server(server, {
    allowEIO3: true
});
io.on('connection', function (socket) {
    console.log("new connection");
    //welcome to just the current user
    socket.emit('message', 'welcome to chat');
    //everyone is notified that user has connected except the user itself
    socket.broadcast.emit('message', 'A user has joined the chat');
    socket.on('disconnect', function () {
        //everyone is notified that user is leaving including the user
        io.emit('message', 'A user has left the chat');
    });
    //listen to chatmessage
    socket.on('chatMessage', function (text) {
        console.log(text);
        io.emit('message', text);
    });
});
var port = 3002 || process.env.PORT;
server.listen(port, function () {
    console.log("Server is listening on port " + port);
});
