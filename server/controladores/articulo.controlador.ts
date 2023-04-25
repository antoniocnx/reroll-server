import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Articulo } from '../modelos/articulo';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../clases/file-system';
import { Usuario } from '../modelos/usuario';

const fileSystem = new FileSystem();

class articuloControlador {


    // Obtener artículos paginados
    async get(req: any, res: Response) {

        let pagina = Number(req.query.pagina) || 1;
        let skip = pagina - 1;
        skip = skip * 10;

        const articulos = await Articulo.find()
                                .sort({ _id: -1 })
                                .skip( skip )
                                .limit(10)
                                .populate('usuario', '-password')
                                .exec();


        res.json({
            ok: true,
            pagina,
            articulos
        });

    };

    // Crear artículos
    post(req: any, res: Response) {
      const usuarioId = req.usuario._id;
      const body = req.body;
      body.usuario = usuarioId;

      const imagenes = fileSystem.imagenesDeTempHaciaArticulo( req.usuario._id );
      body.galeria = imagenes;

      Articulo.create( body ).then( async articuloDB => {
        await articuloDB.populate('usuario', '-password');

        const usuario = await Usuario.findById(usuarioId);

        if (usuario && ('favorito' in body) && body.favorito) {
          usuario.favoritos.push(articuloDB._id);
          await usuario.save();
        }

        res.json({
          ok: true,
          articulo: articuloDB
        });

        }).catch( err => {
            res.json(err)
        });

    };

    // Servicio para modificar artículos
    async update(req: any, res: Response) {
      const articuloId = req.params.articulo_id;
      const update = req.body;

      try {
        const articulo = await Articulo.findByIdAndUpdate(articuloId, update, { new: true });
        res.json({ success: true, articulo });
      } catch (error: any) {
        res.status(500).json({ 
          success: false, 
          error: error.message 
        });
      }

    };

    // Servicio para subir archivos
    async upload(req: any, res: Response) {
        
        if ( !req.files ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No se subió ningun archivo'
            });
        }

        const file: FileUpload = req.files.image;

        if ( !file ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No se subió ningun archivo - image'
            });
        }

        if ( !file.mimetype.includes('imagen') ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Lo que subió no es una imagen'
            }); 
        }

        await fileSystem.guardarImagenTemporal( file, req.usuario._id );

        res.json({
            ok: true,
            file: file.mimetype
        });

    };


    // Obtener imagen por url
    getImg(req: any, res: Response) {

        const userId = req.params.userid;
        const img    = req.params.img;

        const pathFoto = fileSystem.getFotoUrl( userId, img );

        res.sendFile( pathFoto );

    };

    // WIP
    // Elimnar post
    async delete(req: any, res: Response) {
      const articuloId = req.params.articulo_id;
      const usuarioId = req.usuario._id;

      try {
        const articulo = await Articulo.findOne({ _id: articuloId, usuario: usuarioId });
        // const articulo = await Articulo.findById(articuloId).where({ usuario: usuarioId });

    
        if (!articulo) {
          return res.status(404).json({ success: false, error: 'No se encontró el artículo' });
        }
    
        await articulo.remove();
        res.json({ success: true, message: 'Artículo eliminado correctamente' });
      } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
      }
    }
      
      
}

export default articuloControlador;