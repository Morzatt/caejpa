import { variables as variablesModel } from "../data/variables";
import { rejectEmptyInput, isAdmin } from "./utils";
export async function getVariables(req, res) {
    try {
        const variables = await variablesModel().getVariables();
        res.send(variables);
    }
    catch (err) {
        console.log(err);
        res.send({
            message: `Ha ocurrido un error al tratar de obtener todas las variables`,
            err: err
        });
        throw err;
    }
}
export async function modifyGastosAdministrativos(req, res) {
    if (!isAdmin(req, res))
        return;
    if (!rejectEmptyInput(req, res))
        return;
    const newGastosAdministrativos = req.body.newGastosAdministrativos;
    try {
        await variablesModel().modifyGastosAdministrativos(newGastosAdministrativos);
        res.status(200).send({
            message: "Modificacion del monto de Gastos Administrativos Exitosa",
            err: null
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({
            message: `Ha ocurrido un error al tratar de obtener todas las variables`,
            err: err
        });
        throw err;
    }
}
export async function modifyTransferenciaEfectiva(req, res) {
    if (!isAdmin(req, res))
        return;
    if (!rejectEmptyInput(req, res))
        return;
    const newTransferenciaEfectiva = req.body.newTransferenciaEfectiva;
    try {
        await variablesModel().modifyTransferenciaEfectiva(newTransferenciaEfectiva);
        res.status(200).send({
            message: "Modificacion del monto de Gastos Administrativos Exitosa",
            err: null
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({
            message: `Ha ocurrido un error al tratar de obtener todas las variables`,
            err: err
        });
        throw err;
    }
}
export async function modifyPorcentajeIntereses(req, res) {
    if (!isAdmin(req, res))
        return;
    if (!rejectEmptyInput(req, res))
        return;
    const newPorcentajeIntereses = req.body.newPorcentajeIntereses;
    try {
        await variablesModel().modifyPorcentajeIntereses(newPorcentajeIntereses);
        res.status(200).send({
            message: "Modificacion del monto de Gastos Administrativos Exitosa",
            err: null
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({
            message: `Ha ocurrido un error al tratar de obtener todas las variables`,
            err: err
        });
        throw err;
    }
}
