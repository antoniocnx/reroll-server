"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    // Fecha de creación
    created: {
        type: Date
    },
    // Mensaje
    mensaje: {
        type: String
    },
    // Imágenes
    imgs: [{
            type: String
        }],
    // Coordenadas
    coords: {
        type: String // -13.313123, 12.3123123
    },
    // Usuario que crea el post
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de existir una referencia a un usuario']
    }
});
// Fecha de la creación del post de forma automática
postSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Post = (0, mongoose_1.model)('Post', postSchema);
