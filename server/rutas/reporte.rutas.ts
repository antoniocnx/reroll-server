import { Router } from "express";
import { verificaToken } from "../middlewares/autenticacion";
import reporteControlador from "../controladores/reporte.controlador";

const reporteRutas = Router();

reporteRutas.get('' , reporteControlador.prototype.getReportes);
reporteRutas.get('/:id', reporteControlador.prototype.getReporteById);
reporteRutas.post('/:idArticulo', verificaToken, reporteControlador.prototype.postReporte);
reporteRutas.delete('/:id', reporteControlador.prototype.deleteReporte);

export default reporteRutas;