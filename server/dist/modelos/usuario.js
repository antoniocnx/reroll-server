"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuarioSchema = new mongoose_1.Schema({
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
    favoritos: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Articulo' //'Favorito'
        }],
    avatar: {
        type: String,
        default: 'av-luffy.png'
    }
});
// const usuarioSchema = new Schema({
//     nombre: {
//         type: String,
//         required: [true, 'Por favor, indique el nombre']
//     },
//     apellidos: {
//         type: String,
//         required: [true, 'Por favor, indique los apellidos']
//     },
//     email: {
//         type: String,
//         unique: true,
//         required: [true, 'Por favor, indique el email']
//     },
//     password: {
//         type: String,
//         required: [true, 'Por favor, indique la contraseña']
//     },
//     direccion: {
//         calle: {
//             type: String,
//             required: [true, 'Por favor, indique la calle']
//           },
//           numero: {
//             type: Number,
//             required: [true, 'Por favor, indique el número de calle']
//           },
//           adicional: {
//             type: String 
//           },
//           cp: {
//             type: Number,
//             required: [true, 'Por favor, indique el código postal']
//           },
//           provincia: {
//             type: String,
//             required: [true, 'Por favor, indique la provincia']
//           },
//           localidad: {
//             type: String,
//             required: [true, 'Por favor, indique la localidad']
//           }
//     },
//     nacimiento: {
//         type: Date,
//         required: [true, 'Por favor, indique la fecha de nacimiento']
//     },
//     sexo: {
//         type: String,
//         required: [true, 'Por favor, indique el sexo']
//     },
//     avatar: {
//         type: String,
//         default: 'av-luffy.png'
//     }
// });
usuarioSchema.method('compararPassword', function (pwd = '') {
    if (bcryptjs_1.default.compareSync(pwd, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
// export interface IUsuario extends Document {
//     nombre: string,
//     apellidos: string,
//     email: string,
//     password: string,
//     direccion: {
//         calle: string,
//         numero: Number,
//         adicional?: string,
//         cp: Number,
//         provincia: string,
//         localidad: string
//     },
//     nacimiento: Date,
//     sexo: string,
//     avatar: string,
//     compararPassword(password: string): boolean;
// }
exports.Usuario = (0, mongoose_1.model)('Usuario', usuarioSchema);
//# sourceMappingURL=usuario.js.map