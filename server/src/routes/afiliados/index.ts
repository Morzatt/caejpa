// Routes and configuration for the register page of the app 

import { Request, Response, Router } from "express"
import {
    deleteAfiliado, sendAfiliados,
    insertReingresoData, sendAfiliadosRetirados,
    sendReingresados,
} from "../../middleware/afiliados";
export const afiliados = Router();

afiliados.get("/",
    (req: Request, res: Response) => {
        try {
            sendAfiliados(req, res)
        } catch (err) {
            console.log(`And error has ocorred while sending the post request ${err}`)
        }
    }
)

afiliados.get("/reingreso", 
    async (req: Request, res: Response) => {
        try {
            sendReingresados(req, res)
        } catch (err) {
            console.log(err)
        }
    }
)

afiliados.post("/reingreso", 
    async (req: Request, res: Response) => {
        try {
            insertReingresoData(req, res)
        } catch (err) {
            console.log(err)
        }
    }
)

afiliados.get("/retirados/:cedula",
    async (req: Request, res: Response) => {
        try {
            sendAfiliadosRetirados(req, res)
        } catch (err) {
            console.log(err)
        }
    }
)

afiliados.delete("/:cedula",
    (req: Request, res: Response) => {
        try {
            deleteAfiliado(req, res)
        } catch (err) {
            console.log(`And error has ocorred while sending the post request ${err}`)
        }
    }
)