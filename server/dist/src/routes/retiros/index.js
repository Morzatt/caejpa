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
exports.retiros = void 0;
const express_1 = require("express");
const retiros_1 = require("../../middleware/retiros");
const mysqlConnection_1 = require("../../data/mysqlConnection");
exports.retiros = (0, express_1.Router)();
exports.retiros.get("/report", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, retiros_1.createRetirosReport)(req, res);
    }
    catch (err) {
        console.log(err);
    }
}));
exports.retiros.get("/download", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.download("./retirosReport.pdf", (err) => {
            if (err) {
                console.log(err);
            }
            console.log("Reporte de Retiro descargado exitosamente.");
        });
    }
    catch (err) {
        console.log(err);
    }
}));
exports.retiros.get("/stats", (req, res) => {
    try {
        (0, retiros_1.sendRetiroStats)(req, res);
    }
    catch (err) {
        console.log(`${err}`);
    }
});
exports.retiros.get("/reingresos/stats", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = new Date();
        const query = `SELECT COUNT(*) as result FROM reingresos WHERE fecha BETWEEN ? AND ?`;
        const [result, fields] = yield mysqlConnection_1.pool.query(query, [
            `${date.getFullYear()}-${date.getMonth() + 1}-01`,
            `${date.getFullYear()}-${date.getMonth() + 2}-01`
        ]);
        res.status(200).send(result[0]);
    }
    catch (err) {
        console.log(err);
    }
}));
exports.retiros.post("/", (req, res) => {
    try {
        (0, retiros_1.insertRetiro)(req, res);
    }
    catch (err) {
        console.log(`${err}`);
    }
});
exports.retiros.get("/:id", (req, res) => {
    try {
        (0, retiros_1.getRetiros)(req, res);
    }
    catch (err) {
        console.log(`${err}`);
    }
});
exports.retiros.delete("/:id", (req, res) => {
    try {
        (0, retiros_1.deleteRetiro)(req, res);
    }
    catch (err) {
        console.log(`${err}`);
    }
});
