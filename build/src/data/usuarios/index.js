import { pool } from "../mysqlConnection.js";
export function usuarios() {
    const getUsers = async () => {
        try {
            const query = "SELECT * FROM usuarios WHERE role != 'Administrador'";
            const [usersFromDB] = await pool.query(query);
            const usuarios = usersFromDB.map(user => {
                return {
                    id: user.id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    username: user.username,
                    role: user.role,
                    estado: user.estado
                };
            });
            return usuarios;
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    };
    const getUser = async (id) => {
        try {
            const query = "SELECT * FROM usuarios WHERE id = ?";
            const [userFromDB] = await pool.query(query, [id]);
            const user = userFromDB.map(user => {
                return {
                    id: user.id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    username: user.username,
                    role: user.role,
                    estado: user.estado
                };
            });
            return user;
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    };
    const editUser = async (id, nombre, apellido, username, role) => {
        try {
            const query = "UPDATE usuarios SET nombre = ?, apellido = ?, username = ?, role = ? WHERE id = ?";
            const [result, fields] = await pool.query(query, [
                nombre, apellido, username, role, id
            ]);
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    };
    const deleteUser = async (id) => {
        try {
            const query = "DELETE FROM usuarios WHERE id = ?";
            const [result, fields] = await pool.query(query, [id]);
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    };
    const blockUser = async (id) => {
        try {
            const query = "UPDATE usuarios SET estado = 'Bloqueado' WHERE id = ?";
            const [result, fields] = await pool.query(query, [id]);
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    };
    const unlockUser = async (id) => {
        try {
            const query = "UPDATE usuarios SET estado = 'Activo' WHERE id = ?";
            const [result, fields] = await pool.query(query, [id]);
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    };
    return {
        getUsers,
        getUser,
        deleteUser,
        blockUser,
        unlockUser,
        editUser
    };
}
