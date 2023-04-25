import { Request, Response, Router } from "express";
import { IChat, Chat } from "../modelos/chat";
import Token from '../clases/token';
import { Usuario } from "../modelos/usuario";

class chatControlador {

    // Obtener todos los chats del usuario con sus mensajes
    async getChats(req: Request, res: Response) {
        try {
        const chats = await Chat.find({ participantes: req.params.userId })
                                .populate('participantes', '_id nombre email')
                                .populate('mensajes.usuario', '_id nombre email')
                                .sort({ fechaChat: -1 })
                                .exec();
        res.json(chats);
        } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los chats');
        }
  };
  
  // Crear un nuevo chat con otro usuario
  async createChat(req: any, res: Response) {
    const token1 = req.get('x-token');
    const token2 = req.get('x-token-2');
    
    // const user1 = await Usuario.findOne({ token: token1 });
    // const user2 = await Usuario.findOne({ token: token2 });

    const user1 = await Usuario.findOne({ _id: 'token1' });
    const user2 = await Usuario.findOne({ _id: 'token2' });
    
    if (!user1 || !user2) {
      return res.status(400).json({ ok: false, mensaje: 'Usuarios no encontrados' });
    }

    if (user1._id.equals(user2._id)) {
      return res.status(400).json({ ok: false, mensaje: 'Los usuarios deben ser diferentes', user1, user2 });
    }
    
    // Crear el chat y guardar en la base de datos
    const nuevoChat = new Chat({
      participantes: [user1._id, user2._id],
      mensajes: [],
      fechaChat: Date.now()
    });

    if (req.body.mensajes) {
        nuevoChat.mensajes.push(req.body.mensajes);
    }
    
    await nuevoChat.save();
    
    return res.json({ ok: true, mensaje: 'Chat creado exitosamente', nuevoChat});
  };
  
  // Eliminar un chat
  async deleteChat(req: Request, res: Response) {
    try {
      const chatEliminado = await Chat.findByIdAndDelete(req.params.chatId).exec();
      if (!chatEliminado) {
        res.status(404).send('Chat no encontrado');
      } else {
        res.send('Chat eliminado correctamente');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al eliminar el chat');
    }
  };
  
  // Enviar un mensaje en un chat existente
  async enviarMensaje(req: Request, res: Response) {
    const mensaje = {
      usuario: req.body.usuarioId,
      texto: req.body.texto,
    };
    try {
      const chatActualizado = await Chat.findByIdAndUpdate(
        req.params.chatId,
        { $push: { mensajes: mensaje } },
        { new: true }
      )
        .populate('participantes', '_id nombre email')
        .populate('mensajes.usuario', '_id nombre email')
        .exec();
      if (!chatActualizado) {
        res.status(404).send('Chat no encontrado');
      } else {
        res.json(chatActualizado);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al enviar el mensaje');
    }
  };

}

export default chatControlador;