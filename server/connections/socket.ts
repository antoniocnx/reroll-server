import { Server } from 'socket.io';
import { Chat } from '../modelos/chat';

export const configSocket = (io: Server) => {
    io.on('connection', (socket) => {
        console.log('Cliente conectado ' + socket.id);
        socket.on('disconnect', () => {
            console.log('Cliente desconectado ' + socket.id);
        })
        // socket.on('joinChat', (id_user1: string, id_user2: string) => {
        //     socket.join(id_user1 + id_user2);
        // })
        socket.on('joinChat', (id_chat: string) => {
            socket.join(id_chat);
            console.log('Se unió al chat ' + id_chat);
        })
        socket.on('mensaje', async(usuario: string, texto: string, chatId: string) => {
            try {
                const mensaje = {
                    usuario: usuario,
                    texto: texto,
                    fechaMsg: Date.now()
                };
                console.log('MENSAJE ', mensaje)

                const chat = await Chat.findById(chatId);

                if (!chat) {
                  return;
                }

                chat.mensajes.push(mensaje);
                await chat.save();

                io.to(chatId).emit('mensaje', mensaje);
            } catch(e) {
                console.log(e);
            }
        })
    })
}