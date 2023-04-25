import { Server } from "./clases/server";
import mongoose from "mongoose";
import cors from 'cors';

import dotenv from "dotenv";

import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

import usuarioRutas from "./rutas/usuario.rutas";
import articuloRutas from "./rutas/articulo.rutas";
import administradorRutas from "./rutas/administrador.rutas";
import chatRutas from "./rutas/chat.rutas";

import moment from 'moment-timezone';

const servidor = new Server();

// Configuración de la zona horaria
moment.tz.setDefault('Europe/Madrid');

// Body parser
servidor.app.use(bodyParser.urlencoded({limit:'5mb', extended: true}));
servidor.app.use(bodyParser.json({limit:'5mb'}));

// Variables de entorno
// dotenv.config();
// export const PORT = process.env.PORT || 5000;

// FileUpload
servidor.app.use( fileUpload({ useTempFiles: true }) );

servidor.app.use(cors({
    origin: true,
    credentials: true
}));

//Rutas de la app
servidor.app.use('/usuario', usuarioRutas);
servidor.app.use('/administrador', administradorRutas);
servidor.app.use('/articulo', articuloRutas);
servidor.app.use('/chats', chatRutas);

//Conexión a la base de datos
// mongoose.connect('mongodb://localhost:27017/rerolldb', (err) => {
//     if (err) {
//         throw err;
//     } else {
//         console.log("Base de Datos ONLINE");
//     }
// })

mongoose.connect('mongodb+srv://antoniocn:1N50mw4XolmsO4C8@clustertfg.1asoedx.mongodb.net/reroll?retryWrites=true&w=majority', (err) => {
    if (err) {
        throw err;
    } else {
        console.log("Base de Datos ONLINE");
    }
})


// Levanta express
servidor.start(() => {
    console.log('Servidor iniciado en el puerto ' + servidor.port);
});

