import { Request, Response, Router } from "express";
import { IAdministrador, Administrador } from "../modelos/administrador";
import bcryptjs from "bcryptjs";
import TokenAdmin from '../clases/token-admin';

class administradorControlador {

    // Obtener todos los administrador
    async getAdmins(req: Request, res: Response) {
        try {
            const admins = await Administrador.find();
            res.json(admins);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los administradores' });
        }
    };

    // Obtener un administrador
    get(req: any, res: Response) {

        const admin = req.admin;

        res.json({
            ok: true,
            admin
        });

    };

    create(req: Request, res: Response) {
        const admin = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            nacimiento: req.body.nacimiento,
            sexo: req.body.sexo,
            direccion: req.body.direccion,
            ciudad: req.body.ciudad,
            localidad: req.body.localidad,
            pais: req.body.pais,
            cp: req.body.cp,
            avatar: req.body.avatar
        };

        Administrador.create(admin).then(adminDB => {

            const tokenAdmin = TokenAdmin.getJwtTokenAdmin({
                _id: adminDB._id,
                nombre: adminDB.nombre,
                apellidos: adminDB.apellidos,
                email: adminDB.email,
                nacimiento: adminDB.nacimiento,
                sexo: adminDB.sexo,
                direccion: adminDB.direccion,
                ciudad: adminDB.ciudad,
                localidad: adminDB.localidad,
                pais: adminDB.pais,
                cp: adminDB.cp,
                avatar: adminDB.avatar
            });

            if (admin) {
                return res.status(200).json({
                    status: 'Ok',
                    message: `El administrador ${adminDB.email} ha sido creado correctamente.`,
                    token: tokenAdmin
                });
            } else {
                return res.status(500).json({
                    status: 'Fail',
                    message: 'No hay administrador'
                });
            }
        })
    };

    update(req: any, res: Response) {
        const admin = {
            nombre: req.body.nombre || req.admin.nombre,
            apellidos: req.body.apellidos || req.admin.apellidos,
            email: req.body.email || req.admin.email,
            password: req.body.password || req.admin.password,
            nacimiento: req.body.nacimiento || req.admin.nacimiento,
            sexo: req.body.sexo || req.admin.sexo,
            direccion: req.body.direccion || req.admin.direccion,
            ciudad: req.body.ciudad || req.admin.ciudad,
            localidad: req.body.localidad || req.admin.localidad,
            pais: req.body.pais || req.admin.pais,
            cp: req.body.cp || req.admin.cp,
            avatar: req.body.avatar || req.admin.avatar
        }

        Administrador.findByIdAndUpdate(req.admin._id, admin, { new: true }, (err, adminDB) => {

            if (err) throw err;

            if (!adminDB) {
                return res.json({
                    ok: false,
                    mensaje: 'No existe un administrador con ese ID'
                });
            }

            const tokenAdmin = TokenAdmin.getJwtTokenAdmin({
                _id: adminDB._id,
                nombre: adminDB.nombre,
                apellidos: adminDB.apellidos,
                email: adminDB.email,
                nacimiento: adminDB.nacimiento,
                sexo: adminDB.sexo,
                direccion: adminDB.direccion,
                ciudad: adminDB.ciudad,
                localidad: adminDB.localidad,
                pais: adminDB.pais,
                cp: adminDB.cp,
                avatar: adminDB.avatar
            });

            res.json({
                ok: true,
                token: tokenAdmin
            });
        });
    }

    login(req: Request, res: Response) {
        const body = req.body;
        Administrador.findOne({ email: body.email }, (err: any, adminDB: IAdministrador) => {
            if (err) throw err;
            if (!adminDB) {
                return res.json({
                    ok: false,
                    mensaje: 'El administrador no existe'
                });
            }
            if (adminDB.compararPassword(body.password)) {
                const tokenAdmin = TokenAdmin.getJwtTokenAdmin({
                    _id: adminDB._id,
                    nombre: adminDB.nombre,
                    apellidos: adminDB.apellidos,
                    email: adminDB.email,
                    nacimiento: adminDB.nacimiento,
                    sexo: adminDB.sexo,
                    direccion: adminDB.direccion,
                    ciudad: adminDB.ciudad,
                    localidad: adminDB.localidad,
                    pais: adminDB.pais,
                    cp: adminDB.cp,
                    avatar: adminDB.avatar
                });
                res.json({
                    ok: true,
                    token: tokenAdmin
                });
            } else {
                return res.json({
                    ok: false,
                    mensaje: 'La contraseña es incorrecta'
                });
            }
        })
    };

    async delete(req: any, res: Response) {
        try {
          const adminId = req.admin._id;
      
          // Buscar y eliminar el admin por su ID
          const adminEliminado = await Administrador.findByIdAndDelete(adminId);
      
          if (!adminEliminado) {
            return res.status(404).json({ mensaje: 'Administrador no encontrado' });
          }
      
          return res.status(200).json({ mensaje: 'Administrador eliminado exitosamente' });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ mensaje: 'Error al eliminar el administrador' });
        }
      }


}

export default administradorControlador;
