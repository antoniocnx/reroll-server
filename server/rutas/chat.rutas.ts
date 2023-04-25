import { Router } from "express";
import chatControlador from "../controladores/chat.controlador";
import { verificaToken } from '../middlewares/autenticacion';

const chatRutas = Router();

// chatRutas.get('/get', verificaToken, chatControlador.prototype.get);
// chatRutas.get('/:chatId', verificaToken, chatControlador.prototype.getChat);
// chatRutas.post('/:chatId/mensaje', verificaToken, chatControlador.prototype.postMensaje);

// Obtener todos los chats del usuario con sus mensajes
chatRutas.get('/:userId', chatControlador.prototype.getChats);

// Crear un nuevo chat con otro usuario
chatRutas.post('/chat', verificaToken, chatControlador.prototype.createChat);

// Eliminar un chat
chatRutas.delete('/:chatId', chatControlador.prototype.deleteChat);

// Enviar un mensaje en un chat existente
chatRutas.post('/:chatId', chatControlador.prototype.enviarMensaje);

export default chatRutas;