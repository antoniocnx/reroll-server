"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const reporte_controlador_1 = __importDefault(require("../controladores/reporte.controlador"));
const reporteRutas = (0, express_1.Router)();
reporteRutas.get('', reporte_controlador_1.default.prototype.getReportes);
reporteRutas.get('/:id', reporte_controlador_1.default.prototype.getReporteById);
reporteRutas.post('/:idArticulo', autenticacion_1.verificaToken, reporte_controlador_1.default.prototype.postReporte);
reporteRutas.delete('/:id', reporte_controlador_1.default.prototype.deleteReporte);
exports.default = reporteRutas;
//# sourceMappingURL=reporte.rutas.js.map