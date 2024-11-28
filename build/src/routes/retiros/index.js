import { Router } from "express";
import { deleteRetiro, getRetiros, insertRetiro, createRetirosReport, sendRetiroStats } from "../../middleware/retiros.js";
import { pool } from "../../data/mysqlConnection.js";
export const retiros = Router();
retiros.get("/report", async (req, res) => {
    try {
        createRetirosReport(req, res);
    }
    catch (err) {
        console.log(err);
    }
});
retiros.get("/download", async (req, res) => {
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
});
retiros.get("/stats", (req, res) => {
    try {
        sendRetiroStats(req, res);
    }
    catch (err) {
        console.log(`${err}`);
    }
});
retiros.get("/reingresos/stats", async (req, res) => {
    try {
        const date = new Date();
        const query = `SELECT COUNT(*) as result FROM reingresos WHERE fecha BETWEEN ? AND ?`;
        const [result, fields] = await pool.query(query, [
            `${date.getFullYear()}-${date.getMonth() + 1}-01`,
            `${date.getFullYear()}-${date.getMonth() + 2}-01`
        ]);
        res.status(200).send(result[0]);
    }
    catch (err) {
        console.log(err);
    }
});
retiros.post("/", (req, res) => {
    try {
        insertRetiro(req, res);
    }
    catch (err) {
        console.log(`${err}`);
    }
});
retiros.get("/:id", (req, res) => {
    try {
        getRetiros(req, res);
    }
    catch (err) {
        console.log(`${err}`);
    }
});
retiros.delete("/:id", (req, res) => {
    try {
        deleteRetiro(req, res);
    }
    catch (err) {
        console.log(`${err}`);
    }
});
