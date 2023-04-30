import { Request, Response, Router } from "express";
import articuloControlador from "../controladores/articulo.controlador";
import { verificaToken } from '../middlewares/autenticacion';

const articuloRutas = Router();

articuloRutas.get('/get', articuloControlador.prototype.get);
articuloRutas.get('/:id', articuloControlador.prototype.getById);
articuloRutas.post('/post', verificaToken, articuloControlador.prototype.post);
articuloRutas.put('/:id', verificaToken, articuloControlador.prototype.update);
articuloRutas.delete('/delete/:articulo_id', verificaToken, articuloControlador.prototype.delete);
articuloRutas.post('/upload', verificaToken, articuloControlador.prototype.upload);
articuloRutas.get('/imagen/:userid/:img', articuloControlador.prototype.getImg);

export default articuloRutas;