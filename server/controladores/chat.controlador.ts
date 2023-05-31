import { Request, Response, Router } from "express";
import { IChat, Chat } from "../modelos/chat";
import Token from '../clases/token';
import { Usuario } from "../modelos/usuario";
import { Articulo } from "../modelos/articulo";

class chatControlador {

  // Obtener todos los chats de un usuario
  async getChats(req: Request, res: Response) {
    try {
      const usuarioId = req.params.userId;

      // Verificar que el usuario exista en la base de datos
      const existUsuario = await Usuario.exists({ _id: usuarioId });

      if (!existUsuario) {
        return res.status(400).json({ mensaje: 'El usuario no existe' });
      }

      // Buscar todos los chats en los que el usuario sea participante
      const chats = await Chat.find({
        $or: [{ usuario1: usuarioId }, { usuario2: usuarioId }],
      }).populate('usuario1', 'nombre apellidos email avatar').populate('usuario2', 'nombre apellidos email avatar');

      return res.json({ chats });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener los chats del usuario' });
    }
  };

  // Crear un nuevo chat entre dos usuarios
  async createChat(req: any, res: Response) {
    try {
      const usuario1 = req.usuario._id; // ID del usuario 1 obtenido del middleware
      const usuario2 = req.params.userId; // ID del usuario 2 obtenido por parámetro
      const articulo = req.params.articuloId;

      // Verificar que los usuarios existan en la base de datos
      const existUsuario1 = await Usuario.exists({ _id: usuario1 });
      const existUsuario2 = await Usuario.exists({ _id: usuario2 });

      const existArticulo = await Articulo.exists({ _id: articulo });

      if (!existUsuario1 || !existUsuario2) {
        return res.status(400).json({ mensaje: 'Usuarios no encontrados' });
      }

      if (!existArticulo) {
        return res.status(400).json({ mensaje: 'Artículo no encontrado' });
      }

      // Crear el chat y guardar en la base de datos
      const nuevoChat = new Chat({
        usuario1,
        usuario2: usuario2,
        articulo: articulo,
        mensajes: [],
        fechaChat: Date.now()
      });

      await nuevoChat.save();

      return res.json({ mensaje: 'Chat creado exitosamente', chat: nuevoChat });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear el chat' });
    }
  };

  // Agregar un nuevo mensaje a un chat específico
  async enviarMensaje(req: any, res: Response) {
    try {
      const chatId = req.params.chatId;
      const usuarioId = req.usuario._id; // ID del usuario autenticado obtenido del token
      const texto = req.body.texto;

      // Verificar que el chat exista en la base de datos
      const chat = await Chat.findById(chatId);

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
      await chat.save();

      return res.json({ chat });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al enviar el mensaje' });
    }
  };


  // Obtener todos los mensajes de un chat
  async getMensajes(req: Request, res: Response) {
    try {
      const chatId = req.params.chatId;

      // Verificar que el chat exista en la base de datos
      const chat = await Chat.findById(chatId);

      if (!chat) {
        return res.status(404).json({ mensaje: 'Chat no encontrado' });
      }

      return res.json({ mensajes: chat.mensajes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener los mensajes del chat' });
    }
  }

  // Obtener los datos de un chat
  async getChatInfo(req: Request, res: Response) {
    try {
      const chatId = req.params.chatId;

      // Verificar que el chat exista en la base de datos
      const chat = await Chat.findById(chatId);

      if (!chat) {
        return res.status(404).json({ mensaje: 'Chat no encontrado' });
      }

      // Obtener la información del chat
      const chatInfo = {
        _id: chat._id,
        usuario1: chat.usuario1,
        usuario2: chat.usuario2,
        mensajes: chat.mensajes,
        fechaChat: chat.fechaChat
      };

      return res.json({ chat: chatInfo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener la información del chat' });
    }
  };

  // Comprueba que exista un chat entre dos usuarios por un artículo
  async existeChat(req: Request, res: Response) {
    try {
      const articuloId = req.params.articuloId;
      const usuario1Id = req.params.usuario1Id;
      const usuario2Id = req.params.usuario2Id;

      // Verificar que los usuarios existan en la base de datos
      const existUsuario1 = await Usuario.exists({ _id: usuario1Id });
      const existUsuario2 = await Usuario.exists({ _id: usuario2Id });

      if (!existUsuario1 || !existUsuario2) {
        return res.status(400).json({ mensaje: 'Usuarios no encontrados' });
      }

      const existArticulo = await Articulo.exists({ _id: articuloId });

      if (!existArticulo) {
        return res.status(400).json({ mensaje: 'Artículo no encontrado' });
      }
      
      // Verificar si existe un chat que cumpla las condiciones
      const existeChat = await Chat.exists({
        $or: [
          { usuario1: usuario1Id, usuario2: usuario2Id },
          { usuario1: usuario2Id, usuario2: usuario1Id }
        ],
        articulo: articuloId
      });

      return res.json({ existeChat });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al verificar la existencia del chat' });
    }
  }

}

export default chatControlador;