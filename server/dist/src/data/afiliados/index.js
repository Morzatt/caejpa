import { pool } from "../mysqlConnection";
export function afiliados() {
    const insertAfiliado = async (afiliadoData) => {
        const query = "INSERT INTO afiliados_frecuentes (expediente, nombre, apellido, cedula) VALUES (?, ?, ?, ?)";
        const { expediente, nombre, apellido, cedula } = afiliadoData;
        try {
            const [result] = await pool.query(query, [expediente, nombre, apellido, cedula]);
        }
        catch (err) {
            console.log(`An error has ocurred when searching for if there was any user with the same username before: ${err}`);
            throw err;
        }
    };
    const getAfiliados = async () => {
        const query = "SELECT * FROM afiliados_frecuentes;";
        try {
            const [result, fields] = await pool.query(query);
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
    };
    const deleteAfiliado = async (cedula) => {
        const query = "DELETE FROM afiliados_frecuentes WHERE cedula = ?;";
        try {
            const [result, fields] = await pool.query(query, cedula);
        }
        catch (err) {
            console.log(`An error has ocurred when searching for if there was any user with the same username before: ${err}`);
            throw err;
        }
    };
    const insertAfiliadoRetirado = async (Afiliado) => {
        const { expediente, nombre, apellido, cedula } = Afiliado;
        const query = `INSERT INTO afiliados_retirados (expediente, nombre, apellido, cedula) VALUES (?,?,?,?);`;
        try {
            const [result, fields] = await pool.query(query, [
                expediente, nombre, apellido, cedula
            ]);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    };
    const checkAfiliadoRetirado = async (cedula) => {
        const query = `SELECT * FROM afiliados_retirados WHERE cedula = ?`;
        try {
            const [result, fields] = await pool.query(query, cedula);
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
    };
    const getAfiliadosRetirados = async (cedula) => {
        const query = `SELECT * FROM afiliados_retirados WHERE cedula = ?`;
        try {
            const [result, fields] = await pool.query(cedula === "*" ? "SELECT * FROM afiliados_retirados;" : query, cedula);
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
    };
    const deleteAfiliadoRetirado = async (cedula) => {
        const query = "DELETE FROM afiliados_retirados WHERE cedula = ?";
        try {
            const [result, fields] = await pool.query(query, cedula);
        }
        catch (err) {
            console.log(err);
        }
    };
    const insertReingresoData = async (nombre, apellido, cedula, expediente, motivo, usuario) => {
        const query = `INSERT INTO reingresos (nombre, apellido, cedula, expediente, motivo_reingreso, fecha, usuario) VALUES (?,?,?,?,?,NOW(),?)`;
        try {
            const [result, fields] = await pool.query(query, [
                nombre, apellido, cedula, expediente, motivo, usuario
            ]);
            console.log(result);
        }
        catch (err) {
            console.log(err);
        }
    };
    const getReingresoData = async () => {
        try {
            const query = `SELECT nombre, apellido, expediente, cedula, motivo_reingreso, DATE_FORMAT(fecha, "%d/%m/%Y") as fecha, usuario FROM reingresos;`;
            const [result, fields] = await pool.query(query);
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
    };
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
