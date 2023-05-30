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
exports.configSocket = void 0;
const chat_1 = require("../modelos/chat");
const configSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('Cliente conectado ' + socket.id);
        socket.on('disconnect', () => {
            console.log('Cliente desconectado ' + socket.id);
        });
        // socket.on('joinChat', (id_user1: string, id_user2: string) => {
        //     socket.join(id_user1 + id_user2);
        // })
        socket.on('joinChat', (id_chat) => {
            socket.join(id_chat);
            console.log('Se unió al chat ' + id_chat);
        });
        socket.on('mensaje', (usuario, texto, chatId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const mensaje = {
                    usuario: usuario,
                    texto: texto,
                    fechaMsg: Date.now()
                };
                console.log('MENSAJE ', mensaje);
                const chat = yield chat_1.Chat.findById(chatId);
                if (!chat) {
                    return;
                }
                chat.mensajes.push(mensaje);
                yield chat.save();
                io.to(chatId).emit('mensaje', mensaje);
            }
            catch (e) {
                console.log(e);
            }
        }));
    });
};
exports.configSocket = configSocket;
//# sourceMappingURL=socket.js.map