"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controlador_1 = __importDefault(require("../controladores/post.controlador"));
const autenticacion_1 = require("../middlewares/autenticacion");
const postRutas = (0, express_1.Router)();
postRutas.get('/get', post_controlador_1.default.prototype.get);
postRutas.post('/post', autenticacion_1.verificaToken, post_controlador_1.default.prototype.post);
postRutas.post('/upload', autenticacion_1.verificaToken, post_controlador_1.default.prototype.upload);
postRutas.get('/imagen/:userid/:img', post_controlador_1.default.prototype.getImg);
// WIP
postRutas.delete('/delete/:postId', autenticacion_1.verificaToken, post_controlador_1.default.prototype.delete);
exports.default = postRutas;
