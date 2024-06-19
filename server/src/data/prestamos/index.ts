import type { PrestamoInfo } from "../types"
import type { RowDataPacket } from "mysql2";
import { pool } from "../mysqlConnection";

export function prestamos() {
    const insertPrestamo = async (prestamo: PrestamoInfo): Promise<void> => {
        try {
            const query = "INSERT INTO prestamos(`expediente`, `fecha`, `nombre`, `apellido`, `cedula`, `cantidad`, `gastos_admin`, `servicio_transf`, `porcentaje_intereses`, `monto_intereses`, `monto_pago`, `tiempo_pago`, `cuota_mensual`, `cuota_quincenal`, `concepto`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" 
            const result = await pool.query(query, [
                prestamo.expediente,
                prestamo.fecha,
                prestamo.nombre,
                prestamo.apellido,
                prestamo.cedula,

                prestamo.cantidad,

                prestamo.gastosAdministrativos,
                prestamo.servicioDeTransferencia,
                prestamo.porcentajeDeIntereses,

                prestamo.montoDeIntereses,
                prestamo.total,

                prestamo.tiempoDePago,
                prestamo.cuotaMensual,
                prestamo.cuotaQuincenal,

                prestamo.concepto
            ])
        } catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`)
            throw err
        }
    } 

    const getPrestamos = async (from: string, to: string, campo?: string, orden?: string): Promise<PrestamoInfo[] | null> => {
        try {
            const query = ` SELECT id, expediente, DATE_FORMAT(fecha, "%d/%m/%Y") as fecha, 
                                   nombre, apellido, cedula, cantidad, gastos_admin, servicio_transf,
                                   porcentaje_intereses, monto_intereses, monto_pago, tiempo_pago, 
                                   cuota_mensual, cuota_quincenal, concepto 

                            FROM prestamos 
                            WHERE fecha BETWEEN ? AND ?
                            ORDER BY prestamos.${campo ? campo : "fecha"} ${orden ? orden : "ASC"};`

            const [result] = await pool.query<RowDataPacket[]>(query, [from, to])
            if (result[0] != null) {
                const prestamos: PrestamoInfo[] = result.map(prestamo => {
                    return {
                        id: prestamo.id,
                        expediente: prestamo.expediente,
                        fecha: prestamo.fecha,
                        nombre: prestamo.nombre,
                        apellido: prestamo.apellido,
                        cedula: prestamo.cedula,

                        cantidad: prestamo.cantidad,

                        gastosAdministrativos: prestamo.gastos_admin,
                        servicioDeTransferencia: prestamo.servicio_transf,
                        porcentajeDeIntereses: prestamo.porcentaje_intereses,

                        montoDeIntereses: prestamo.monto_intereses,
                        total: prestamo.monto_pago,

                        tiempoDePago: prestamo.tiempo_pago,
                        cuotaMensual: prestamo.cuota_mensual,
                        cuotaQuincenal: prestamo.cuota_quincenal,

                        concepto: prestamo.concepto
                    }
                })

                return prestamos
            } else {
                console.log("No hay prestamos en el lapso de tiempo especificado")
                return null
            }

        } catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`)
            throw err
        }
    }

    const getPrestamo = async (prestamoId: number | string): Promise<PrestamoInfo[]> => {
        try {
            const query = ` SELECT id, expediente, DATE_FORMAT(fecha, "%d/%m/%Y") as fecha, 
                                   nombre, apellido, cedula, cantidad, gastos_admin, servicio_transf,
                                   porcentaje_intereses, monto_intereses, monto_pago, tiempo_pago, 
                                   cuota_mensual, cuota_quincenal, concepto 
                            FROM prestamos 
                            WHERE id = ?;`

            const [result] = await pool.query<RowDataPacket[]>(query, [prestamoId])

            const prestamo: PrestamoInfo[] = result.map(prestamo => {
                return {
                    id: prestamo.id,
                    expediente: prestamo.expediente,
                    fecha: prestamo.fecha,
                    nombre: prestamo.nombre,
                    apellido: prestamo.apellido,
                    cedula: prestamo.cedula,

                    cantidad: prestamo.cantidad,

                    gastosAdministrativos: prestamo.gastos_admin,
                    servicioDeTransferencia: prestamo.servicio_transf,
                    porcentajeDeIntereses: prestamo.porcentaje_intereses,

                    montoDeIntereses: prestamo.monto_intereses,
                    total: prestamo.monto_pago,

                    tiempoDePago: prestamo.tiempo_pago,
                    cuotaMensual: prestamo.cuota_mensual,
                    cuotaQuincenal: prestamo.cuota_quincenal,

                    concepto: prestamo.concepto
                }
            })
            return prestamo

        } catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`)
            throw err
        }
    }

    const deletePrestamo = async (id: string | number) => {
        try {
            const query = "DELETE FROM prestamos WHERE id = ?"
            const [result, fields] = await pool.query(query, id)
            console.log(result)
        } catch (err) {
            console.log("Se ha producido un error al intentar eliminar el prestamo")
            throw err 
        }
    }

    const getPrestamosInfo = async (from: string, to: string) => {
        const query = `SELECT COUNT(*) as result FROM prestamos WHERE fecha BETWEEN ? AND ? `
        try {
            const [result, fields] = await pool.query<RowDataPacket[]>(query, [from, to])
            return result[0]
        } catch (err){
            console.log(err)
        }
    }

    return {
        getPrestamosInfo,
        insertPrestamo,
        getPrestamos,
        getPrestamo,
        deletePrestamo
    }
}