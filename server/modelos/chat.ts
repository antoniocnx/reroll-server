import mongoose, { Schema, model, Document, Date } from "mongoose";

const chatSchema = new mongoose.Schema({
  participantes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }],
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
  participantes: string[];
  mensajes: [{
    usuario: string,
    texto: string,
    fechaMsg: Date
  }];
  fechaChat: Date;
}

export const Chat = model<IChat>('Chat', chatSchema);

// module.exports = mongoose.model('Chat', chatSchema);
