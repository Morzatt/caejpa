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
exports.sendPrestamosStats = exports.deletePrestamo = exports.grupalDownload = exports.individualDownload = exports.getPrestamos = exports.insertPrestamo = void 0;
const prestamos_1 = require("../data/prestamos");
const utils_1 = require("./utils");
const pdf_1 = require("./pdf");
const afiliados_1 = require("../data/afiliados");
function insertPrestamo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, utils_1.rejectEmptyInput)(req, res))
            return;
        const prestamo = req.body;
        const result = yield (0, utils_1.checkAfiliadosRetirados)(req, res, prestamo.cedula);
        if (result)
            return;
        const afiliate = req.query.afiliate;
        try {
            yield (0, prestamos_1.prestamos)().insertPrestamo(prestamo);
            if (afiliate === "true") {
                const afiliado = {
                    expediente: prestamo.expediente,
                    nombre: prestamo.nombre,
                    apellido: prestamo.apellido,
                    cedula: prestamo.cedula
                };
                const afiliadosFromDB = yield (0, afiliados_1.afiliados)().getAfiliados();
                if (afiliadosFromDB === null) {
                    yield (0, afiliados_1.afiliados)().insertAfiliado(afiliado);
                }
                else {
                    for (let i in afiliadosFromDB) {
                        if (afiliadosFromDB[i].cedula === afiliado.cedula) {
                            return res.status(200).send({
                                message: "Prestamo correctamente registrado.",
                                err: null
                            });
                        }
                    }
                    yield (0, afiliados_1.afiliados)().insertAfiliado(afiliado);
                }
            }
            res.status(200).send({
                message: "Prestamo correctamente registrado.",
                err: null
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                message: `Ha ocurrido un error al tratar de obtener todas las variables`,
                err: err
            });
            throw err;
        }
    });
}
exports.insertPrestamo = insertPrestamo;
function getPrestamos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const from = req.query.from;
        const to = req.query.to;
        const id = req.params.id;
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
                const prestamo = yield (0, prestamos_1.prestamos)().getPrestamo(id);
                return res.status(200).send(prestamo[0]);
            }
            const prestamos = yield (0, prestamos_1.prestamos)().getPrestamos(from, to, campo, orden);
            if (prestamos === null) {
                res.status(400).send({
                    message: "No hay prestamos registrados en las fechas especificadas.",
                    err: null
                });
                return;
            }
            if (search !== "") {
                const filteredPrestamos = prestamos.filter((prestamo) => {
                    for (let key in prestamo) {
                        if (typeof prestamo[key] === "string") {
                            if (prestamo[key].toLowerCase().includes(search))
                                return prestamo;
                        }
                        else if (typeof prestamo[key] === "number") {
                            if (prestamo[key].toString().toLowerCase().includes(search))
                                return prestamo;
                        }
                    }
                });
                return res.status(200).send(filteredPrestamos);
            }
            res.status(200).send(prestamos);
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                message: `Ha ocurrido un error al tratar de obtener todas las variables`,
                err: err
            });
            throw err;
        }
    });
}
exports.getPrestamos = getPrestamos;
function individualDownload(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, utils_1.rejectEmptyInput)(req, res))
            return;
        const prestamoId = req.body.prestamoId;
        try {
            const prestamo = yield (0, prestamos_1.prestamos)().getPrestamo(prestamoId);
            (0, pdf_1.singleReport)(prestamo[0]);
            res.status(200).send({
                message: "fino"
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                message: `Ha ocurrido un error al tratar de obtener todas las variables`,
                err: err
            });
            throw err;
        }
    });
}
exports.individualDownload = individualDownload;
function grupalDownload(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, utils_1.rejectEmptyInput)(req, res))
            return;
        const from = req.body.from;
        const to = req.body.to;
        try {
            const prestamos = yield (0, prestamos_1.prestamos)().getPrestamos(from, to);
            if (prestamos !== null) {
                (0, pdf_1.multipleReport)(prestamos, from, to);
            }
            res.status(200).send({
                message: "fino"
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                message: `Ha ocurrido un error al tratar de obtener todas las variables`,
                err: err
            });
            throw err;
        }
    });
}
exports.grupalDownload = grupalDownload;
function deletePrestamo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // if (!isAdmin(req, res)) return 
        const id = req.params.id;
        const session = req.session;
        try {
            // if (session.userInfo?.role !== "Administrador" || "Auditor") {
            //     return res.status(400).send({
            //         message: "Los usuarios Editores no tienen permiso para realizar esta accion."
            //     })
            // }
            yield (0, prestamos_1.prestamos)().deletePrestamo(id);
            res.status(200).send({
                message: "Se ha eliminado el prestamo correctamente"
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                message: `Ha ocurrido un error al tratar de obtener todas las variables`,
                err: err
            });
            throw err;
        }
    });
}
exports.deletePrestamo = deletePrestamo;
function sendPrestamosStats(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const date = new Date();
            const resultAnterior = yield (0, prestamos_1.prestamos)().getPrestamosInfo(`${date.getFullYear()}-${date.getMonth()}-01`, `${date.getFullYear()}-${date.getMonth() + 1}-01`);
            const resultActual = yield (0, prestamos_1.prestamos)().getPrestamosInfo(`${date.getFullYear()}-${date.getMonth() + 1}-01`, `${date.getFullYear()}-${date.getMonth() + 2}-01`);
            let data = {
                labels: ["Prestamos"],
                datasets: [
                    { name: "Prestamos del Mes Anterior", values: [resultAnterior === null || resultAnterior === void 0 ? void 0 : resultAnterior.result] },
                    { name: "Prestamos del Mes Actual", values: [resultActual === null || resultActual === void 0 ? void 0 : resultActual.result] },
                ]
            };
            res.status(200).send(data);
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                message: `Ha ocurrido un error al obtener las estadisticas`,
                err: err
            });
            throw err;
        }
    });
}
exports.sendPrestamosStats = sendPrestamosStats;
