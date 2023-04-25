import { Request, Response, Router } from "express";
import { IUsuario, Usuario } from "../modelos/usuario";
import bcryptjs from "bcryptjs";
import Token from '../clases/token';
// import { Direccion } from "../interfaces/direccion";

class usuarioControlador {

    get(req: any, res: Response) {

        const usuario = req.usuario;
    
        res.json({
            ok: true,
            usuario
        });
    
    };

    create(req: Request, res: Response) {
        const user = {
            nombre   : req.body.nombre,
            apellidos   : req.body.apellidos,
            email    : req.body.email,
            password : bcryptjs.hashSync(req.body.password, 10),
            nacimiento   : req.body.nacimiento,
            sexo   : req.body.sexo,
            direccion   : req.body.direccion,
            ciudad   : req.body.ciudad,
            localidad   : req.body.localidad,
            pais   : req.body.pais,
            cp   : req.body.cp,
            favoritos   : req.body.favoritos,
            avatar   : req.body.avatar
        };
    
        Usuario.create( user ).then(userDB => {
            
            const tokenUser = Token.getJwtToken({
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
            
            if(user) {
                return res.status(200).json({
                    status: 'Ok',
                    message: `El usuario ${userDB.email} ha sido creado correctamente.`,
                    token: tokenUser
                });
            } else {
                return res.status(500).json({
                    status: 'Fail',
                    message: 'No hay usuario'
                });
            }
        })
    };

    update(req: any, res: Response) {
        const user = {
            nombre: req.body.nombre || req.usuario.nombre,
            apellidos: req.body.apellidos || req.usuario.apellidos,
            email : req.body.email  || req.usuario.email,
            password : req.body.password  || req.usuario.password,
            nacimiento: req.body.nacimiento || req.usuario.nacimiento,
            sexo: req.body.sexo || req.usuario.sexo,
            direccion: req.body.direccion || req.usuario.direccion,
            ciudad : req.body.ciudad  || req.usuario.ciudad,
            localidad : req.body.localidad  || req.usuario.localidad,
            pais : req.body.pais  || req.usuario.pais,
            cp : req.body.cp  || req.usuario.cp,
            avatar: req.body.avatar || req.usuario.avatar
        }

        Usuario.findByIdAndUpdate( req.usuario._id, user, { new: true }, (err, userDB) => {

            if ( err ) throw err;

            if ( !userDB ) {
                return res.json({
                    ok: false,
                    mensaje: 'No existe un usuario con ese ID'
                });
            }

            const tokenUser = Token.getJwtToken({
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

    login(req: Request, res: Response) {
        const body = req.body;
        Usuario.findOne({ email: body.email }, ( err: any, userDB: IUsuario ) => {
            if ( err ) throw err;
            if ( !userDB ) {
                return res.json({
                    ok: false,
                    mensaje: 'El usuario no existe'
                });
            }
            if ( userDB.compararPassword( body.password ) ) {
                const tokenUser = Token.getJwtToken({
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
            } else {
                return res.json({
                    ok: false,
                    mensaje: 'La contraseña es incorrecta'
                });
            }
        })
    };
    
}

export default usuarioControlador;
