"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controlador_1 = __importDefault(require("../controladores/chat.controlador"));
const autenticacion_1 = require("../middlewares/autenticacion");
const chatRutas = (0, express_1.Router)();
// chatRutas.get('/get', verificaToken, chatControlador.prototype.get);
// chatRutas.get('/:chatId', verificaToken, chatControlador.prototype.getChat);
// chatRutas.post('/:chatId/mensaje', verificaToken, chatControlador.prototype.postMensaje);
// Obtener todos los chats del usuario con sus mensajes
chatRutas.get('/:userId', chat_controlador_1.default.prototype.getChats);
// Crear un nuevo chat con otro usuario
chatRutas.post('/chat', autenticacion_1.verificaToken, chat_controlador_1.default.prototype.createChat);
// Eliminar un chat
chatRutas.delete('/:chatId', chat_controlador_1.default.prototype.deleteChat);
// Enviar un mensaje en un chat existente
chatRutas.post('/:chatId', chat_controlador_1.default.prototype.enviarMensaje);
exports.default = chatRutas;
