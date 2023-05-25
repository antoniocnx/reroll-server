
import { Schema, Document, model } from 'mongoose';

const articuloSchema = new Schema({
    // Fecha de creación
    fecha: {
        type: Date
    },
    // Titulo
    nombre: {
        type: String
    },
    // Precio
    precio: {
        type: Number
    },
    // Categoría
    categoria: {
        type: String
    },
    // Mensaje
    descripcion: {
        type: String
    },
    // Estado de disponibilidad: Disponible, Reservado y Vendido
    estado: {
        type: String
    },
    // Tipo de envío: Domicilio y Presencial
    envio: {
        type: String
    },
    // Imágenes
    galeria: [{
        type: String
    }],
    // Usuario vendedor
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'Debe de existir una referencia a un usuario' ]
    }
});

// Fecha de la creación del articulo de forma automática
articuloSchema.pre<IArticulo>('save', function( next ) {
    this.fecha = new Date();
    next();
});

interface IArticulo extends Document {
    fecha: Date;
    nombre: string;
    precio: Number;
    categoria: string;
    descripcion: string;
    estado: string;
    envio: string;
    galeria: string[];
    usuario: string;
}

export const Articulo = model<IArticulo>('Articulo', articuloSchema);
