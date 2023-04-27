import mongoose, { Schema, model, Document } from "mongoose";
import bcryptjs from 'bcryptjs';
import { Direccion } from '../interfaces/direccion';
import { Articulo } from "./articulo";

const usuarioSchema = new Schema({
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
        type: mongoose.Schema.Types.ObjectId,
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
//     direccion: [{
//         calle: {
//             type: String,
//             required: [true, 'Por favor, indique la calle']
//           },
//           provincia: {
//             type: String,
//             required: [true, 'Por favor, indique la provincia']
//           },
//           localidad: {
//             type: String,
//             required: [true, 'Por favor, indique la localidad']
//           },
//           pais: {
//             type: String,
//             required: [true, 'Por favor, indique el país']
//           },
//           cp: {
//             type: Number,
//             required: [true, 'Por favor, indique el código postal']
//           }
//     }],
//     nacimiento: {
//         type: Date,
//         required: [true, 'Por favor, indique la fecha de nacimiento']
//     },
//     sexo: {
//         type: String,
//         required: [true, 'Por favor, indique el sexo']
//     },
//     favoritos: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Articulo' //'Favorito'
//     }],
//     avatar: {
//         type: String,
//         default: 'av-luffy.png'
//     }
// });

usuarioSchema.method('compararPassword', function(pwd: string = ''): boolean {
    if(bcryptjs.compareSync(pwd, this.password)) {
        return true;
    } else {
        return false;
    }
});

export interface IUsuario extends Document {
    nombre: string,
    apellidos: string,
    email: string,
    password: string,
    nacimiento: Date,
    sexo: string,
    direccion: string,
    ciudad: string,
    localidad: string,
    pais: string,
    cp: number,
    favoritos: typeof Articulo[], // 'Favorito[]'
    avatar: string,

    compararPassword(password: string): boolean;
}

// export interface IUsuario extends Document {
//     nombre: string,
//     apellidos: string,
//     email: string,
//     password: string,
//     nacimiento: Date,
//     sexo: string,
//     direccion: [{
//         calle: string,
//         provincia: string,
//         localidad: string
//         pais: string,
//         cp: Number,
//     }],
//     favoritos: typeof Articulo[], // 'Favorito[]'
//     avatar: string,

//     compararPassword(password: string): boolean;
// }

export const Usuario = model<IUsuario>('Usuario', usuarioSchema);