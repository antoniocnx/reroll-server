"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./clases/server");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const usuario_rutas_1 = __importDefault(require("./rutas/usuario.rutas"));
const articulo_rutas_1 = __importDefault(require("./rutas/articulo.rutas"));
const administrador_rutas_1 = __importDefault(require("./rutas/administrador.rutas"));
const chat_rutas_1 = __importDefault(require("./rutas/chat.rutas"));
const reporte_rutas_1 = __importDefault(require("./rutas/reporte.rutas"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const express_1 = __importDefault(require("express"));
const servidor = new server_1.Server();
// Configuración de la zona horaria
moment_timezone_1.default.tz.setDefault('Europe/Madrid');
// Body parser
servidor.app.use(body_parser_1.default.urlencoded({ limit: '5mb', extended: true }));
servidor.app.use(body_parser_1.default.json({ limit: '5mb' }));
// PRUEBAS
servidor.app.use(express_1.default.json());
// CORS
servidor.app.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
//Rutas de la app
servidor.app.use('/usuario', usuario_rutas_1.default);
servidor.app.use('/administrador', administrador_rutas_1.default);
servidor.app.use('/articulo', articulo_rutas_1.default);
servidor.app.use('/chat', chat_rutas_1.default);
servidor.app.use('/reporte', reporte_rutas_1.default);
//Conexión a la base de datos
mongoose_1.default.connect('mongodb+srv://antoniocn:1N50mw4XolmsO4C8@clustertfg.1asoedx.mongodb.net/reroll?retryWrites=true&w=majority', (err) => {
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
//# sourceMappingURL=index.js.map