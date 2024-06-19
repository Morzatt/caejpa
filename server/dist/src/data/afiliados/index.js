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
exports.afiliados = void 0;
const mysqlConnection_1 = require("../mysqlConnection");
function afiliados() {
    const insertAfiliado = (afiliadoData) => __awaiter(this, void 0, void 0, function* () {
        const query = "INSERT INTO afiliados_frecuentes (expediente, nombre, apellido, cedula) VALUES (?, ?, ?, ?)";
        const { expediente, nombre, apellido, cedula } = afiliadoData;
        try {
            const [result] = yield mysqlConnection_1.pool.query(query, [expediente, nombre, apellido, cedula]);
        }
        catch (err) {
            console.log(`An error has ocurred when searching for if there was any user with the same username before: ${err}`);
            throw err;
        }
    });
    const getAfiliados = () => __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT * FROM afiliados_frecuentes;";
        try {
            const [result, fields] = yield mysqlConnection_1.pool.query(query);
            if (result !== null) {
                const afiliados = result.map((afiliado) => {
                    return {
                        expediente: afiliado.expediente,
                        nombre: afiliado.nombre,
                        apellido: afiliado.apellido,
                        cedula: afiliado.cedula
                    };
                });
                return afiliados;
            }
            else {
                return null;
            }
        }
        catch (err) {
            console.log(`An error has ocurred when searching for if there was any user with the same username before: ${err}`);
            throw err;
        }
    });
    const deleteAfiliado = (cedula) => __awaiter(this, void 0, void 0, function* () {
        const query = "DELETE FROM afiliados_frecuentes WHERE cedula = ?;";
        try {
            const [result, fields] = yield mysqlConnection_1.pool.query(query, cedula);
        }
        catch (err) {
            console.log(`An error has ocurred when searching for if there was any user with the same username before: ${err}`);
            throw err;
        }
    });
    const insertAfiliadoRetirado = (Afiliado) => __awaiter(this, void 0, void 0, function* () {
        const { expediente, nombre, apellido, cedula } = Afiliado;
        const query = `INSERT INTO afiliados_retirados (expediente, nombre, apellido, cedula) VALUES (?,?,?,?);`;
        try {
            const [result, fields] = yield mysqlConnection_1.pool.query(query, [
                expediente, nombre, apellido, cedula
            ]);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
    const checkAfiliadoRetirado = (cedula) => __awaiter(this, void 0, void 0, function* () {
        const query = `SELECT * FROM afiliados_retirados WHERE cedula = ?`;
        try {
            const [result, fields] = yield mysqlConnection_1.pool.query(query, cedula);
            if (result.length !== 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
    const getAfiliadosRetirados = (cedula) => __awaiter(this, void 0, void 0, function* () {
        const query = `SELECT * FROM afiliados_retirados WHERE cedula = ?`;
        try {
            const [result, fields] = yield mysqlConnection_1.pool.query(cedula === "*" ? "SELECT * FROM afiliados_retirados;" : query, cedula);
            if (result !== null) {
                const retirados = result.map((afiliado) => {
                    return {
                        expediente: afiliado.expediente,
                        nombre: afiliado.nombre,
                        apellido: afiliado.apellido,
                        cedula: afiliado.cedula
                    };
                });
                return retirados;
            }
            else {
                return null;
            }
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    });
    const deleteAfiliadoRetirado = (cedula) => __awaiter(this, void 0, void 0, function* () {
        const query = "DELETE FROM afiliados_retirados WHERE cedula = ?";
        try {
            const [result, fields] = yield mysqlConnection_1.pool.query(query, cedula);
        }
        catch (err) {
            console.log(err);
        }
    });
    const insertReingresoData = (nombre, apellido, cedula, expediente, motivo, usuario) => __awaiter(this, void 0, void 0, function* () {
        const query = `INSERT INTO reingresos (nombre, apellido, cedula, expediente, motivo_reingreso, fecha, usuario) VALUES (?,?,?,?,?,NOW(),?)`;
        try {
            const [result, fields] = yield mysqlConnection_1.pool.query(query, [
                nombre, apellido, cedula, expediente, motivo, usuario
            ]);
            console.log(result);
        }
        catch (err) {
            console.log(err);
        }
    });
    const getReingresoData = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `SELECT nombre, apellido, expediente, cedula, motivo_reingreso, DATE_FORMAT(fecha, "%d/%m/%Y") as fecha, usuario FROM reingresos;`;
            const [result, fields] = yield mysqlConnection_1.pool.query(query);
            if (result !== null) {
                const reingresos = result.map(row => {
                    return {
                        nombre: row.nombre,
                        apellido: row.apellido,
                        expediente: row.expediente,
                        cedula: row.cedula,
                        motivo: row.motivo_reingreso,
                        fecha: row.fecha,
                        usuario: row.usuario
                    };
                });
                return reingresos;
            }
            else {
                return null;
            }
        }
        catch (err) {
            console.log(err);
        }
        return null;
    });
    return {
        insertAfiliado,
        getAfiliados,
        deleteAfiliado,
        insertAfiliadoRetirado,
        checkAfiliadoRetirado,
        getAfiliadosRetirados,
        deleteAfiliadoRetirado,
        insertReingresoData,
        getReingresoData
    };
}
exports.afiliados = afiliados;
