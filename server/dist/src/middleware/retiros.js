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
exports.sendRetiroStats = exports.createRetirosReport = exports.deleteRetiro = exports.getRetiros = exports.insertRetiro = void 0;
const utils_1 = require("./utils");
const retiros_1 = require("../data/retiros");
const afiliados_1 = require("../data/afiliados");
const pdf_1 = require("./pdf");
function insertRetiro(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, utils_1.rejectEmptyInput)(req, res))
            return;
        const retiro = req.body;
        const result = yield (0, utils_1.checkAfiliadosRetirados)(req, res, retiro.cedula);
        if (result)
            return;
        const afiliate = req.query.afiliate;
        try {
            yield (0, retiros_1.retiros)().insertRetiro(retiro);
            if (retiro.motivo === "Retiro Total") {
                const afiliado = {
                    expediente: req.body.expediente,
                    nombre: retiro.nombre,
                    apellido: retiro.apellido,
                    cedula: retiro.cedula
                };
                yield (0, afiliados_1.afiliados)().insertAfiliadoRetirado(afiliado);
                return res.status(200).send({
                    message: `Información del retiro registrada correctamente.
                El afiliado fue inhabilitado permanentemente.`
                });
            }
            if (afiliate === "true") {
                const afiliado = {
                    expediente: req.body.expediente,
                    nombre: retiro.nombre,
                    apellido: retiro.apellido,
                    cedula: retiro.cedula
                };
                const afiliadosFromDB = yield (0, afiliados_1.afiliados)().getAfiliados();
                if (afiliadosFromDB === null) {
                    yield (0, afiliados_1.afiliados)().insertAfiliado(afiliado);
                }
                else {
                    for (let i in afiliadosFromDB) {
                        if (afiliadosFromDB[i].cedula === afiliado.cedula) {
                            return res.status(200).send({
                                message: "Información del retiro insertada correctamente. Afiliado correctamente registrado.",
                                err: null
                            });
                        }
                    }
                    yield (0, afiliados_1.afiliados)().insertAfiliado(afiliado);
                }
            }
            res.status(200).send({
                message: "Información del retiro insertada correctamente."
            });
        }
        catch (err) {
            res.status(400).send({
                message: "Ha ocurrido un error al insertar los datos del retiro.",
                error: err
            });
            throw err;
        }
    });
}
exports.insertRetiro = insertRetiro;
function getRetiros(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, utils_1.rejectEmptyInput)(req, res))
            return;
        const id = req.params.id;
        const from = req.query.from;
        const to = req.query.to;
        const orden = req.query.orden;
        const campo = req.query.campo;
        const search = req.query.search;
        try {
            if (from === "" && to === "") {
                return res.status(400).send({
                    message: "No se han especificado fechas de comienzo y final."
                });
            }
            if (id !== "*") {
                const retiro = yield (0, retiros_1.retiros)().getRetiro(id);
                res.status(200).send(retiro);
            }
            const retiros = yield (0, retiros_1.retiros)().getRetiros(from, to, campo, orden);
            if (retiros === null) {
                res.status(400).send({
                    message: "No hay retiros registrados en las fechas especificadas.",
                    err: null
                });
                return;
            }
            if (search !== "") {
                const filteredRetiros = retiros.filter((retiro) => {
                    for (let key in retiro) {
                        if (typeof retiro[key] === "string") {
                            if (retiro[key].toLowerCase().includes(search))
                                return retiro;
                        }
                        else if (typeof retiro[key] === "number") {
                            if (retiro[key].toString().toLowerCase().includes(search))
                                return retiro;
                        }
                    }
                });
                return res.status(200).send(filteredRetiros);
            }
            res.status(200).send(retiros);
        }
        catch (err) {
            res.status(400).send({
                message: "Ha ocurrido un error al obtener los datos del retiro.",
                error: err
            });
            throw err;
        }
    });
}
exports.getRetiros = getRetiros;
function deleteRetiro(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, utils_1.rejectEmptyInput)(req, res))
            return;
        const id = req.params.id;
        const session = req.session;
        try {
            // if (session.userInfo?.role !== "Administrador" || "Auditor") {
            //     return res.status(400).send({
            //         message: "Los usuarios Editores no tienen permiso para realizar esta accion."
            //     })
            // }
            if (!id) {
                res.status(400).send({
                    message: "No se ha seleccionado ningún retiro para eliminar."
                });
            }
            yield (0, retiros_1.retiros)().deleteRetiro(id);
            res.status(200).send({
                message: "Registros del Retiro eliminados correctamente."
            });
        }
        catch (err) {
            res.status(400).send({
                message: "Ha ocurrido un error al obtener los datos del retiro.",
                error: err
            });
            throw err;
        }
    });
}
exports.deleteRetiro = deleteRetiro;
function createRetirosReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const from = req.query.from;
        const to = req.query.to;
        if (from === "" || undefined && to === "" || undefined) {
            return res.status(400).send({
                message: "No se han especificado las fechas para obtener los retiros."
            });
        }
        try {
            const retiros = yield (0, retiros_1.retiros)().getRetiros(from, to);
            if (retiros !== null) {
                (0, pdf_1.retirosReport)(retiros, from, to);
            }
            res.status(200).send({
                message: "Fino calidad carteulo"
            });
        }
        catch (err) {
            res.status(400).send({
                message: "Ha ocurrido un error al obtener los datos de las estadisticas.",
                error: err
            });
            throw err;
        }
    });
}
exports.createRetirosReport = createRetirosReport;
function sendRetiroStats(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const date = new Date();
            const resultTotalesAnterior = yield (0, retiros_1.retiros)().getRetirosInfo(`${date.getFullYear()}-${date.getMonth()}-01`, `${date.getFullYear()}-${date.getMonth() + 1}-01`, "Retiro Total");
            const resultParcialesAnterior = yield (0, retiros_1.retiros)().getRetirosInfo(`${date.getFullYear()}-${date.getMonth()}-01`, `${date.getFullYear()}-${date.getMonth() + 1}-01`, "Retiro Parcial");
            const resultTotales = yield (0, retiros_1.retiros)().getRetirosInfo(`${date.getFullYear()}-${date.getMonth() + 1}-01`, `${date.getFullYear()}-${date.getMonth() + 2}-01`, "Retiro Total");
            const resultParciales = yield (0, retiros_1.retiros)().getRetirosInfo(`${date.getFullYear()}-${date.getMonth() + 1}-01`, `${date.getFullYear()}-${date.getMonth() + 2}-01`, "Retiro Parcial");
            let data = {
                labels: ["Retiros"],
                datasets: [
                    { name: "Retiros Parciales del Mes Anterior", values: [resultParcialesAnterior === null || resultParcialesAnterior === void 0 ? void 0 : resultParcialesAnterior.result] },
                    { name: "Retiros Parciales del Mes Actual", values: [resultParciales === null || resultParciales === void 0 ? void 0 : resultParciales.result] },
                    { name: "Retiros Totales del Mes Anterior", values: [resultTotalesAnterior === null || resultTotalesAnterior === void 0 ? void 0 : resultTotalesAnterior.result] },
                    { name: "Retiros Totales del Mes Actual", values: [resultTotales === null || resultTotales === void 0 ? void 0 : resultTotales.result] },
                ]
            };
            res.status(200).send(data);
        }
        catch (err) {
            res.status(400).send({
                message: "Ha ocurrido un error al obtener los datos de las estadisticas.",
                error: err
            });
            throw err;
        }
    });
}
exports.sendRetiroStats = sendRetiroStats;
