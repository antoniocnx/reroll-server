import mongoose, { Schema, model, Document, Date } from "mongoose";

const chatSchema = new mongoose.Schema({
  usuario1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  usuario2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  mensajes: [{
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
    },
    texto: {
      type: String,
      required: true
    },
    fechaMsg: {
      type: Date,
      default: Date.now
    }
  }],
  fechaChat: {
    type: Date,
    default: Date.now
  }
});

export interface IChat extends Document {
  usuario1: string;
  usuario2: string;
  mensajes: [{
    usuario: string,
    texto: string,
    fechaMsg: Number
  }];
  fechaChat: Date;
}

export const Chat = model<IChat>('Chat', chatSchema);
