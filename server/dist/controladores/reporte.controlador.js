"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reporte_1 = require("../modelos/reporte");
class reporteControlador {
    // getReportes(req: Request, res: Response) {
    //   Reporte.find()
    //     .populate('articulo')
    //     .populate('usuario')
    //     .exec((err, reportes) => {
    //       if (err) {
    //         return res.status(500).json({ error: 'Error al obtener los reportes' });
    //       }
    //       res.json(reportes);
    //     });
    // }
    getReportes(req, res) {
        reporte_1.Reporte.find()
            .populate({
            path: 'articulo',
            populate: {
                path: 'usuario'
            }
        })
            .populate('usuario')
            .exec((err, reportes) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener los reportes' });
            }
            res.json(reportes);
        });
    }
    getReporteById(req, res) {
        const id = req.params.id;
        reporte_1.Reporte.findById(id)
            .populate('articulo')
            .populate('usuario')
            .exec((err, reporte) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener el reporte' });
            }
            if (!reporte) {
                return res.status(404).json({ error: 'Reporte no encontrado' });
            }
            res.json(reporte);
        });
    }
    postReporte(req, res) {
        const idArticulo = req.params.idArticulo;
        const usuarioId = req.usuario._id;
        const motivo = req.body.motivo;
        // Verificar si el usuario ya ha reportado este artículo
        reporte_1.Reporte.findOne({ articulo: idArticulo, usuario: usuarioId }, (err, reporteExistente) => {
            if (err) {
                return res.status(500).json({ error: 'Error al verificar el reporte existente' });
            }
            if (reporteExistente) {
                return res.status(400).json({ error: 'El usuario ya ha reportado este artículo' });
            }
            // Si no existe un reporte previo, crear y guardar el nuevo reporte
            const nuevoReporte = new reporte_1.Reporte({
                articulo: idArticulo,
                usuario: usuarioId,
                motivo: motivo
            });
            nuevoReporte.save((err, reporteGuardado) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al guardar el reporte' });
                }
                res.json(reporteGuardado);
            });
        });
    }
    deleteReporte(req, res) {
        const id = req.params.id;
        reporte_1.Reporte.findByIdAndDelete(id, (err, reporteEliminado) => {
            if (err) {
                return res.status(500).json({ error: 'Error al eliminar el reporte' });
            }
            if (!reporteEliminado) {
                return res.status(404).json({ error: 'Reporte no encontrado' });
            }
            res.json(reporteEliminado);
        });
    }
}
exports.default = reporteControlador;
//# sourceMappingURL=reporte.controlador.js.map