// Routes and configuration for the register page of the app 

import { Request, Response, Router } from "express"
import { getVariables, modifyGastosAdministrativos, modifyPorcentajeIntereses, modifyTransferenciaEfectiva } from "../../middleware/variables";

export const variables = Router();

variables.get("/", 
    (req: Request, res: Response) => {
        try {
            getVariables(req, res)
        } catch (err) {
            console.log(`An error has ocurred with the GET /prestamos/variables route`)
        }
    }
)
variables.post("/modify/gastos_administrativos", 
    (req: Request, res: Response) => {
        try {
            modifyGastosAdministrativos(req, res)
        } catch (err) {
            console.log(`An error has ocurred with the GET /prestamos/variables route`)
        }
    }
)

variables.post("/modify/transferencia_efectiva", 
    (req: Request, res: Response) => {
        try {
            modifyTransferenciaEfectiva(req, res)
        } catch (err) {
            console.log(`An error has ocurred with the GET /prestamos/variables route`)
        }
    }
)

variables.post("/modify/porcentaje_intereses", 
    (req: Request, res: Response) => {
        try {
            modifyPorcentajeIntereses(req, res)
        } catch (err) {
            console.log(`An error has ocurred with the GET /prestamos/variables route`)
        }
    }
)