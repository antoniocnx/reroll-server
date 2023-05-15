"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controlador_1 = __importDefault(require("../controladores/usuario.controlador"));
const autenticacion_1 = require("../middlewares/autenticacion");
const usuarioRutas = (0, express_1.Router)();
usuarioRutas.get('/get', autenticacion_1.verificaToken, usuario_controlador_1.default.prototype.get);
usuarioRutas.get('/:id', usuario_controlador_1.default.prototype.getById);
usuarioRutas.post('/create', usuario_controlador_1.default.prototype.create);
usuarioRutas.post('/update', autenticacion_1.verificaToken, usuario_controlador_1.default.prototype.update);
usuarioRutas.post('/login', usuario_controlador_1.default.prototype.login);
usuarioRutas.get('/favoritos', autenticacion_1.verificaToken, usuario_controlador_1.default.prototype.getFavoritos);
usuarioRutas.post('/favoritos/:articuloId', autenticacion_1.verificaToken, usuario_controlador_1.default.prototype.marcarFavorito);
usuarioRutas.get('/valoraciones/:id', usuario_controlador_1.default.prototype.getValoraciones);
usuarioRutas.post('/:idUsuario/valoracion', autenticacion_1.verificaToken, usuario_controlador_1.default.prototype.valorar);
exports.default = usuarioRutas;
//# sourceMappingURL=usuario.rutas.js.map