"use strict";
// import express, { Application } from "express";
// import { createServer, Server as HttpServer } from "http";
// import { Server as SocketIOServer } from "socket.io";
// import { configSocket } from "../connections/socket";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
// import dotenv from 'dotenv';
// dotenv.config();
// export class Server {
//     public app: express.Application;
//     public port: number = parseInt(process.env.PORT || '3300');
//     public httpServer: HttpServer;
//     public io: SocketIOServer;
//     constructor() {
//         this.app = express();
//         this.httpServer = createServer(this.app);
//     }
//     start(funcion: () => void) {
//         // this.app.listen(this.port, funcion);
//         this.httpServer.listen(this.port, funcion);
//         this.io = new SocketIOServer(this.httpServer, {
//             cors: {
//                 origin: '*',
//                 methods: [
//                     'GET', 'POST'
//                 ]
//             }
//         });
//         configSocket(this.io);
//     }
// }
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const socket_1 = require("../connections/socket");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.port_app = parseInt(process.env.PORT_APP || '3300');
        this.port_http = parseInt(process.env.PORT_HTTP || '4000');
        this.app = (0, express_1.default)();
        this.httpServer = (0, http_1.createServer)(this.app);
    }
    start(funcion) {
        this.app.listen(this.port_app, funcion);
    }
    startSocket(funcion) {
        this.httpServer.listen(this.port_http, funcion);
        this.io = new socket_io_1.Server(this.httpServer, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            }
        });
        (0, socket_1.configSocket)(this.io);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map