import { checkAfiliadosRetirados, rejectEmptyInput } from "./utils";
import { retiros as retirosModel } from "../data/retiros";
import { afiliados } from "../data/afiliados";
import { retirosReport } from "./pdf";
export async function insertRetiro(req, res) {
    if (!rejectEmptyInput(req, res))
        return;
    const retiro = req.body;
    const result = await checkAfiliadosRetirados(req, res, retiro.cedula);
    if (result)
        return;
    const afiliate = req.query.afiliate;
    try {
        await retirosModel().insertRetiro(retiro);
        if (retiro.motivo === "Retiro Total") {
            const afiliado = {
                expediente: req.body.expediente,
                nombre: retiro.nombre,
                apellido: retiro.apellido,
                cedula: retiro.cedula
            };
            await afiliados().insertAfiliadoRetirado(afiliado);
            return res.status(200).send({
                message: `Información del retiro registrada correctamente.
                El afiliado fue inhabilitado permanentemente.`
            });
        }
        if (afiliate === "true") {
            const afiliado = {
                expediente: req.body.expediente,
                nombre: retiro.nombre,
                apellido: retiro.apellido,
                cedula: retiro.cedula
            };
            const afiliadosFromDB = await afiliados().getAfiliados();
            if (afiliadosFromDB === null) {
                await afiliados().insertAfiliado(afiliado);
            }
            else {
                for (let i in afiliadosFromDB) {
                    if (afiliadosFromDB[i].cedula === afiliado.cedula) {
                        return res.status(200).send({
                            message: "Información del retiro insertada correctamente. Afiliado correctamente registrado.",
                            err: null
                        });
                    }
                }
                await afiliados().insertAfiliado(afiliado);
            }
        }
        res.status(200).send({
            message: "Información del retiro insertada correctamente."
        });
    }
    catch (err) {
        res.status(400).send({
            message: "Ha ocurrido un error al insertar los datos del retiro.",
            error: err
        });
        throw err;
    }
}
export async function getRetiros(req, res) {
    if (!rejectEmptyInput(req, res))
        return;
    const id = req.params.id;
    const from = req.query.from;
    const to = req.query.to;
    const orden = req.query.orden;
    const campo = req.query.campo;
    const search = req.query.search;
    try {
        if (from === "" && to === "") {
            return res.status(400).send({
                message: "No se han especificado fechas de comienzo y final."
            });
        }
        if (id !== "*") {
            const retiro = await retirosModel().getRetiro(id);
            res.status(200).send(retiro);
        }
        const retiros = await retirosModel().getRetiros(from, to, campo, orden);
        if (retiros === null) {
            res.status(400).send({
                message: "No hay retiros registrados en las fechas especificadas.",
                err: null
            });
            return;
        }
        if (search !== "") {
            const filteredRetiros = retiros.filter((retiro) => {
                for (let key in retiro) {
                    if (typeof retiro[key] === "string") {
                        if (retiro[key].toLowerCase().includes(search))
                            return retiro;
                    }
                    else if (typeof retiro[key] === "number") {
                        if (retiro[key].toString().toLowerCase().includes(search))
                            return retiro;
                    }
                }
            });
            return res.status(200).send(filteredRetiros);
        }
        res.status(200).send(retiros);
    }
    catch (err) {
        res.status(400).send({
            message: "Ha ocurrido un error al obtener los datos del retiro.",
            error: err
        });
        throw err;
    }
}
export async function deleteRetiro(req, res) {
    if (!rejectEmptyInput(req, res))
        return;
    const id = req.params.id;
    const session = req.session;
    try {
        // if (session.userInfo?.role !== "Administrador" || "Auditor") {
        //     return res.status(400).send({
        //         message: "Los usuarios Editores no tienen permiso para realizar esta accion."
        //     })
        // }
        if (!id) {
            res.status(400).send({
                message: "No se ha seleccionado ningún retiro para eliminar."
            });
        }
        await retirosModel().deleteRetiro(id);
        res.status(200).send({
            message: "Registros del Retiro eliminados correctamente."
        });
    }
    catch (err) {
        res.status(400).send({
            message: "Ha ocurrido un error al obtener los datos del retiro.",
            error: err
        });
        throw err;
    }
}
export async function createRetirosReport(req, res) {
    const from = req.query.from;
    const to = req.query.to;
    if (from === "" || undefined && to === "" || undefined) {
        return res.status(400).send({
            message: "No se han especificado las fechas para obtener los retiros."
        });
    }
    try {
        const retiros = await retirosModel().getRetiros(from, to);
        if (retiros !== null) {
            retirosReport(retiros, from, to);
        }
        res.status(200).send({
            message: "Fino calidad carteulo"
        });
    }
    catch (err) {
        res.status(400).send({
            message: "Ha ocurrido un error al obtener los datos de las estadisticas.",
            error: err
        });
        throw err;
    }
}
export async function sendRetiroStats(req, res) {
    try {
        const date = new Date();
        const resultTotalesAnterior = await retirosModel().getRetirosInfo(`${date.getFullYear()}-${date.getMonth()}-01`, `${date.getFullYear()}-${date.getMonth() + 1}-01`, "Retiro Total");
        const resultParcialesAnterior = await retirosModel().getRetirosInfo(`${date.getFullYear()}-${date.getMonth()}-01`, `${date.getFullYear()}-${date.getMonth() + 1}-01`, "Retiro Parcial");
        const resultTotales = await retirosModel().getRetirosInfo(`${date.getFullYear()}-${date.getMonth() + 1}-01`, `${date.getFullYear()}-${date.getMonth() + 2}-01`, "Retiro Total");
        const resultParciales = await retirosModel().getRetirosInfo(`${date.getFullYear()}-${date.getMonth() + 1}-01`, `${date.getFullYear()}-${date.getMonth() + 2}-01`, "Retiro Parcial");
        let data = {
            labels: ["Retiros"],
            datasets: [
                { name: "Retiros Parciales del Mes Anterior", values: [resultParcialesAnterior?.result] },
                { name: "Retiros Parciales del Mes Actual", values: [resultParciales?.result] },
                { name: "Retiros Totales del Mes Anterior", values: [resultTotalesAnterior?.result] },
                { name: "Retiros Totales del Mes Actual", values: [resultTotales?.result] },
            ]
        };
        res.status(200).send(data);
    }
    catch (err) {
        res.status(400).send({
            message: "Ha ocurrido un error al obtener los datos de las estadisticas.",
            error: err
        });
        throw err;
    }
}
