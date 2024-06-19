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
exports.retiros = void 0;
const mysqlConnection_1 = require("../mysqlConnection");
function retiros() {
    const insertRetiro = (retiro) => __awaiter(this, void 0, void 0, function* () {
        const { nombre, apellido, fecha, cedula, total, motivo, modalidad, referencia } = retiro;
        try {
            const query = `INSERT INTO retiros (nombre, apellido, fecha, cedula, total, motivo, modalidad, referencia) VALUES (?,?,?, ?, ?, ?, ?, ?);`;
            const [response, fields] = yield mysqlConnection_1.pool.query(query, [
                nombre, apellido, fecha, cedula, total, motivo, modalidad, referencia
            ]);
        }
        catch (err) {
            console.log(`${err}`);
            throw err;
        }
    });
    const getRetiros = (from, to, campo, orden) => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = ` SELECT id , DATE_FORMAT(fecha, "%d/%m/%Y") as fecha, 
                                   nombre, apellido, cedula, total, motivo, modalidad, referencia
                            FROM retiros 
                            WHERE fecha BETWEEN ? AND ?
                            ORDER BY retiros.${campo ? campo : "fecha"} ${orden ? orden : "ASC"};`;
            const [response, fields] = yield mysqlConnection_1.pool.query(query, [from, to]);
            if (response !== null) {
                const result = response.map((row) => {
                    return {
                        id: row.id,
                        nombre: row.nombre,
                        apellido: row.apellido,
                        fecha: row.fecha,
                        cedula: row.cedula,
                        total: row.total,
                        motivo: row.motivo,
                        modalidad: row.modalidad,
                        referencia: row.referencia
                    };
                });
                return result;
            }
            else {
                return null;
            }
        }
        catch (err) {
            console.log(`${err}`);
            throw err;
        }
    });
    const getRetiro = (id) => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `SELECT FROM retiros WHERE id = ?`;
            const [response, fields] = yield mysqlConnection_1.pool.query(query, id);
            if (response !== null) {
                const result = response.map((row) => {
                    return {
                        id: row.id,
                        nombre: row.nombre,
                        apellido: row.apellido,
                        fecha: row.fecha,
                        cedula: row.cedula,
                        total: row.total,
                        motivo: row.motivo,
                        modalidad: row.modalidad,
                        referencia: row.referencia
                    };
                });
                return result[0];
            }
            else {
                return null;
            }
        }
        catch (err) {
            console.log(`${err}`);
            throw err;
        }
    });
    const deleteRetiro = (id) => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `DELETE FROM retiros WHERE id = ?`;
            const [response, fields] = yield mysqlConnection_1.pool.query(query, id);
        }
        catch (err) {
            console.log(`${err}`);
            throw err;
        }
    });
    const getRetirosInfo = (from, to, motivo) => __awaiter(this, void 0, void 0, function* () {
        const query = `SELECT COUNT(*) as result FROM retiros WHERE fecha BETWEEN ? AND ? AND motivo = ?`;
        try {
            const [result, fields] = yield mysqlConnection_1.pool.query(query, [from, to, motivo]);
            return result[0];
        }
        catch (err) {
            console.log(err);
        }
    });
    return {
        getRetirosInfo,
        insertRetiro,
        getRetiros,
        getRetiro,
        deleteRetiro
    };
}
exports.retiros = retiros;
