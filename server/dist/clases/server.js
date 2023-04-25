"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Server {
    constructor() {
        // public port: number = 3300;
        // public port: number = parseInt(process.env.PORT) || 3300;
        this.port = parseInt(process.env.PORT || '3300');
        this.app = (0, express_1.default)();
    }
    start(funcion) {
        this.app.listen(this.port, funcion);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map