import { Request, Response, Router } from "express";
import administradorControlador from "../controladores/administrador.controlador";
import { verificaTokenAdmin } from "../middlewares/autenticacion";

const administradorRutas = Router();

administradorRutas.get('', administradorControlador.prototype.getAdmins);
administradorRutas.get('/get', verificaTokenAdmin, administradorControlador.prototype.get);
administradorRutas.post('/create', administradorControlador.prototype.create);
administradorRutas.post('/update', verificaTokenAdmin, administradorControlador.prototype.update);
administradorRutas.post('/login', administradorControlador.prototype.login);
administradorRutas.delete('', verificaTokenAdmin, administradorControlador.prototype.delete);

export default administradorRutas;