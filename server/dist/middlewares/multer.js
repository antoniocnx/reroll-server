"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.storage = void 0;
const multer_1 = __importDefault(require("multer"));
// Configuración de almacenamiento
exports.storage = multer_1.default.diskStorage({
    // destination: 'uploads/gallery',
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Especifica el nombre del archivo subido
    }
});
// Configuración de Multer
exports.upload = (0, multer_1.default)({ storage: exports.storage });
//# sourceMappingURL=multer.js.map