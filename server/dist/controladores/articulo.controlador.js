"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const articulo_1 = require("../modelos/articulo");
const cloudinary_1 = require("../clases/cloudinary");
class articuloControlador {
    // Obtener artículos paginados
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let pagina = Number(req.query.pagina) || 1;
            let skip = pagina - 1;
            skip = skip * 10;
            const articulos = yield articulo_1.Articulo.find()
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
        });
    }
    ;
    // Obtener un artículo por su id
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const articuloId = req.params.id;
            try {
                const articulo = yield articulo_1.Articulo.findById(articuloId)
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
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error al obtener el artículo',
                    error: error.message
                });
            }
        });
    }
    // Crear artículos
    // FUNCIONA
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioId = req.usuario._id;
            const body = req.body;
            body.usuario = usuarioId;
            const galeria = req.files.map((file) => {
                return new Promise((resolve, reject) => {
                    cloudinary_1.cloudinary.uploader.upload(file.path, (err, result) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(result.secure_url);
                        }
                    });
                });
            });
            body.galeria = yield Promise.all(galeria);
            articulo_1.Articulo.create(body)
                .then((articuloDB) => __awaiter(this, void 0, void 0, function* () {
                yield articuloDB.populate('usuario', '-password');
                res.json({
                    ok: true,
                    articulo: articuloDB,
                });
            }))
                .catch((err) => {
                res.json(err);
            });
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
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const userId = req.usuario._id;
            const { nombre, precio, categoria, descripcion, localizacion, estado, envio, favorito, galeria } = req.body;
            try {
                const articulo = yield articulo_1.Articulo.findById(id);
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
                if (nombre)
                    articulo.nombre = nombre;
                if (precio)
                    articulo.precio = precio;
                if (categoria)
                    articulo.categoria = categoria;
                if (descripcion)
                    articulo.descripcion = descripcion;
                if (localizacion)
                    articulo.localizacion = localizacion;
                if (estado)
                    articulo.estado = estado;
                if (envio)
                    articulo.envio = envio;
                if (favorito)
                    articulo.favorito = favorito;
                if (galeria)
                    articulo.galeria = galeria;
                const articuloActualizado = yield articulo.save();
                res.json({
                    ok: true,
                    mensaje: 'Artículo actualizado correctamente',
                    articulo: articuloActualizado,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    ok: false,
                    mensaje: 'Error en el servidor',
                });
            }
        });
    }
    ;
    // WIP
    // Elimnar post
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const articuloId = req.params.articulo_id;
            const usuarioId = req.usuario._id;
            try {
                const articulo = yield articulo_1.Articulo.findOne({ _id: articuloId, usuario: usuarioId });
                // const articulo = await Articulo.findById(articuloId).where({ usuario: usuarioId });
                if (!articulo) {
                    return res.status(404).json({ success: false, error: 'No se encontró el artículo' });
                }
                yield articulo.remove();
                res.json({ success: true, message: 'Artículo eliminado correctamente' });
            }
            catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
        });
    }
}
exports.default = articuloControlador;
//# sourceMappingURL=articulo.controlador.js.map