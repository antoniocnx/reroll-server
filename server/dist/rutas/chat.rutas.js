"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controlador_1 = __importDefault(require("../controladores/chat.controlador"));
const autenticacion_1 = require("../middlewares/autenticacion");
const chatRutas = (0, express_1.Router)();
// Obtener todos los chats del usuario con sus mensajes
chatRutas.get('/:userId', chat_controlador_1.default.prototype.getChats);
// Crear un nuevo chat con otro usuario
chatRutas.post('/:userId', autenticacion_1.verificaToken, chat_controlador_1.default.prototype.createChat);
// Obtener todos los mensajes de un chat
chatRutas.get('/:chatId/mensajes', chat_controlador_1.default.prototype.getMensajes);
// Enviar un mensaje en un chat existente
chatRutas.post('/:chatId/msg', autenticacion_1.verificaToken, chat_controlador_1.default.prototype.enviarMensaje);
// Eliminar un chat
// chatRutas.delete('/:chatId', chatControlador.prototype.deleteChat);
exports.default = chatRutas;
//# sourceMappingURL=chat.rutas.js.map