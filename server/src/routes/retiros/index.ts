import type { Request, Response } from "express";
import { Router } from "express"
import {
    deleteRetiro,
    getRetiros,
    insertRetiro,
    createRetirosReport,
    sendRetiroStats
} from "../../middleware/retiros"
import { pool } from "../../data/mysqlConnection";

export const retiros = Router();

retiros.get("/report",
    async (req: Request, res: Response) => {
        try {
            createRetirosReport(req, res)
        } catch (err) {
            console.log(err)
        }
    }
)
retiros.get("/download",
    async (req: Request, res: Response) => {
        try {
            res.download("./retirosReport.pdf", (err) => {
                if (err) {
                    console.log(err)
                }
                console.log("Reporte de Retiro descargado exitosamente.")
            })
        } catch (err) {
            console.log(err)
        }
    }
)

retiros.get("/stats", 
    (req: Request, res: Response) => {
        try {
            sendRetiroStats(req, res)
        } catch (err) {
            console.log(`${err}`)
        }
    }
)

retiros.get("/reingresos/stats",
    async (req: Request, res: Response) => {
        try {
            const date = new Date()
            const query = `SELECT COUNT(*) as result FROM reingresos WHERE fecha BETWEEN ? AND ?`
            const [result, fields] = await pool.query(query, [
                `${date.getFullYear()}-${date.getMonth() + 1}-01`,
                `${date.getFullYear()}-${date.getMonth() + 2}-01`
            ])
            res.status(200).send(result[0])
        } catch (err) {
            console.log(err)
        }
    } 
)

retiros.post("/",
    (req: Request, res: Response) => {
        try {
            insertRetiro(req, res)
        } catch (err) {
            console.log(`${err}`)
        }
    }
)

retiros.get("/:id",
    (req: Request, res: Response) => {
        try {
            getRetiros(req, res)
        } catch (err) {
            console.log(`${err}`)
        }
    }
)

retiros.delete("/:id",
    (req: Request, res: Response) => {
        try {
            deleteRetiro(req, res)
        } catch (err) {
            console.log(`${err}`)
        }
    }
)