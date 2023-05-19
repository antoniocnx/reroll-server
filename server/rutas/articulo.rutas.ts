import { Router } from "express";
import articuloControlador from "../controladores/articulo.controlador";
import { verificaToken } from '../middlewares/autenticacion';

import { upload } from "../middlewares/multer";


const articuloRutas = Router();

articuloRutas.get('/get', articuloControlador.prototype.get);
articuloRutas.get('/:id', articuloControlador.prototype.getById);
articuloRutas.post('/post', upload.array('files', 10), verificaToken, articuloControlador.prototype.post);
articuloRutas.put('/:id', verificaToken, articuloControlador.prototype.update);
// articuloRutas.delete('/delete/:articulo_id', verificaToken, articuloControlador.prototype.delete);
articuloRutas.delete('/delete/:articulo_id', articuloControlador.prototype.delete);


export default articuloRutas;