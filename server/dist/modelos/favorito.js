"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favorito = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const favoritoSchema = new mongoose_1.default.Schema({
    usuario: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    articulo: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'Articulo',
        required: true
    }
});
exports.Favorito = (0, mongoose_2.model)('Favorito', favoritoSchema);
