import { compare } from "bcrypt";
import { pool } from "../mysqlConnection";
export function login() {
    const checkUsername = async (username) => {
        const query = "SELECT username FROM usuarios WHERE username = ?";
        try {
            const [usernameFromDB] = await pool.query(query, username);
            if (usernameFromDB[0] != null) {
                const username = usernameFromDB[0].username;
                return username;
            }
            else {
                console.log("There was no user");
                return null;
            }
        }
        catch (err) {
            console.log(`An error has ocurred when searching for if there was any user with the same username before: ${err}`);
            throw err;
        }
    };
    const authUser = async (username, password) => {
        try {
            const query = "SELECT * FROM usuarios WHERE username = ?";
            const [userFromDB] = await pool.query(query, username);
            let userData = {
                id: userFromDB[0].id,
                nombre: userFromDB[0].nombre,
                apellido: userFromDB[0].apellido,
                username: userFromDB[0].username,
                password: userFromDB[0].password
            };
            const result = await compare(password, userData.password);
            return result;
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    };
    const getUsers = async () => {
        try {
            const query = "SELECT * FROM usuarios WHERE id";
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
    const getUser = async (username) => {
        try {
            const query = "SELECT * FROM usuarios WHERE username = ?";
            const [userFromDB] = await pool.query(query, [username]);
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
    return {
        checkUsername,
        authUser,
        getUsers,
        getUser
    };
}
