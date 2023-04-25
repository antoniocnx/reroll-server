"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Administrador = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const administradorSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor, indique su nombre']
    },
    apellidos: {
        type: String,
        required: [true, 'Por favor, indique sus apellidos']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Por favor, indique su email']
    },
    password: {
        type: String,
        required: [true, 'Por favor, indique su contraseña']
    },
    nacimiento: {
        type: Date,
        required: [true, 'Por favor, indique su fecha de nacimiento']
    },
    sexo: {
        type: String,
        required: [true, 'Por favor, indique su sexo']
    },
    direccion: {
        type: String,
        required: [true, 'Por favor, indique su dirección']
    },
    ciudad: {
        type: String,
        required: [true, 'Por favor, indique su ciudad']
    },
    localidad: {
        type: String,
        required: [true, 'Por favor, indique su localidad']
    },
    pais: {
        type: String,
        required: [true, 'Por favor, indique su país']
    },
    cp: {
        type: Number,
        required: [true, 'Por favor, indique su código postal']
    },
    avatar: {
        type: String,
        default: 'av-luffy.png'
    }
});
administradorSchema.method('compararPassword', function (pwd = '') {
    if (bcryptjs_1.default.compareSync(pwd, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
exports.Administrador = (0, mongoose_1.model)('Administrador', administradorSchema);
//# sourceMappingURL=administrador.js.map