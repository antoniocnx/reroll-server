import { Response, Request } from 'express';
import Token from '../clases/token';
import { IReporte, Reporte } from '../modelos/reporte';

class reporteControlador {

    getReportes(req: Request, res: Response) {
        Reporte.find()
          .populate('articulo')
          .populate('usuario')
          .exec((err, reportes) => {
            if (err) {
              return res.status(500).json({ error: 'Error al obtener los reportes' });
            }
            res.json(reportes);
          });
      }
    
      getReporteById(req: Request, res: Response) {
        const id = req.params.id;
    
        Reporte.findById(id)
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
    
      postReporte(req: any, res: Response) {
        const idArticulo = req.params.idArticulo;
        const usuarioId = req.usuario._id;
      
        const motivo = req.body.motivo;
      
        // Verificar si el usuario ya ha reportado este artículo
        Reporte.findOne({ articulo: idArticulo, usuario: usuarioId }, (err: any, reporteExistente: IReporte) => {
          if (err) {
            return res.status(500).json({ error: 'Error al verificar el reporte existente' });
          }
      
          if (reporteExistente) {
            return res.status(400).json({ error: 'El usuario ya ha reportado este artículo' });
          }
      
          // Si no existe un reporte previo, crear y guardar el nuevo reporte
          const nuevoReporte: IReporte = new Reporte({
            articulo: idArticulo,
            usuario: usuarioId,
            motivo: motivo
          });
      
          nuevoReporte.save((err: any, reporteGuardado: IReporte) => {
            if (err) {
              return res.status(500).json({ error: 'Error al guardar el reporte' });
            }
            res.json(reporteGuardado);
          });
        });
      }
    
      deleteReporte(req: Request, res: Response) {
        const id = req.params.id;
    
        Reporte.findByIdAndDelete(id, (err, reporteEliminado) => {
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

export default reporteControlador;