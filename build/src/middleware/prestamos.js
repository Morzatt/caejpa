import { prestamos as prestamosModel } from "../data/prestamos/index.js";
import { checkAfiliadosRetirados, rejectEmptyInput } from "./utils/index.js";
import { multipleReport, singleReport } from "./pdf/index.js";
import { afiliados } from "../data/afiliados/index.js";
export async function insertPrestamo(req, res) {
    if (!rejectEmptyInput(req, res))
        return;
    const prestamo = req.body;
    const result = await checkAfiliadosRetirados(req, res, prestamo.cedula);
    if (result)
        return;
    const afiliate = req.query.afiliate;
    try {
        await prestamosModel().insertPrestamo(prestamo);
        if (afiliate === "true") {
            const afiliado = {
                expediente: prestamo.expediente,
                nombre: prestamo.nombre,
                apellido: prestamo.apellido,
                cedula: prestamo.cedula
            };
            const afiliadosFromDB = await afiliados().getAfiliados();
            if (afiliadosFromDB === null) {
                await afiliados().insertAfiliado(afiliado);
            }
            else {
                for (let i in afiliadosFromDB) {
                    if (afiliadosFromDB[i].cedula === afiliado.cedula) {
                        return res.status(200).send({
                            message: "Prestamo correctamente registrado.",
                            err: null
                        });
                    }
                }
                await afiliados().insertAfiliado(afiliado);
            }
        }
        res.status(200).send({
            message: "Prestamo correctamente registrado.",
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
export async function getPrestamos(req, res) {
    const from = req.query.from;
    const to = req.query.to;
    const id = req.params.id;
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
            const prestamo = await prestamosModel().getPrestamo(id);
            return res.status(200).send(prestamo[0]);
        }
        const prestamos = await prestamosModel().getPrestamos(from, to, campo, orden);
        if (prestamos === null) {
            res.status(400).send({
                message: "No hay prestamos registrados en las fechas especificadas.",
                err: null
            });
            return;
        }
        if (search !== "") {
            const filteredPrestamos = prestamos.filter((prestamo) => {
                for (let key in prestamo) {
                    if (typeof prestamo[key] === "string") {
                        if (prestamo[key].toLowerCase().includes(search))
                            return prestamo;
                    }
                    else if (typeof prestamo[key] === "number") {
                        if (prestamo[key].toString().toLowerCase().includes(search))
                            return prestamo;
                    }
                }
            });
            return res.status(200).send(filteredPrestamos);
        }
        res.status(200).send(prestamos);
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
export async function individualDownload(req, res) {
    if (!rejectEmptyInput(req, res))
        return;
    const prestamoId = req.body.prestamoId;
    try {
        const prestamo = await prestamosModel().getPrestamo(prestamoId);
        singleReport(prestamo[0]);
        res.status(200).send({
            message: "fino"
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
export async function grupalDownload(req, res) {
    if (!rejectEmptyInput(req, res))
        return;
    const from = req.body.from;
    const to = req.body.to;
    try {
        const prestamos = await prestamosModel().getPrestamos(from, to);
        if (prestamos !== null) {
            multipleReport(prestamos, from, to);
        }
        res.status(200).send({
            message: "fino"
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
export async function deletePrestamo(req, res) {
    // if (!isAdmin(req, res)) return 
    const id = req.params.id;
    const session = req.session;
    try {
        // if (session.userInfo?.role !== "Administrador" || "Auditor") {
        //     return res.status(400).send({
        //         message: "Los usuarios Editores no tienen permiso para realizar esta accion."
        //     })
        // }
        await prestamosModel().deletePrestamo(id);
        res.status(200).send({
            message: "Se ha eliminado el prestamo correctamente"
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
export async function sendPrestamosStats(req, res) {
    try {
        const date = new Date();
        const resultAnterior = await prestamosModel().getPrestamosInfo(`${date.getFullYear()}-${date.getMonth()}-01`, `${date.getFullYear()}-${date.getMonth() + 1}-01`);
        const resultActual = await prestamosModel().getPrestamosInfo(`${date.getFullYear()}-${date.getMonth() + 1}-01`, `${date.getFullYear()}-${date.getMonth() + 2}-01`);
        let data = {
            labels: ["Prestamos"],
            datasets: [
                { name: "Prestamos del Mes Anterior", values: [resultAnterior?.result] },
                { name: "Prestamos del Mes Actual", values: [resultActual?.result] },
            ]
        };
        res.status(200).send(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send({
            message: `Ha ocurrido un error al obtener las estadisticas`,
            err: err
        });
        throw err;
    }
}
