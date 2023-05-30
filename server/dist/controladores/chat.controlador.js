"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = require("../modelos/chat");
const usuario_1 = require("../modelos/usuario");
class chatControlador {
    // Obtener todos los chats de un usuario
    getChats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarioId = req.params.userId;
                // Verificar que el usuario exista en la base de datos
                const existUsuario = yield usuario_1.Usuario.exists({ _id: usuarioId });
                if (!existUsuario) {
                    return res.status(400).json({ mensaje: 'El usuario no existe' });
                }
                // Buscar todos los chats en los que el usuario sea participante
                const chats = yield chat_1.Chat.find({
                    $or: [{ usuario1: usuarioId }, { usuario2: usuarioId }],
                }).populate('usuario1', 'nombre apellidos email avatar').populate('usuario2', 'nombre apellidos email avatar');
                return res.json({ chats });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ mensaje: 'Error al obtener los chats del usuario' });
            }
        });
    }
    ;
    // Crear un nuevo chat entre dos usuarios
    createChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario1 = req.usuario._id; // ID del usuario 1 obtenido del middleware
                const usuario2 = req.params.userId; // ID del usuario 2 obtenido por parámetro
                // Verificar que los usuarios existan en la base de datos
                const existUsuario1 = yield usuario_1.Usuario.exists({ _id: usuario1 });
                const existUsuario2 = yield usuario_1.Usuario.exists({ _id: usuario2 });
                if (!existUsuario1 || !existUsuario2) {
                    return res.status(400).json({ mensaje: 'Usuarios no encontrados' });
                }
                // Crear el chat y guardar en la base de datos
                const nuevoChat = new chat_1.Chat({
                    usuario1,
                    usuario2: usuario2,
                    mensajes: [],
                    fechaChat: Date.now()
                });
                yield nuevoChat.save();
                return res.json({ mensaje: 'Chat creado exitosamente', chat: nuevoChat });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ mensaje: 'Error al crear el chat' });
            }
        });
    }
    ;
    // Agregar un nuevo mensaje a un chat específico
    enviarMensaje(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chatId = req.params.chatId;
                const usuarioId = req.usuario._id; // ID del usuario autenticado obtenido del token
                const texto = req.body.texto;
                // Verificar que el chat exista en la base de datos
                const chat = yield chat_1.Chat.findById(chatId);
                if (!chat) {
                    return res.status(404).json({ mensaje: 'Chat no encontrado' });
                }
                // Verificar que el usuario autenticado sea uno de los miembros del chat
                // if (chat.usuario1 !== usuarioId && chat.usuario2 !== usuarioId) {
                //   return res.status(403).json({ mensaje: 'No tienes permiso para enviar mensajes en este chat' });
                // }
                // Agregar el mensaje al chat
                const mensaje = {
                    usuario: usuarioId,
                    texto: texto,
                    fechaMsg: Date.now()
                };
                chat.mensajes.push(mensaje);
                yield chat.save();
                return res.json({ chat });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ mensaje: 'Error al enviar el mensaje' });
            }
        });
    }
    ;
    // Obtener todos los mensajes de un chat
    getMensajes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chatId = req.params.chatId;
                // Verificar que el chat exista en la base de datos
                const chat = yield chat_1.Chat.findById(chatId);
                if (!chat) {
                    return res.status(404).json({ mensaje: 'Chat no encontrado' });
                }
                return res.json({ mensajes: chat.mensajes });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ mensaje: 'Error al obtener los mensajes del chat' });
            }
        });
    }
}
exports.default = chatControlador;
//# sourceMappingURL=chat.controlador.js.map