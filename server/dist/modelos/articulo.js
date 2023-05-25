"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Articulo = void 0;
const mongoose_1 = require("mongoose");
const articuloSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de existir una referencia a un usuario']
    }
});
// Fecha de la creación del articulo de forma automática
articuloSchema.pre('save', function (next) {
    this.fecha = new Date();
    next();
});
exports.Articulo = (0, mongoose_1.model)('Articulo', articuloSchema);
//# sourceMappingURL=articulo.js.map