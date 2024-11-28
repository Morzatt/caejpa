import fs from "fs";
import { afiliados } from "../../data/afiliados/index.js";
export function rejectEmptyInput(req, res) {
    if (req.method !== "GET") {
        for (let key in req.body) {
            if (req.body[key] === null) {
                res.status(400).send({
                    message: `Su solicitud no pudo ser procesada porque existe un campo vacío. Porfavor revise e intente de nuevo`
                });
                return false;
            }
            if (req.body[key] === undefined) {
                res.status(400).send({
                    message: `Su solicitud no pudo ser procesada porque existe un campo vacío. Porfavor revise e intente de nuevo`
                });
                return false;
            }
            if (req.body[key] === '') {
                res.status(400).send({
                    message: `Su solicitud no pudo ser procesada porque existe un campo vacío. Porfavor revise e intente de nuevo`
                });
                return false;
            }
        }
    }
    else {
        return true;
    }
    return true;
}
export function isAdmin(req, res) {
    const session = req.session;
    if (session.userInfo?.role === "Administrador") {
        return true;
    }
    else {
        res.status(400).send({
            message: `Error: El usuario no tiene permiso para realizar esta accion. Debe de ser administrador para realizar esta acción.`,
            err: null
        });
        return false;
    }
}
export async function checkAfiliadosRetirados(req, res, cedula) {
    try {
        const result = await afiliados().checkAfiliadoRetirado(cedula);
        if (result) {
            res.status(400).send({
                message: "El afiliado se encuentra inhabilitado por motivos de Retiro Total de la Caja de Ahorro"
            });
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        throw err;
    }
}
export function deleteOldBackups(backupName) {
    fs.readdirSync(`./backup`);
}
