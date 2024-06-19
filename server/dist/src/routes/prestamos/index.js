"use strict";
// Routes and configuration for the register page of the app 
Object.defineProperty(exports, "__esModule", { value: true });
exports.prestamos = void 0;
const express_1 = require("express");
const prestamos_1 = require("../../middleware/prestamos");
exports.prestamos = (0, express_1.Router)();
exports.prestamos.get("/stats", (req, res) => {
    try {
        (0, prestamos_1.sendPrestamosStats)(req, res);
    }
    catch (err) {
        console.log(`${err}`);
    }
});
exports.prestamos.post("/", (req, res) => {
    try {
        (0, prestamos_1.insertPrestamo)(req, res);
    }
    catch (err) {
        console.log(`And error has ocorred while sending the post request ${err}`);
    }
});
exports.prestamos.post("/createPrestamo", (req, res) => {
    try {
        (0, prestamos_1.individualDownload)(req, res);
    }
    catch (err) {
        console.log(`And error has ocorred while sending the post request ${err}`);
    }
});
exports.prestamos.get("/downloadPrestamo", (req, res) => {
    try {
        res.download("./individualReport.pdf", (err) => {
            if (err) {
                console.log("File Correctly Downloaded.");
            }
            else {
                console.log("Error at downloading the file");
            }
        });
    }
    catch (err) {
        console.log(`And error has ocorred while sending the post request ${err}`);
    }
});
exports.prestamos.post("/createPrestamos", (req, res) => {
    try {
        (0, prestamos_1.grupalDownload)(req, res);
    }
    catch (err) {
        console.log(`And error has ocorred while sending the post request ${err}`);
    }
});
exports.prestamos.get("/downloadPrestamos", (req, res) => {
    try {
        res.download("./grupalReport.pdf", (err) => {
            if (err) {
                console.log("File Correctly Downloaded.");
            }
            else {
                console.log("Error at downloading the file");
            }
        });
    }
    catch (err) {
        console.log(`And error has ocorred while sending the post request ${err}`);
    }
});
exports.prestamos.get("/:id", (req, res) => {
    try {
        (0, prestamos_1.getPrestamos)(req, res);
    }
    catch (err) {
        console.log(`And error has ocorred while sending the post request ${err}`);
    }
});
exports.prestamos.delete("/:id", (req, res) => {
    try {
        (0, prestamos_1.deletePrestamo)(req, res);
    }
    catch (err) {
        console.log(`And error has ocorred while sending the post request ${err}`);
    }
});
