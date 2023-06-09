import { Router } from "express";
import usuarioControlador from "../controladores/usuario.controlador";
import { verificaToken } from "../middlewares/autenticacion";

const usuarioRutas = Router();

usuarioRutas.get('', usuarioControlador.prototype.getUsuarios);
usuarioRutas.get('/get', verificaToken, usuarioControlador.prototype.get);
// usuarioRutas.get('/:id', usuarioControlador.prototype.getById);
usuarioRutas.post('/create', usuarioControlador.prototype.create);
usuarioRutas.post('/update', verificaToken, usuarioControlador.prototype.update);
usuarioRutas.post('/login', usuarioControlador.prototype.login);
usuarioRutas.delete('', verificaToken, usuarioControlador.prototype.delete);
usuarioRutas.get('/favoritos', verificaToken, usuarioControlador.prototype.getFavoritos);
usuarioRutas.post('/favoritos/:articuloId', verificaToken, usuarioControlador.prototype.marcarFavorito);
usuarioRutas.get('/valoraciones/:id', usuarioControlador.prototype.getValoraciones);
usuarioRutas.post('/:idUsuario/valoracion', verificaToken, usuarioControlador.prototype.valorar);

export default usuarioRutas;