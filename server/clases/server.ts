import express, { Application } from "express";
import { createServer, Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { configSocket } from "../connections/socket";

import dotenv from 'dotenv';

dotenv.config();

export class Server {
    public app: express.Application;
    
    public port: number = parseInt(process.env.PORT || '3300');

    public httpServer: HttpServer;
    
    public io: SocketIOServer;
    
    constructor() {
        this.app = express();

        this.httpServer = createServer(this.app);

    }

    start(funcion: () => void) {
        this.app.listen(this.port, funcion);
        // this.httpServer.listen(this.port, funcion);

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

// SOCKET

// import express, { Application } from "express";
// import { createServer, Server as HttpServer } from "http";
// import { Server as SocketIOServer } from "socket.io";
// import { configSocket } from "../connections/socket";

// import dotenv from 'dotenv';

// dotenv.config();

// export class Server {
//   public app: express.Application;
//   public port_app: number = parseInt(process.env.PORT || '3300');
//   public port_http: number = parseInt(process.env.PORT || '4000');
//   public httpServer: HttpServer;
//   public io: SocketIOServer;

//   constructor() {
//     this.app = express();
//     this.httpServer = createServer(this.app);
//   }

//   start(funcion: () => void) {
//     this.app.listen(this.port_app, funcion);
//   }

//   startSocket(funcion: () => void) {
//     this.httpServer.listen(this.port_http, funcion);

//     this.io = new SocketIOServer(this.httpServer, {
//       cors: {
//         origin: '*',
//         methods: ['GET', 'POST']
//       }
//     });

//     configSocket(this.io);
//   }
// }
