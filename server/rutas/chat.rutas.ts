import { Router } from "express";
import chatControlador from "../controladores/chat.controlador";
import { verificaToken } from '../middlewares/autenticacion';

const chatRutas = Router();

// Obtener todos los chats del usuario con sus mensajes
chatRutas.get('/:userId', chatControlador.prototype.getChats);

// Crear un nuevo chat con otro usuario
chatRutas.post('/:userId', verificaToken, chatControlador.prototype.createChat);

// Obtener todos los mensajes de un chat
chatRutas.get('/:chatId/mensajes', chatControlador.prototype.getMensajes);

// Enviar un mensaje en un chat existente
chatRutas.post('/:chatId/msg', verificaToken, chatControlador.prototype.enviarMensaje);

// Obtener la información de un chat
chatRutas.get('/:chatId/info', chatControlador.prototype.getChatInfo);

// Eliminar un chat
// chatRutas.delete('/:chatId', chatControlador.prototype.deleteChat);

export default chatRutas;