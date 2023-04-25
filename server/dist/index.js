"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./clases/server");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const usuario_rutas_1 = __importDefault(require("./rutas/usuario.rutas"));
const articulo_rutas_1 = __importDefault(require("./rutas/articulo.rutas"));
const administrador_rutas_1 = __importDefault(require("./rutas/administrador.rutas"));
const chat_rutas_1 = __importDefault(require("./rutas/chat.rutas"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const servidor = new server_1.Server();
// Configuración de la zona horaria
moment_timezone_1.default.tz.setDefault('Europe/Madrid');
// Body parser
servidor.app.use(body_parser_1.default.urlencoded({ limit: '5mb', extended: true }));
servidor.app.use(body_parser_1.default.json({ limit: '5mb' }));
// Variables de entorno
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
// FileUpload
servidor.app.use((0, express_fileupload_1.default)({ useTempFiles: true }));
servidor.app.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
//Rutas de la app
servidor.app.use('/usuario', usuario_rutas_1.default);
servidor.app.use('/administrador', administrador_rutas_1.default);
servidor.app.use('/articulo', articulo_rutas_1.default);
servidor.app.use('/chats', chat_rutas_1.default);
//Conexión a la base de datos
// mongoose.connect('mongodb://localhost:27017/rerolldb', (err) => {
//     if (err) {
//         throw err;
//     } else {
//         console.log("Base de Datos ONLINE");
//     }
// })
mongoose_1.default.connect('mongodb+srv://antoniocn:JaredLeto1994@clustertfg.1asoedx.mongodb.net/reroll?retryWrites=true&w=majority', (err) => {
    if (err) {
        throw err;
    }
    else {
        console.log("Base de Datos ONLINE");
    }
});
// Levanta express
servidor.start(() => {
    console.log('Servidor iniciado en el puerto ' + servidor.port);
});
