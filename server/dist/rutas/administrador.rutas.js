"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const administrador_controlador_1 = __importDefault(require("../controladores/administrador.controlador"));
const autenticacion_1 = require("../middlewares/autenticacion");
const administradorRutas = (0, express_1.Router)();
administradorRutas.get('', administrador_controlador_1.default.prototype.getAdmins);
administradorRutas.get('/get', autenticacion_1.verificaTokenAdmin, administrador_controlador_1.default.prototype.get);
administradorRutas.post('/create', administrador_controlador_1.default.prototype.create);
administradorRutas.post('/update', autenticacion_1.verificaTokenAdmin, administrador_controlador_1.default.prototype.update);
administradorRutas.post('/login', administrador_controlador_1.default.prototype.login);
administradorRutas.delete('', autenticacion_1.verificaTokenAdmin, administrador_controlador_1.default.prototype.delete);
exports.default = administradorRutas;
//# sourceMappingURL=administrador.rutas.js.map