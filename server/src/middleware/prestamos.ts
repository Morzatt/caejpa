import type { Request, Response } from "express";
import type { PrestamoInfo } from "../data/types";
import { prestamos as prestamosModel } from "../data/prestamos";
import { checkAfiliadosRetirados, isAdmin, rejectEmptyInput } from "./utils";
import { multipleReport, singleReport } from "./pdf";
import { Afiliado, UserSession } from "../data/types";
import { afiliados } from "../data/afiliados";


export async function insertPrestamo(req: Request, res: Response) {
    if (!rejectEmptyInput(req, res)) return
    const prestamo: PrestamoInfo = req.body

    const result = await checkAfiliadosRetirados(req, res, prestamo.cedula)
    if (result) return 

    const afiliate = req.query.afiliate
    try {
        await prestamosModel().insertPrestamo(prestamo)
        if (afiliate === "true") {
            const afiliado: Afiliado = {
                expediente: prestamo.expediente,
                nombre: prestamo.nombre,
                apellido: prestamo.apellido,
                cedula: prestamo.cedula
            }
            const afiliadosFromDB = await afiliados().getAfiliados()
            if (afiliadosFromDB === null) {
                await afiliados().insertAfiliado(afiliado)
            } else {
                for (let i in afiliadosFromDB) {
                    if (afiliadosFromDB[i].cedula === afiliado.cedula) {
                        return res.status(200).send({
                            message: "Prestamo correctamente registrado.",
                            err: null
                        })
                    }
                }
                await afiliados().insertAfiliado(afiliado)
            }
        }
        res.status(200).send({
            message: "Prestamo correctamente registrado.",
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

export async function getPrestamos(req: Request, res: Response) {
    const from = req.query.from as string
    const to = req.query.to as string
    const id = req.params.id
    const orden = req.query.orden as string
    const campo = req.query.campo as string
    const search = req.query.search as string
    try {
        if (from === "" && to === "") {
            return res.status(400).send({
                message: "No se han especificado fechas de comienzo y final."
            })
        }
        if (id !== "*") {
            const prestamo = await prestamosModel().getPrestamo(id)
            return res.status(200).send(prestamo[0])
        }
        const prestamos = await prestamosModel().getPrestamos(from, to, campo, orden)
        if (prestamos === null) {
            res.status(400).send({
                message: "No hay prestamos registrados en las fechas especificadas.",
                err: null
            })
            return
        }
        if (search !== "") {
            const filteredPrestamos = prestamos.filter((prestamo) => {
                for (let key in prestamo) {
                    if (typeof prestamo[key] === "string") {
                        if (prestamo[key].toLowerCase().includes(search)) return prestamo
                    } else if (typeof prestamo[key] === "number") {
                        if (prestamo[key].toString().toLowerCase().includes(search)) return prestamo
                    }
                }
            })
            return res.status(200).send(filteredPrestamos)
        }
        res.status(200).send(prestamos)
    } catch (err) {
        console.log(err)
        res.status(400).send({
            message: `Ha ocurrido un error al tratar de obtener todas las variables`,
            err: err
        })
        throw err
    }
}
export async function individualDownload(req: Request, res: Response) {
    if (!rejectEmptyInput(req, res)) return
    const prestamoId: string | number = req.body.prestamoId

    try {
        const prestamo = await prestamosModel().getPrestamo(prestamoId)
        singleReport(prestamo[0])

        res.status(200).send({
            message: "fino"
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

export async function grupalDownload(req: Request, res: Response) {
    if (!rejectEmptyInput(req, res)) return

    const from = req.body.from
    const to = req.body.to

    try {
        const prestamos = await prestamosModel().getPrestamos(from, to)

        if (prestamos !== null) {
            multipleReport(prestamos, from, to)
        }

        res.status(200).send({
            message: "fino"
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

export async function deletePrestamo(req: Request, res: Response) {
    // if (!isAdmin(req, res)) return 
    const id = req.params.id
    const session: UserSession = req.session
    try {
        // if (session.userInfo?.role !== "Administrador" || "Auditor") {
        //     return res.status(400).send({
        //         message: "Los usuarios Editores no tienen permiso para realizar esta accion."
        //     })
        // }
        await prestamosModel().deletePrestamo(id)
        res.status(200).send({
            message: "Se ha eliminado el prestamo correctamente"
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

export async function sendPrestamosStats(req: Request, res: Response) {
    try {
        const date = new Date()
        const resultAnterior = await prestamosModel().getPrestamosInfo(
            `${date.getFullYear()}-${date.getMonth()}-01`,
            `${date.getFullYear()}-${date.getMonth() + 1}-01`,
        )

        const resultActual = await prestamosModel().getPrestamosInfo(
            `${date.getFullYear()}-${date.getMonth() + 1}-01`,
            `${date.getFullYear()}-${date.getMonth() + 2}-01`,
        )

        let data = {
            labels: ["Prestamos"],
            datasets: [
                { name: "Prestamos del Mes Anterior", values: [resultAnterior?.result] },
                { name: "Prestamos del Mes Actual", values: [resultActual?.result] },
            ]
        }

        res.status(200).send(data)
    } catch (err) {
        console.log(err)
        res.status(400).send({
            message: `Ha ocurrido un error al obtener las estadisticas`,
            err: err
        })
        throw err
        
    }
}