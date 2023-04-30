"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articulo_controlador_1 = __importDefault(require("../controladores/articulo.controlador"));
const autenticacion_1 = require("../middlewares/autenticacion");
const articuloRutas = (0, express_1.Router)();
articuloRutas.get('/get', articulo_controlador_1.default.prototype.get);
articuloRutas.get('/:id', articulo_controlador_1.default.prototype.getById);
articuloRutas.post('/post', autenticacion_1.verificaToken, articulo_controlador_1.default.prototype.post);
articuloRutas.put('/:id', autenticacion_1.verificaToken, articulo_controlador_1.default.prototype.update);
articuloRutas.delete('/delete/:articulo_id', autenticacion_1.verificaToken, articulo_controlador_1.default.prototype.delete);
articuloRutas.post('/upload', autenticacion_1.verificaToken, articulo_controlador_1.default.prototype.upload);
articuloRutas.get('/imagen/:userid/:img', articulo_controlador_1.default.prototype.getImg);
exports.default = articuloRutas;
//# sourceMappingURL=articulo.rutas.js.map