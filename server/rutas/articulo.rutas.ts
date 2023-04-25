import { Request, Response, Router } from "express";
import articuloControlador from "../controladores/articulo.controlador";
import { verificaToken } from '../middlewares/autenticacion';

const articuloRutas = Router();

articuloRutas.get('/get', articuloControlador.prototype.get);
articuloRutas.post('/post', verificaToken, articuloControlador.prototype.post);
articuloRutas.put('/update/:articulo_id', articuloControlador.prototype.update);
articuloRutas.post('/upload', verificaToken, articuloControlador.prototype.upload);
articuloRutas.get('/imagen/:userid/:img', articuloControlador.prototype.getImg);
articuloRutas.delete('/delete/:articulo_id', verificaToken, articuloControlador.prototype.delete);

export default articuloRutas;