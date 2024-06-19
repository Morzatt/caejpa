"use strict";
// Routes and configuration for the register page of the app 
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
exports.afiliados = void 0;
const express_1 = require("express");
const afiliados_1 = require("../../middleware/afiliados");
exports.afiliados = (0, express_1.Router)();
exports.afiliados.get("/", (req, res) => {
    try {
        (0, afiliados_1.sendAfiliados)(req, res);
    }
    catch (err) {
        console.log(`And error has ocorred while sending the post request ${err}`);
    }
});
exports.afiliados.get("/reingreso", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, afiliados_1.sendReingresados)(req, res);
    }
    catch (err) {
        console.log(err);
    }
}));
exports.afiliados.post("/reingreso", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, afiliados_1.insertReingresoData)(req, res);
    }
    catch (err) {
        console.log(err);
    }
}));
exports.afiliados.get("/retirados/:cedula", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, afiliados_1.sendAfiliadosRetirados)(req, res);
    }
    catch (err) {
        console.log(err);
    }
}));
exports.afiliados.delete("/:cedula", (req, res) => {
    try {
        (0, afiliados_1.deleteAfiliado)(req, res);
    }
    catch (err) {
        console.log(`And error has ocorred while sending the post request ${err}`);
    }
});
