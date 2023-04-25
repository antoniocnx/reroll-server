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
    // Obtener todos los chats del usuario con sus mensajes
    getChats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chats = yield chat_1.Chat.find({ participantes: req.params.userId })
                    .populate('participantes', '_id nombre email')
                    .populate('mensajes.usuario', '_id nombre email')
                    .sort({ fechaChat: -1 })
                    .exec();
                res.json(chats);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Error al obtener los chats');
            }
        });
    }
    ;
    // Crear un nuevo chat con otro usuario
    createChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token1 = req.get('x-token');
            const token2 = req.get('x-token-2');
            // const user1 = await Usuario.findOne({ token: token1 });
            // const user2 = await Usuario.findOne({ token: token2 });
            const user1 = yield usuario_1.Usuario.findOne({ _id: 'token1' });
            const user2 = yield usuario_1.Usuario.findOne({ _id: 'token2' });
            if (!user1 || !user2) {
                return res.status(400).json({ ok: false, mensaje: 'Usuarios no encontrados' });
            }
            if (user1._id.equals(user2._id)) {
                return res.status(400).json({ ok: false, mensaje: 'Los usuarios deben ser diferentes', user1, user2 });
            }
            // Crear el chat y guardar en la base de datos
            const nuevoChat = new chat_1.Chat({
                participantes: [user1._id, user2._id],
                mensajes: [],
                fechaChat: Date.now()
            });
            if (req.body.mensajes) {
                nuevoChat.mensajes.push(req.body.mensajes);
            }
            yield nuevoChat.save();
            return res.json({ ok: true, mensaje: 'Chat creado exitosamente', nuevoChat });
        });
    }
    ;
    // Eliminar un chat
    deleteChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chatEliminado = yield chat_1.Chat.findByIdAndDelete(req.params.chatId).exec();
                if (!chatEliminado) {
                    res.status(404).send('Chat no encontrado');
                }
                else {
                    res.send('Chat eliminado correctamente');
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Error al eliminar el chat');
            }
        });
    }
    ;
    // Enviar un mensaje en un chat existente
    enviarMensaje(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const mensaje = {
                usuario: req.body.usuarioId,
                texto: req.body.texto,
            };
            try {
                const chatActualizado = yield chat_1.Chat.findByIdAndUpdate(req.params.chatId, { $push: { mensajes: mensaje } }, { new: true })
                    .populate('participantes', '_id nombre email')
                    .populate('mensajes.usuario', '_id nombre email')
                    .exec();
                if (!chatActualizado) {
                    res.status(404).send('Chat no encontrado');
                }
                else {
                    res.json(chatActualizado);
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Error al enviar el mensaje');
            }
        });
    }
    ;
}
exports.default = chatControlador;
