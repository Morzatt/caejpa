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
exports.deleteOldBackups = exports.checkAfiliadosRetirados = exports.isAdmin = exports.rejectEmptyInput = void 0;
const fs_1 = __importDefault(require("fs"));
const afiliados_1 = require("../../data/afiliados");
function rejectEmptyInput(req, res) {
    if (req.method !== "GET") {
        for (let key in req.body) {
            if (req.body[key] === null) {
                res.status(400).send({
                    message: `Su solicitud no pudo ser procesada porque existe un campo vacío. Porfavor revise e intente de nuevo`
                });
                return false;
            }
            if (req.body[key] === undefined) {
                res.status(400).send({
                    message: `Su solicitud no pudo ser procesada porque existe un campo vacío. Porfavor revise e intente de nuevo`
                });
                return false;
            }
            if (req.body[key] === '') {
                res.status(400).send({
                    message: `Su solicitud no pudo ser procesada porque existe un campo vacío. Porfavor revise e intente de nuevo`
                });
                return false;
            }
        }
    }
    else {
        return true;
    }
    return true;
}
exports.rejectEmptyInput = rejectEmptyInput;
function isAdmin(req, res) {
    var _a;
    const session = req.session;
    if (((_a = session.userInfo) === null || _a === void 0 ? void 0 : _a.role) === "Administrador") {
        return true;
    }
    else {
        res.status(400).send({
            message: `Error: El usuario no tiene permiso para realizar esta accion. Debe de ser administrador para realizar esta acción.`,
            err: null
        });
        return false;
    }
}
exports.isAdmin = isAdmin;
function checkAfiliadosRetirados(req, res, cedula) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield (0, afiliados_1.afiliados)().checkAfiliadoRetirado(cedula);
            if (result) {
                res.status(400).send({
                    message: "El afiliado se encuentra inhabilitado por motivos de Retiro Total de la Caja de Ahorro"
                });
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            throw err;
        }
    });
}
exports.checkAfiliadosRetirados = checkAfiliadosRetirados;
function deleteOldBackups(backupName) {
    fs_1.default.readdirSync(`./backup`);
}
exports.deleteOldBackups = deleteOldBackups;
