"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaTokenAdmin = exports.verificaToken = void 0;
const token_1 = __importDefault(require("../clases/token"));
const token_admin_1 = __importDefault(require("../clases/token-admin"));
// export const verificaToken = ( req: any, res: Response, next: NextFunction  ) => {
//     const userToken = req.get('x-token') || '';
//     Token.comprobarToken( userToken )
//         .then(  (decoded: any) => {
//             console.log('Decoded', decoded );
//             req.usuario = decoded.usuario;
//             next();
//         })
//         .catch( err => {
//             res.json({
//                 ok: false,
//                 mensaje: 'Token incorrecto'
//             });
//         });
// }
const verificaToken = (req, res, next) => {
    const userToken = req.get('x-token') || '';
    const userToken2 = req.get('x-token-2') || '';
    if (userToken && userToken2) {
        // Ambos tokens están presentes, verifica ambos
        Promise.all([
            token_1.default.comprobarToken(userToken),
            token_1.default.comprobarToken(userToken2)
        ]).then((decoded) => {
            console.log('Decoded', decoded);
            req.usuario = decoded[0].usuario; // Primer usuario autenticado
            req.usuario = decoded[1].usuario; // Segundo usuario autenticado
            next();
        }).catch(err => {
            res.json({
                ok: false,
                mensaje: 'Token incorrecto'
            });
        });
    }
    else if (userToken) {
        // Solo se proporcionó un token, verifica solo el primer usuario
        token_1.default.comprobarToken(userToken)
            .then((decoded) => {
            console.log('Decoded', decoded);
            req.usuario = decoded.usuario;
            next();
        })
            .catch(err => {
            res.json({
                ok: false,
                mensaje: 'Token incorrecto'
            });
        });
    }
    else {
        res.json({
            ok: false,
            mensaje: 'Token no proporcionado'
        });
    }
};
exports.verificaToken = verificaToken;
const verificaTokenAdmin = (req, res, next) => {
    const adminToken = req.get('y-token') || '';
    token_admin_1.default.comprobarTokenAdmin(adminToken)
        .then((decoded) => {
        console.log('Decoded', decoded);
        req.admin = decoded.admin;
        next();
    })
        .catch(err => {
        res.json({
            ok: false,
            mensaje: 'Token incorrecto'
        });
    });
};
exports.verificaTokenAdmin = verificaTokenAdmin;
