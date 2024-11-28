// Routes and configuration for the register page of the app 
import { Router } from "express";
import { insertPrestamo, getPrestamos, individualDownload, grupalDownload, deletePrestamo, sendPrestamosStats } from "../../middleware/prestamos";
export const prestamos = Router();
prestamos.get("/stats", (req, res) => {
    try {
        sendPrestamosStats(req, res);
    }
    catch (err) {
        console.log(`${err}`);
    }
});
prestamos.post("/", (req, res) => {
    try {
        insertPrestamo(req, res);
    }
    catch (err) {
        console.log(`And error has ocorred while sending the post request ${err}`);
    }
});
prestamos.post("/createPrestamo", (req, res) => {
    try {
        individualDownload(req, res);
    }
    catch (err) {
        console.log(`And error has ocorred while sending the post request ${err}`);
    }
});
prestamos.get("/downloadPrestamo", (req, res) => {
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
prestamos.post("/createPrestamos", (req, res) => {
    try {
        grupalDownload(req, res);
    }
    catch (err) {
        console.log(`And error has ocorred while sending the post request ${err}`);
    }
});
prestamos.get("/downloadPrestamos", (req, res) => {
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
prestamos.get("/:id", (req, res) => {
    try {
        getPrestamos(req, res);
    }
    catch (err) {
        console.log(`And error has ocorred while sending the post request ${err}`);
    }
});
prestamos.delete("/:id", (req, res) => {
    try {
        deletePrestamo(req, res);
    }
    catch (err) {
        console.log(`And error has ocorred while sending the post request ${err}`);
    }
});
