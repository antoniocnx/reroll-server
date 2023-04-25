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
const post_1 = require("../modelos/post");
const file_system_1 = __importDefault(require("../clases/file-system"));
const fileSystem = new file_system_1.default();
class postControlador {
    // Obtener POST paginados
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let pagina = Number(req.query.pagina) || 1;
            let skip = pagina - 1;
            skip = skip * 10;
            const posts = yield post_1.Post.find()
                .sort({ _id: -1 })
                .skip(skip)
                .limit(10)
                .populate('usuario', '-password')
                .exec();
            res.json({
                ok: true,
                pagina,
                posts
            });
        });
    }
    ;
    // // Crear POST
    post(req, res) {
        const body = req.body;
        body.usuario = req.usuario._id;
        const imagenes = fileSystem.imagenesDeTempHaciaPost(req.usuario._id);
        body.imgs = imagenes;
        post_1.Post.create(body).then((postDB) => __awaiter(this, void 0, void 0, function* () {
            yield postDB.populate('usuario', '-password');
            res.json({
                ok: true,
                post: postDB
            });
        })).catch(err => {
            res.json(err);
        });
    }
    ;
    // // Servicio para subir archivos
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
            if (!file.mimetype.includes('image')) {
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
            const userId = req.usuario._id; // ID del usuario que hace la petición
            const postId = req.params.postId; // ID del post que se quiere eliminar
            try {
                const post = yield post_1.Post.findOne({ _id: postId, usuario: userId });
                if (!post) {
                    return res.status(401).send({ mensaje: 'No estás autorizado para eliminar este post' });
                }
                yield post_1.Post.findByIdAndDelete(postId);
                res.status(200).send({ mensaje: 'Post eliminado correctamente' });
            }
            catch (error) {
                console.error(error);
                res.status(500).send({ mensaje: 'Ha ocurrido un error al intentar eliminar el post' });
            }
        });
    }
}
exports.default = postControlador;
