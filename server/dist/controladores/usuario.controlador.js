"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = require("../modelos/usuario");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../clases/token"));
// import { Direccion } from "../interfaces/direccion";
class usuarioControlador {
    get(req, res) {
        const usuario = req.usuario;
        res.json({
            ok: true,
            usuario
        });
    }
    ;
    create(req, res) {
        const user = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            email: req.body.email,
            password: bcrypt_1.default.hashSync(req.body.password, 10),
            nacimiento: req.body.nacimiento,
            sexo: req.body.sexo,
            direccion: req.body.direccion,
            ciudad: req.body.ciudad,
            localidad: req.body.localidad,
            pais: req.body.pais,
            cp: req.body.cp,
            favoritos: req.body.favoritos,
            avatar: req.body.avatar
        };
        usuario_1.Usuario.create(user).then(userDB => {
            const tokenUser = token_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                apellidos: userDB.apellidos,
                email: userDB.email,
                nacimiento: userDB.nacimiento,
                sexo: userDB.sexo,
                direccion: userDB.direccion,
                ciudad: userDB.ciudad,
                localidad: userDB.localidad,
                pais: userDB.pais,
                cp: userDB.cp,
                favoritos: userDB.favoritos,
                avatar: userDB.avatar
            });
            if (user) {
                return res.status(200).json({
                    status: 'Ok',
                    message: `El usuario ${userDB.email} ha sido creado correctamente.`,
                    token: tokenUser
                });
            }
            else {
                return res.status(500).json({
                    status: 'Fail',
                    message: 'No hay usuario'
                });
            }
        });
    }
    ;
    update(req, res) {
        const user = {
            nombre: req.body.nombre || req.usuario.nombre,
            apellidos: req.body.apellidos || req.usuario.apellidos,
            email: req.body.email || req.usuario.email,
            password: req.body.password || req.usuario.password,
            nacimiento: req.body.nacimiento || req.usuario.nacimiento,
            sexo: req.body.sexo || req.usuario.sexo,
            direccion: req.body.direccion || req.usuario.direccion,
            ciudad: req.body.ciudad || req.usuario.ciudad,
            localidad: req.body.localidad || req.usuario.localidad,
            pais: req.body.pais || req.usuario.pais,
            cp: req.body.cp || req.usuario.cp,
            avatar: req.body.avatar || req.usuario.avatar
        };
        usuario_1.Usuario.findByIdAndUpdate(req.usuario._id, user, { new: true }, (err, userDB) => {
            if (err)
                throw err;
            if (!userDB) {
                return res.json({
                    ok: false,
                    mensaje: 'No existe un usuario con ese ID'
                });
            }
            const tokenUser = token_1.default.getJwtToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                apellidos: userDB.apellidos,
                email: userDB.email,
                nacimiento: userDB.nacimiento,
                sexo: userDB.sexo,
                direccion: userDB.direccion,
                ciudad: userDB.ciudad,
                localidad: userDB.localidad,
                pais: userDB.pais,
                cp: userDB.cp,
                favoritos: userDB.favoritos,
                avatar: userDB.avatar
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        });
    }
    login(req, res) {
        const body = req.body;
        usuario_1.Usuario.findOne({ email: body.email }, (err, userDB) => {
            if (err)
                throw err;
            if (!userDB) {
                return res.json({
                    ok: false,
                    mensaje: 'El usuario no existe'
                });
            }
            if (userDB.compararPassword(body.password)) {
                const tokenUser = token_1.default.getJwtToken({
                    _id: userDB._id,
                    nombre: userDB.nombre,
                    apellidos: userDB.apellidos,
                    email: userDB.email,
                    nacimiento: userDB.nacimiento,
                    sexo: userDB.sexo,
                    direccion: userDB.direccion,
                    ciudad: userDB.ciudad,
                    localidad: userDB.localidad,
                    pais: userDB.pais,
                    cp: userDB.cp,
                    favoritos: userDB.favoritos,
                    avatar: userDB.avatar
                });
                res.json({
                    ok: true,
                    token: tokenUser
                });
            }
            else {
                return res.json({
                    ok: false,
                    mensaje: 'La contraseña es incorrecta'
                });
            }
        });
    }
    ;
}
exports.default = usuarioControlador;
