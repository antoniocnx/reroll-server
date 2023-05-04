"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenAdmin {
    constructor() { }
    static getJwtTokenAdmin(payload) {
        return jsonwebtoken_1.default.sign({
            admin: payload
        }, this.seed, { expiresIn: this.caducidad });
    }
    static comprobarTokenAdmin(adminToken) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(adminToken, this.seed, (err, decoded) => {
                if (err) {
                    reject();
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
}
TokenAdmin.seed = 'este-es-el-seed-de-mi-app-secreto';
TokenAdmin.caducidad = '30d';
exports.default = TokenAdmin;
//# sourceMappingURL=token-admin.js.map