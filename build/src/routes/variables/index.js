// Routes and configuration for the register page of the app 
import { Router } from "express";
import { getVariables, modifyGastosAdministrativos, modifyPorcentajeIntereses, modifyTransferenciaEfectiva } from "../../middleware/variables.js";
export const variables = Router();
variables.get("/", (req, res) => {
    try {
        getVariables(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred with the GET /prestamos/variables route`);
    }
});
variables.post("/modify/gastos_administrativos", (req, res) => {
    try {
        modifyGastosAdministrativos(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred with the GET /prestamos/variables route`);
    }
});
variables.post("/modify/transferencia_efectiva", (req, res) => {
    try {
        modifyTransferenciaEfectiva(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred with the GET /prestamos/variables route`);
    }
});
variables.post("/modify/porcentaje_intereses", (req, res) => {
    try {
        modifyPorcentajeIntereses(req, res);
    }
    catch (err) {
        console.log(`An error has ocurred with the GET /prestamos/variables route`);
    }
});
