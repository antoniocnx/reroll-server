"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = require("../modelos/usuario");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_1 = __importDefault(require("../clases/token"));
const articulo_1 = require("../modelos/articulo");
// import { Direccion } from "../interfaces/direccion";
class usuarioControlador {
    // Obtener todos los usuarios
    getUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield usuario_1.Usuario.find();
                res.json(usuarios);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener los usuarios' });
            }
        });
    }
    ;
    // Obtener un usuario
    get(req, res) {
        const usuario = req.usuario;
        res.json({
            ok: true,
            usuario
        });
    }
    ;
    // async getById(req: any, res: Response) {
    //   const usuarioId = req.params.id;
    //   try {
    //     const usuario = await Usuario.findById(usuarioId);
    //     if (!usuario) {
    //       return res.status(404).json({
    //         ok: false,
    //         mensaje: 'Usuario no encontrado'
    //       });
    //     }
    //     res.json({
    //       ok: true,
    //       usuario
    //     });
    //   } catch (error: any) {
    //     res.status(500).json({
    //       ok: false,
    //       mensaje: 'Error al obtener el usuario',
    //       error: error.message
    //     });
    //   }
    // }
    create(req, res) {
        const user = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            email: req.body.email,
            password: bcryptjs_1.default.hashSync(req.body.password, 10),
            nacimiento: req.body.nacimiento,
            sexo: req.body.sexo,
            direccion: req.body.direccion,
            ciudad: req.body.ciudad,
            localidad: req.body.localidad,
            pais: req.body.pais,
            cp: req.body.cp,
            // favoritos: req.body.favoritos,
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
                // favoritos: userDB.favoritos,
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
    marcarFavorito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarioId = req.usuario._id;
                const articuloId = req.params.articuloId;
                const usuario = yield usuario_1.Usuario.findById(usuarioId);
                if (!usuario) {
                    return res.status(404).json({
                        ok: false,
                        mensaje: 'Usuario no encontrado'
                    });
                }
                const articulo = yield articulo_1.Articulo.findById(articuloId);
                if (!articulo) {
                    return res.status(404).json({
                        ok: false,
                        mensaje: 'Artículo no encontrado'
                    });
                }
                const index = usuario.favoritos.indexOf(articulo._id);
                if (index !== -1) {
                    usuario.favoritos.splice(index, 1);
                    yield usuario.save();
                    return res.json({
                        ok: true,
                        mensaje: 'Artículo eliminado de favoritos'
                    });
                }
                usuario.favoritos.push(articulo._id);
                yield usuario.save();
                res.json({
                    ok: true,
                    mensaje: 'Artículo agregado a favoritos'
                });
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error al marcar como favorito',
                    error: error.message
                });
            }
        });
    }
    // Obtener todos los artículos favoritos de un usuario
    getFavoritos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarioId = req.usuario._id;
                const usuario = yield usuario_1.Usuario.findById(usuarioId).populate('favoritos').exec();
                if (!usuario) {
                    return res.status(404).json({
                        ok: false,
                        mensaje: 'Usuario no encontrado',
                    });
                }
                res.json({
                    ok: true,
                    favoritos: usuario.favoritos,
                });
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error al obtener los favoritos del usuario',
                    error: error.message,
                });
            }
        });
    }
    ;
    getValoraciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioId = req.params.id;
            try {
                const usuario = yield usuario_1.Usuario.findById(usuarioId).populate({ path: 'valoracion.usuario', model: 'Usuario' }).exec();
                if (!usuario) {
                    return res.status(404).json({
                        ok: false,
                        mensaje: 'Usuario no encontrado'
                    });
                }
                res.json({
                    ok: true,
                    valoraciones: usuario.valoracion,
                });
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error al obtener los favoritos del usuario',
                    error: error.message,
                });
            }
        });
    }
    ;
    valorar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUsuario = req.params.idUsuario;
                const idUsuarioValorador = req.usuario._id;
                const puntuacion = req.body.puntuacion;
                const comentario = req.body.comentario;
                const usuario = yield usuario_1.Usuario.findById(idUsuario);
                if (!usuario) {
                    return res.status(404).json({
                        ok: false,
                        mensaje: 'Usuario no encontrado',
                    });
                }
                const valoracionExistente = usuario.valoracion.find((val) => val.usuario.toString() === idUsuarioValorador);
                if (valoracionExistente) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'El usuario ya ha valorado a este usuario anteriormente',
                    });
                }
                const valoracion = {
                    usuario: idUsuarioValorador,
                    puntuacion: puntuacion,
                    comentario: comentario,
                };
                usuario.valoracion.push(valoracion);
                yield usuario.save();
                res.json({
                    ok: true,
                    mensaje: 'Valoración añadida correctamente',
                });
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error al agregar valoración al usuario',
                    error: error.message,
                });
            }
        });
    }
    ;
}
exports.default = usuarioControlador;
//# sourceMappingURL=usuario.controlador.js.map