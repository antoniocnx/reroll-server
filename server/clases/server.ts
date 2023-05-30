import express, { Application } from "express";
import { createServer, Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { configSocket } from "../connections/socket";

import dotenv from 'dotenv';

dotenv.config();

export class Server {
    public port: number = parseInt(process.env.PORT || '3300');
    public app: express.Application;

    public httpServer: HttpServer;
    
    public io: SocketIOServer;
    
    constructor() {
        this.app = express();

        this.httpServer = createServer(this.app);

    }

    start(funcion: () => void) {
        // this.app.listen(this.port, funcion);
        this.httpServer.listen(this.port, funcion);

        this.io = new SocketIOServer(this.httpServer, {
            cors: {
                origin: '*',
                methods: [
                    'GET', 'POST'
                ]
            }
        });

        configSocket(this.io);
    }

}