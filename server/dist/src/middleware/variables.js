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
exports.modifyPorcentajeIntereses = exports.modifyTransferenciaEfectiva = exports.modifyGastosAdministrativos = exports.getVariables = void 0;
const variables_1 = require("../data/variables");
const utils_1 = require("./utils");
function getVariables(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const variables = yield (0, variables_1.variables)().getVariables();
            res.send(variables);
        }
        catch (err) {
            console.log(err);
            res.send({
                message: `Ha ocurrido un error al tratar de obtener todas las variables`,
                err: err
            });
            throw err;
        }
    });
}
exports.getVariables = getVariables;
function modifyGastosAdministrativos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, utils_1.isAdmin)(req, res))
            return;
        if (!(0, utils_1.rejectEmptyInput)(req, res))
            return;
        const newGastosAdministrativos = req.body.newGastosAdministrativos;
        try {
            yield (0, variables_1.variables)().modifyGastosAdministrativos(newGastosAdministrativos);
            res.status(200).send({
                message: "Modificacion del monto de Gastos Administrativos Exitosa",
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
exports.modifyGastosAdministrativos = modifyGastosAdministrativos;
function modifyTransferenciaEfectiva(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, utils_1.isAdmin)(req, res))
            return;
        if (!(0, utils_1.rejectEmptyInput)(req, res))
            return;
        const newTransferenciaEfectiva = req.body.newTransferenciaEfectiva;
        try {
            yield (0, variables_1.variables)().modifyTransferenciaEfectiva(newTransferenciaEfectiva);
            res.status(200).send({
                message: "Modificacion del monto de Gastos Administrativos Exitosa",
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
exports.modifyTransferenciaEfectiva = modifyTransferenciaEfectiva;
function modifyPorcentajeIntereses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, utils_1.isAdmin)(req, res))
            return;
        if (!(0, utils_1.rejectEmptyInput)(req, res))
            return;
        const newPorcentajeIntereses = req.body.newPorcentajeIntereses;
        try {
            yield (0, variables_1.variables)().modifyPorcentajeIntereses(newPorcentajeIntereses);
            res.status(200).send({
                message: "Modificacion del monto de Gastos Administrativos Exitosa",
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
exports.modifyPorcentajeIntereses = modifyPorcentajeIntereses;
