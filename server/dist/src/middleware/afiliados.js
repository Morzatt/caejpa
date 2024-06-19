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
exports.sendReingresados = exports.insertReingresoData = exports.sendAfiliadosRetirados = exports.deleteAfiliado = exports.sendAfiliados = void 0;
const afiliados_1 = require("../data/afiliados");
function sendAfiliados(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchParams = req.query.searchParams;
        try {
            const afiliados = yield (0, afiliados_1.afiliados)().getAfiliados();
            if (afiliados === null) {
                return res.status(403).send({
                    message: "No se ha añadido ningún afiliado a la lista de Afiliados Frecuentes"
                });
            }
            if (searchParams !== "") {
                const filteredAfiliados = afiliados.filter(afiliado => {
                    return afiliado.expediente.toLowerCase().includes(searchParams) ||
                        afiliado.nombre.toLowerCase().includes(searchParams) ||
                        afiliado.apellido.toLowerCase().includes(searchParams) ||
                        afiliado.cedula.toString().toLowerCase().includes(searchParams);
                });
                return res.status(200).send(filteredAfiliados);
            }
            res.status(200).send(afiliados);
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                message: "Ha ocurrido un error al intentar crear la copia de seguridad",
                err: err
            });
        }
    });
}
exports.sendAfiliados = sendAfiliados;
function deleteAfiliado(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const cedula = req.params.cedula;
        try {
            yield (0, afiliados_1.afiliados)().deleteAfiliado(cedula);
            res.status(200).send({ message: "El afiliado ha sido eliminado." });
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                message: "Ha ocurrido un error al intentar crear la copia de seguridad",
                err: err
            });
        }
    });
}
exports.deleteAfiliado = deleteAfiliado;
function sendAfiliadosRetirados(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const cedula = req.params.cedula;
        const searchParams = req.query.searchParams;
        try {
            const retirados = yield (0, afiliados_1.afiliados)().getAfiliadosRetirados(cedula);
            if (retirados === null) {
                return res.status(403).send({
                    message: "No existen registros de Afiliados Retirados"
                });
            }
            if (searchParams !== "") {
                const filteredRetirados = retirados.filter(afiliado => {
                    return afiliado.expediente.toLowerCase().includes(searchParams) ||
                        afiliado.nombre.toLowerCase().includes(searchParams) ||
                        afiliado.apellido.toLowerCase().includes(searchParams) ||
                        afiliado.cedula.toString().toLowerCase().includes(searchParams);
                });
                return res.status(200).send(filteredRetirados);
            }
            res.status(200).send(retirados);
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                message: "Ha ocurrido un error al intentar crear la copia de seguridad",
                err: err
            });
        }
    });
}
exports.sendAfiliadosRetirados = sendAfiliadosRetirados;
function insertReingresoData(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { nombre, apellido, expediente, cedula, motivo } = req.body;
        const session = req.session;
        const usuario = (_a = session.userInfo) === null || _a === void 0 ? void 0 : _a.username;
        try {
            yield (0, afiliados_1.afiliados)().deleteAfiliadoRetirado(cedula);
            yield (0, afiliados_1.afiliados)().insertReingresoData(nombre, apellido, cedula, expediente, motivo, usuario);
            res.status(200).send({
                message: "Afiliado Reingresado."
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                message: "Ha ocurrido un error al intentar crear la copia de seguridad",
                err: err
            });
        }
    });
}
exports.insertReingresoData = insertReingresoData;
function sendReingresados(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchParams = req.query.searchParams;
        try {
            const reingresados = yield (0, afiliados_1.afiliados)().getReingresoData();
            if (reingresados === null) {
                return res.status(403).send({
                    message: "No existen registros de Afiliados Reingresados"
                });
            }
            if (searchParams !== "") {
                const filteredReingresados = reingresados.filter(afiliado => {
                    return afiliado.expediente.toLowerCase().includes(searchParams) ||
                        afiliado.nombre.toLowerCase().includes(searchParams) ||
                        afiliado.apellido.toLowerCase().includes(searchParams) ||
                        afiliado.cedula.toString().toLowerCase().includes(searchParams);
                });
                return res.status(200).send(filteredReingresados);
            }
            res.status(200).send(reingresados);
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                message: "Ha ocurrido un error al intentar crear la copia de seguridad",
                err: err
            });
        }
    });
}
exports.sendReingresados = sendReingresados;
