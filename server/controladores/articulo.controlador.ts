import { Response, Request } from 'express';
import { Articulo } from '../modelos/articulo';
import fs from 'fs';
import { cloudinary } from '../clases/cloudinary';

class articuloControlador {

  // Obtener artículos paginados
  async get(req: any, res: Response) {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const articulos = await Articulo.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(10)
      .populate('usuario', '-password')
      .exec();


    res.json({
      ok: true,
      pagina,
      articulos
    });

  };

  // Obtener un artículo por su id
  async getById(req: any, res: Response) {
    const articuloId = req.params.id;

    try {
      const articulo = await Articulo.findById(articuloId)
        .populate('usuario', '-password')
        .exec();
      if (!articulo) {
        return res.status(404).json({
          ok: false,
          mensaje: 'Artículo no encontrado'
        });
      }
      res.json({
        ok: true,
        articulo
      });
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        mensaje: 'Error al obtener el artículo',
        error: error.message
      });
    }
  }

  // Crear artículos

  // FUNCIONA
  async post(req: any, res: Response) {
    const usuarioId = req.usuario._id;
    const body = req.body;
    body.usuario = usuarioId;
    
    const galeria = req.files.map((file: any) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file.path, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.secure_url);
          }
        });
      });
    });
    
    body.galeria = await Promise.all(galeria);
    
    
    Articulo.create(body)
      .then(async (articuloDB) => {
        await articuloDB.populate('usuario', '-password');
  
        res.json({
          ok: true,
          articulo: articuloDB,
        });
      })
      .catch((err) => {
        res.json(err);
      });
    }
  
  // Crea artículos subiendo las imágenes al servidor en uploads/gallery
  
  // post(req: any, res: Response) {
  //   const usuarioId = req.usuario._id;
  //   const body = req.body;
  //   body.usuario = usuarioId;
    
  //   const galeria = req.files.map((file: any) => file.originalname);
  //   body.galeria = galeria;
    
    
  //   Articulo.create(body)
  //     .then(async (articuloDB) => {
  //       await articuloDB.populate('usuario', '-password');
  
  //       res.json({
  //         ok: true,
  //         articulo: articuloDB,
  //       });
  //     })
  //     .catch((err) => {
  //       res.json(err);
  //     });
  //   }
    
    // Crea artículos sin imágenes

    // post(req: any, res: Response) {
    //   const usuarioId = req.usuario._id;
    //   const body = req.body;
    //   body.usuario = usuarioId;
  
    //   const imagenes = fileSystem.imagenesDeTempHaciaArticulo(req.usuario._id);
    //   body.galeria = imagenes;
  
    //   Articulo.create(body).then(async articuloDB => {
    //     await articuloDB.populate('usuario', '-password');
  
    //     res.json({
    //       ok: true,
    //       articulo: articuloDB
    //     });
    
  // Servicio para modificar artículos
  async update(req: any, res: Response) {
    const id = req.params.id;
    const userId = req.usuario._id;
    const { nombre, precio, categoria, descripcion, localizacion, estado, envio, favorito, galeria } = req.body;
  
    try {
      const articulo = await Articulo.findById(id);
  
      if (!articulo) {
        return res.status(404).json({
          ok: false,
          mensaje: 'No existe ningún artículo con ese id',
        });
      }
  
      if (articulo.usuario.toString() !== userId) {
        return res.status(403).json({
          ok: false,
          mensaje: 'No tienes permisos para actualizar este artículo',
        });
      }
  
      if (nombre) articulo.nombre = nombre;
      if (precio) articulo.precio = precio;
      if (categoria) articulo.categoria = categoria;
      if (descripcion) articulo.descripcion = descripcion;
      if (localizacion) articulo.localizacion = localizacion;
      if (estado) articulo.estado = estado;
      if (envio) articulo.envio = envio;
      if (favorito) articulo.favorito = favorito;
      if (galeria) articulo.galeria = galeria;
  
      const articuloActualizado = await articulo.save();
  
      res.json({
        ok: true,
        mensaje: 'Artículo actualizado correctamente',
        articulo: articuloActualizado,
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        mensaje: 'Error en el servidor',
      });
    }
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