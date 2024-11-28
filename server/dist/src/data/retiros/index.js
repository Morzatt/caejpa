import { pool } from "../mysqlConnection";
export function retiros() {
    const insertRetiro = async (retiro) => {
        const { nombre, apellido, fecha, cedula, total, motivo, modalidad, referencia } = retiro;
        try {
            const query = `INSERT INTO retiros (nombre, apellido, fecha, cedula, total, motivo, modalidad, referencia) VALUES (?,?,?, ?, ?, ?, ?, ?);`;
            const [response, fields] = await pool.query(query, [
                nombre, apellido, fecha, cedula, total, motivo, modalidad, referencia
            ]);
        }
        catch (err) {
            console.log(`${err}`);
            throw err;
        }
    };
    const getRetiros = async (from, to, campo, orden) => {
        try {
            const query = ` SELECT id , DATE_FORMAT(fecha, "%d/%m/%Y") as fecha, 
                                   nombre, apellido, cedula, total, motivo, modalidad, referencia
                            FROM retiros 
                            WHERE fecha BETWEEN ? AND ?
                            ORDER BY retiros.${campo ? campo : "fecha"} ${orden ? orden : "ASC"};`;
            const [response, fields] = await pool.query(query, [from, to]);
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
    };
    const getRetiro = async (id) => {
        try {
            const query = `SELECT FROM retiros WHERE id = ?`;
            const [response, fields] = await pool.query(query, id);
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
    };
    const deleteRetiro = async (id) => {
        try {
            const query = `DELETE FROM retiros WHERE id = ?`;
            const [response, fields] = await pool.query(query, id);
        }
        catch (err) {
            console.log(`${err}`);
            throw err;
        }
    };
    const getRetirosInfo = async (from, to, motivo) => {
        const query = `SELECT COUNT(*) as result FROM retiros WHERE fecha BETWEEN ? AND ? AND motivo = ?`;
        try {
            const [result, fields] = await pool.query(query, [from, to, motivo]);
            return result[0];
        }
        catch (err) {
            console.log(err);
        }
    };
    return {
        getRetirosInfo,
        insertRetiro,
        getRetiros,
        getRetiro,
        deleteRetiro
    };
}
