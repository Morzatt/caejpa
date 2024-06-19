"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prestamos = void 0;
const mysqlConnection_1 = require("../mysqlConnection");
function prestamos() {
    const insertPrestamo = (prestamo) => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "INSERT INTO prestamos(`expediente`, `fecha`, `nombre`, `apellido`, `cedula`, `cantidad`, `gastos_admin`, `servicio_transf`, `porcentaje_intereses`, `monto_intereses`, `monto_pago`, `tiempo_pago`, `cuota_mensual`, `cuota_quincenal`, `concepto`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            const result = yield mysqlConnection_1.pool.query(query, [
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
            ]);
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    });
    const getPrestamos = (from, to, campo, orden) => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = ` SELECT id, expediente, DATE_FORMAT(fecha, "%d/%m/%Y") as fecha, 
                                   nombre, apellido, cedula, cantidad, gastos_admin, servicio_transf,
                                   porcentaje_intereses, monto_intereses, monto_pago, tiempo_pago, 
                                   cuota_mensual, cuota_quincenal, concepto 

                            FROM prestamos 
                            WHERE fecha BETWEEN ? AND ?
                            ORDER BY prestamos.${campo ? campo : "fecha"} ${orden ? orden : "ASC"};`;
            const [result] = yield mysqlConnection_1.pool.query(query, [from, to]);
            if (result[0] != null) {
                const prestamos = result.map(prestamo => {
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
                    };
                });
                return prestamos;
            }
            else {
                console.log("No hay prestamos en el lapso de tiempo especificado");
                return null;
            }
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    });
    const getPrestamo = (prestamoId) => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = ` SELECT id, expediente, DATE_FORMAT(fecha, "%d/%m/%Y") as fecha, 
                                   nombre, apellido, cedula, cantidad, gastos_admin, servicio_transf,
                                   porcentaje_intereses, monto_intereses, monto_pago, tiempo_pago, 
                                   cuota_mensual, cuota_quincenal, concepto 
                            FROM prestamos 
                            WHERE id = ?;`;
            const [result] = yield mysqlConnection_1.pool.query(query, [prestamoId]);
            const prestamo = result.map(prestamo => {
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
                };
            });
            return prestamo;
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    });
    const deletePrestamo = (id) => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "DELETE FROM prestamos WHERE id = ?";
            const [result, fields] = yield mysqlConnection_1.pool.query(query, id);
            console.log(result);
        }
        catch (err) {
            console.log("Se ha producido un error al intentar eliminar el prestamo");
            throw err;
        }
    });
    const getPrestamosInfo = (from, to) => __awaiter(this, void 0, void 0, function* () {
        const query = `SELECT COUNT(*) as result FROM prestamos WHERE fecha BETWEEN ? AND ? `;
        try {
            const [result, fields] = yield mysqlConnection_1.pool.query(query, [from, to]);
            return result[0];
        }
        catch (err) {
            console.log(err);
        }
    });
    return {
        getPrestamosInfo,
        insertPrestamo,
        getPrestamos,
        getPrestamo,
        deletePrestamo
    };
}
exports.prestamos = prestamos;
