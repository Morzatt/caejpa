"use strict";
// Routes and configuration for the register page of the app 
Object.defineProperty(exports, "__esModule", { value: true });
exports.variables = void 0;
const express_1 = require("express");
const variables_1 = require("../../middleware/variables");
exports.variables = (0, express_1.Router)();
exports.variables.get("/", (req, res) => {
    try {
        (0, variables_1.getVariables)(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred with the GET /prestamos/variables route`);
    }
});
exports.variables.post("/modify/gastos_administrativos", (req, res) => {
    try {
        (0, variables_1.modifyGastosAdministrativos)(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred with the GET /prestamos/variables route`);
    }
});
exports.variables.post("/modify/transferencia_efectiva", (req, res) => {
    try {
        (0, variables_1.modifyTransferenciaEfectiva)(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred with the GET /prestamos/variables route`);
    }
});
exports.variables.post("/modify/porcentaje_intereses", (req, res) => {
    try {
        (0, variables_1.modifyPorcentajeIntereses)(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred with the GET /prestamos/variables route`);
    }
});
