import { Request, Response, Router } from "express";
import usuarioControlador from "../controladores/usuario.controlador";
import { verificaToken } from "../middlewares/autenticacion";

const usuarioRutas = Router();

usuarioRutas.get('/get', verificaToken, usuarioControlador.prototype.get);
usuarioRutas.post('/create', usuarioControlador.prototype.create);
usuarioRutas.post('/update', verificaToken, usuarioControlador.prototype.update);
usuarioRutas.post('/login', usuarioControlador.prototype.login);
usuarioRutas.post('/:id/favoritos/:articuloId', usuarioControlador.prototype.marcarFavorito);
usuarioRutas.get('/:id/favoritos', usuarioControlador.prototype.getFavoritos);

export default usuarioRutas;