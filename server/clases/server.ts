import express, { Application } from "express";

import dotenv from 'dotenv';
dotenv.config();

export class Server {
    // public port: number = 3300;
    // public port: number = parseInt(process.env.PORT) || 3300;
    public port: number = parseInt(process.env.PORT || '3300');
    public app: express.Application;
    
    constructor() {
        this.app = express();
    }

    start(funcion: () => void) {
        this.app.listen(this.port, funcion);
    }
}