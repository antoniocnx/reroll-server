import { Router, Response } from 'express';
import express from 'express';
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
  post(req: any, res: Response) {
    const usuarioId = req.usuario._id;
    const body = req.body;
    body.usuario = usuarioId;

    const imagenes = fileSystem.imagenesDeTempHaciaArticulo(req.usuario._id);
    body.galeria = imagenes;

    Articulo.create(body).then(async articuloDB => {
      await articuloDB.populate('usuario', '-password');

      res.json({
        ok: true,
        articulo: articuloDB
      });

    }).catch(err => {
      res.json(err)
    });

  };

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

  // Servicio para subir archivos
  async upload(req: any, res: Response) {

    if (!req.files) {
      return res.status(400).json({
        ok: false,
        mensaje: 'No se subió ningun archivo'
      });
    }

    const file: FileUpload = req.files.image;

    if (!file) {
      return res.status(400).json({
        ok: false,
        mensaje: 'No se subió ningun archivo - image'
      });
    }

    if (!file.mimetype.includes('imagen')) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Lo que subió no es una imagen'
      });
    }

    await fileSystem.guardarImagenTemporal(file, req.usuario._id);

    res.json({
      ok: true,
      file: file.mimetype
    });

  };


  // Obtener imagen por url
  getImg(req: any, res: Response) {

    const userId = req.params.userid;
    const img = req.params.img;

    const pathFoto = fileSystem.getFotoUrl(userId, img);

    res.sendFile(pathFoto);

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

  // Guardar el artículo en el array de favoritos del usuario
  // app.post('/users/:userId/favorites/:articleId', async (req, res) => {
  //   const { userId, articleId } = req.params;
  
  //   const user = await User.findById(userId);
  //   const article = await Article.findById(articleId);
  
  //   if (!user || !article) {
  //     return res.sendStatus(404);
  //   }
  
  //   user.favorites.push(article);
  //   await user.save();
  
  //   res.sendStatus(200);
  // });


}

export default articuloControlador;