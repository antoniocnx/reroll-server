import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcrypt';

const administradorSchema = new Schema({
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

administradorSchema.method('compararPassword', function(pwd: string = ''): boolean {
    if(bcrypt.compareSync(pwd, this.password)) {
        return true;
    } else {
        return false;
    }
});

export interface IAdministrador extends Document {
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
    avatar: string,

    compararPassword(password: string): boolean;
}

export const Administrador = model<IAdministrador>('Administrador', administradorSchema);