import { variables as variablesModel } from "../data/variables";
import { rejectEmptyInput, isAdmin } from "./utils";

// Type Imports
import type { Request, Response } from "express";
import type { Variables } from "../data/types";

export async function getVariables(req: Request, res: Response) {
    try {
        const variables: Variables[] = await variablesModel().getVariables()
        res.send(variables)
    } catch (err) {
        console.log(err)
        res.send({
            message: `Ha ocurrido un error al tratar de obtener todas las variables`,
            err: err
        })
        throw err
    }
}

export async function modifyGastosAdministrativos(req: Request, res: Response) {
    if (!isAdmin(req, res)) return
    if (!rejectEmptyInput(req, res)) return

    const newGastosAdministrativos: number = req.body.newGastosAdministrativos
    try {
        await variablesModel().modifyGastosAdministrativos(newGastosAdministrativos)

        res.status(200).send({
            message: "Modificacion del monto de Gastos Administrativos Exitosa",
            err: null
        })
    } catch (err) {
        console.log(err)

        res.status(400).send({
            message: `Ha ocurrido un error al tratar de obtener todas las variables`,
            err: err
        })

        throw err
    }
}

export async function modifyTransferenciaEfectiva(req: Request, res: Response) {
    if (!isAdmin(req, res)) return
    if (!rejectEmptyInput(req, res)) return

    const newTransferenciaEfectiva: number = req.body.newTransferenciaEfectiva

    try {
        await variablesModel().modifyTransferenciaEfectiva(newTransferenciaEfectiva)
        res.status(200).send({
            message: "Modificacion del monto de Gastos Administrativos Exitosa",
            err: null
        })
    } catch (err) {
        console.log(err)

        res.status(400).send({
            message: `Ha ocurrido un error al tratar de obtener todas las variables`,
            err: err
        })

        throw err
    }
}

export async function modifyPorcentajeIntereses(req: Request, res: Response) {
    if (!isAdmin(req, res)) return
    if (!rejectEmptyInput(req, res)) return

    const newPorcentajeIntereses: number = req.body.newPorcentajeIntereses;

    try {
        await variablesModel().modifyPorcentajeIntereses(newPorcentajeIntereses)

        res.status(200).send({
            message: "Modificacion del monto de Gastos Administrativos Exitosa",
            err: null
        })
    } catch (err) {
        console.log(err)

        res.status(400).send({
            message: `Ha ocurrido un error al tratar de obtener todas las variables`,
            err: err
        })

        throw err
    }
}