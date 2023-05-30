import { Server } from "./clases/server";
import mongoose from "mongoose";
import cors from 'cors';

import bodyParser from "body-parser";

import usuarioRutas from "./rutas/usuario.rutas";
import articuloRutas from "./rutas/articulo.rutas";
import administradorRutas from "./rutas/administrador.rutas";
import chatRutas from "./rutas/chat.rutas";
import reporteRutas from "./rutas/reporte.rutas";

import moment from 'moment-timezone';
import express from 'express';

const servidor = new Server();

// Configuración de la zona horaria
moment.tz.setDefault('Europe/Madrid');

// Body parser
servidor.app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
servidor.app.use(bodyParser.json({ limit: '5mb' }));

// PRUEBAS
servidor.app.use(express.json());

// CORS

servidor.app.use(cors({
    origin: true,
    credentials: true
}));

//Rutas de la app
servidor.app.use('/usuario', usuarioRutas);
servidor.app.use('/administrador', administradorRutas);
servidor.app.use('/articulo', articuloRutas);
servidor.app.use('/chat', chatRutas);
servidor.app.use('/reporte', reporteRutas);

//Conexión a la base de datos
mongoose.connect('mongodb+srv://antoniocn:1N50mw4XolmsO4C8@clustertfg.1asoedx.mongodb.net/reroll?retryWrites=true&w=majority', (err) => {
    if (err) {
        throw err;
    } else {
        console.log("Base de Datos ONLINE");
    }
})

// Levanta Express
servidor.start(() => {
    console.log('Servidor Express iniciado en el puerto ' + servidor.port);
});

// Levanta Express
// servidor.start(() => {
//     console.log('Servidor Express iniciado en el puerto ' + servidor.port_app);
// });

// Levanta Socket.IO
// servidor.startSocket(() => {
//     console.log('Servidor Socket.IO conectado en el puerto ' + servidor.port_http);
// });

