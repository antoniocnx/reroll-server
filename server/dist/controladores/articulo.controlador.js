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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const articulo_1 = require("../modelos/articulo");
const file_system_1 = __importDefault(require("../clases/file-system"));
const usuario_1 = require("../modelos/usuario");
const fileSystem = new file_system_1.default();
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
    // Crear artículos
    post(req, res) {
        const usuarioId = req.usuario._id;
        const body = req.body;
        body.usuario = usuarioId;
        const imagenes = fileSystem.imagenesDeTempHaciaArticulo(req.usuario._id);
        body.galeria = imagenes;
        articulo_1.Articulo.create(body).then((articuloDB) => __awaiter(this, void 0, void 0, function* () {
            yield articuloDB.populate('usuario', '-password');
            const usuario = yield usuario_1.Usuario.findById(usuarioId);
            if (usuario && ('favorito' in body) && body.favorito) {
                usuario.favoritos.push(articuloDB._id);
                yield usuario.save();
            }
            res.json({
                ok: true,
                articulo: articuloDB
            });
        })).catch(err => {
            res.json(err);
        });
    }
    ;
    // Servicio para modificar artículos
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const articuloId = req.params.articulo_id;
            const update = req.body;
            try {
                const articulo = yield articulo_1.Articulo.findByIdAndUpdate(articuloId, update, { new: true });
                res.json({ success: true, articulo });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        });
    }
    ;
    // Servicio para subir archivos
    upload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.files) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'No se subió ningun archivo'
                });
            }
            const file = req.files.image;
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
            yield fileSystem.guardarImagenTemporal(file, req.usuario._id);
            res.json({
                ok: true,
                file: file.mimetype
            });
        });
    }
    ;
    // Obtener imagen por url
    getImg(req, res) {
        const userId = req.params.userid;
        const img = req.params.img;
        const pathFoto = fileSystem.getFotoUrl(userId, img);
        res.sendFile(pathFoto);
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