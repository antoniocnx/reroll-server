import mongoose, { Schema, model, Document } from "mongoose";
import { Articulo } from './articulo';
import { Usuario } from "./usuario";

const reporteSchema = new Schema({
    articulo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Articulo'
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    motivo: {
        type: String,
        required: [true, 'Por favor, indique el motivo del reporte']
    }
});

export interface IReporte extends Document {
    articulo: typeof Articulo,
    usuario: typeof Usuario,
    motivo: string
}

export const Reporte = model<IReporte>('Reporte', reporteSchema);