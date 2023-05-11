import { Request, Response, Router } from "express";
import usuarioControlador from "../controladores/usuario.controlador";
import { verificaToken } from "../middlewares/autenticacion";

const usuarioRutas = Router();

usuarioRutas.get('/get', verificaToken, usuarioControlador.prototype.get);
usuarioRutas.post('/create', usuarioControlador.prototype.create);
usuarioRutas.post('/update', verificaToken, usuarioControlador.prototype.update);
usuarioRutas.post('/login', usuarioControlador.prototype.login);
usuarioRutas.get('/favoritos', verificaToken, usuarioControlador.prototype.getFavoritos);
usuarioRutas.post('/favoritos/:articuloId', verificaToken, usuarioControlador.prototype.marcarFavorito);

// WIP VALORACIONES

usuarioRutas.get('/valoraciones', verificaToken, usuarioControlador.prototype.getValoraciones);
usuarioRutas.post('/:idUsuario/valoraciones', verificaToken, usuarioControlador.prototype.valorar);

//
export default usuarioRutas;