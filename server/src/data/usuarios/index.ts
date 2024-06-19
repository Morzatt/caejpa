import { pool } from "../mysqlConnection";
import { RowDataPacket } from "mysql2";
import { Usuario } from "../types";

export function usuarios() {
    const getUsers = async (): Promise<Usuario[]> => {
        try {
            const query = "SELECT * FROM usuarios WHERE role != 'Administrador'"
            const [usersFromDB] = await pool.query<RowDataPacket[]>(query)

            const usuarios: Usuario[] = usersFromDB.map(user => {
                return {
                    id: user.id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    username: user.username,
                    role: user.role,
                    estado: user.estado
                }
            })

            return usuarios
        } catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`)
            throw err
        }
    }

    const getUser = async (id: string): Promise<Usuario[]> => {
        try {
            const query = "SELECT * FROM usuarios WHERE id = ?"
            const [userFromDB] = await pool.query<RowDataPacket[]>(query, [id])

            const user: Usuario[] = userFromDB.map(user => {
                return {
                    id: user.id,
                    nombre: user.nombre,
                    apellido: user.apellido,
                    username:  user.username,
                    role: user.role,
                    estado: user.estado
                }
            })

            return user
        } catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`)
            throw err
        }
    }

    const editUser = async (id: string, nombre, apellido, username, role): Promise<void> => {
        try {
            const query = "UPDATE usuarios SET nombre = ?, apellido = ?, username = ?, role = ? WHERE id = ?" 
            const [result, fields] = await pool.query<RowDataPacket[]>(query, [
                nombre, apellido, username, role, id
            ])
        } catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`)
            throw err
        }
    }
    const deleteUser = async (id: string): Promise<void> => {
        try {
            const query = "DELETE FROM usuarios WHERE id = ?"
            const [result, fields] = await pool.query<RowDataPacket[]>(query, [id])
        } catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`)
            throw err
        }
    }

    const blockUser = async (id: string): Promise<void> => {
        try {
            const query = "UPDATE usuarios SET estado = 'Bloqueado' WHERE id = ?"
            const [result, fields] = await pool.query<RowDataPacket[]>(query, [id])
        } catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`)
            throw err
        }
    }
    const unlockUser = async (id: string): Promise<void> => {
        try {
            const query = "UPDATE usuarios SET estado = 'Activo' WHERE id = ?"
            const [result, fields] = await pool.query<RowDataPacket[]>(query, [id])
        } catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`)
            throw err
        }
    }

    return {
        getUsers,
        getUser,
        deleteUser,
        blockUser,
        unlockUser,
        editUser
    }
}