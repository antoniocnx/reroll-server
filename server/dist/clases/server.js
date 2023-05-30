"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const socket_1 = require("../connections/socket");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.port = parseInt(process.env.PORT || '3300');
        this.app = (0, express_1.default)();
        this.httpServer = (0, http_1.createServer)(this.app);
    }
    start(funcion) {
        // this.app.listen(this.port, funcion);
        this.httpServer.listen(this.port, funcion);
        this.io = new socket_io_1.Server(this.httpServer, {
            cors: {
                origin: '*',
                methods: [
                    'GET', 'POST'
                ]
            }
        });
        (0, socket_1.configSocket)(this.io);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map