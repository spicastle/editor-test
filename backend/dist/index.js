"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
app.use(express_1.default.static('public'));
app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('chat message', (msg) => {
        console.log('message: ', msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
