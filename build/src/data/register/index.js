import { pool } from "../mysqlConnection.js";
export function register() {
    const checkUsername = async (username) => {
        const query = "SELECT username FROM usuarios WHERE username = ?";
        try {
            const [usuarios] = await pool.query(query, username);
            if (usuarios[0] != null) {
                const usuario = usuarios[0].username;
                return usuario;
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
    const getRoles = async () => {
        try {
            const query = "SELECT * FROM usuarios";
            const [rolesFromDB] = await pool.query(query);
            const roles = rolesFromDB.map(user => {
                return user.role;
            });
            return roles;
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    };
    const insertUser = async (userData) => {
        const { nombre, apellido, username, password, role } = userData;
        try {
            const query = "INSERT INTO usuarios (nombre, apellido, username, password) VALUES (?, ?, ?, ?)";
            const request = await pool.query(query, [nombre, apellido, username, password, role]);
            return;
        }
        catch (err) {
            console.log(`An error has ocurred when inserting the values for the InsertUser query: ${err}`);
            throw err;
        }
    };
    const insertSecurityQuestions = async (preguntasDeSeguridad) => {
        const { usuario, pregunta1, pregunta2, respuesta1, respuesta2 } = preguntasDeSeguridad;
        try {
            const query = "INSERT INTO preguntas_seguridad (usuario, preg_seg_1, res_1, preg_seg_2, res_2) VALUES (?, ?, ?, ?, ?)";
            const request = await pool.query(query, [usuario, pregunta1, respuesta1, pregunta2, respuesta2]);
            return;
        }
        catch (err) {
            console.log(`An error has ocurred when inserting the values for the InsertUser query: ${err}`);
            throw err;
        }
    };
    const getSecurityQuestions = async (user) => {
        try {
            const query = "SELECT * FROM preguntas_seguridad WHERE usuario = ?;";
            const [request] = await pool.query(query, [user]);
            const preguntas = request.map(pregunta => {
                return {
                    usuario: pregunta.usuario,
                    pregunta1: pregunta.preg_seg_1,
                    respuesta1: pregunta.res_1,
                    pregunta2: pregunta.preg_seg_2,
                    respuesta2: pregunta.res_2
                };
            });
            return preguntas;
        }
        catch (err) {
            console.log(`An error has ocurred when inserting the values for the InsertUser query: ${err}`);
            throw err;
        }
    };
    const changePassword = async (newData) => {
        const { username, password } = newData;
        try {
            const query = "UPDATE usuarios SET password = ? WHERE username = ?";
            const request = await pool.query(query, [password, username]);
            return;
        }
        catch (err) {
            console.log("An error has ocurred when executing the changePassword function.");
            throw err;
        }
    };
    return {
        checkUsername,
        insertUser,
        getRoles,
        insertSecurityQuestions,
        getSecurityQuestions,
        changePassword
    };
}
