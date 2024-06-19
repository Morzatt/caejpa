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
exports.register = void 0;
const mysqlConnection_1 = require("../mysqlConnection");
function register() {
    const checkUsername = (username) => __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT username FROM usuarios WHERE username = ?";
        try {
            const [usuarios] = yield mysqlConnection_1.pool.query(query, username);
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
    });
    const getRoles = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "SELECT * FROM usuarios";
            const [rolesFromDB] = yield mysqlConnection_1.pool.query(query);
            const roles = rolesFromDB.map(user => {
                return user.role;
            });
            return roles;
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    });
    const insertUser = (userData) => __awaiter(this, void 0, void 0, function* () {
        const { nombre, apellido, username, password, role } = userData;
        try {
            const query = "INSERT INTO usuarios (nombre, apellido, username, password) VALUES (?, ?, ?, ?)";
            const request = yield mysqlConnection_1.pool.query(query, [nombre, apellido, username, password, role]);
            return;
        }
        catch (err) {
            console.log(`An error has ocurred when inserting the values for the InsertUser query: ${err}`);
            throw err;
        }
    });
    const insertSecurityQuestions = (preguntasDeSeguridad) => __awaiter(this, void 0, void 0, function* () {
        const { usuario, pregunta1, pregunta2, respuesta1, respuesta2 } = preguntasDeSeguridad;
        try {
            const query = "INSERT INTO preguntas_seguridad (usuario, preg_seg_1, res_1, preg_seg_2, res_2) VALUES (?, ?, ?, ?, ?)";
            const request = yield mysqlConnection_1.pool.query(query, [usuario, pregunta1, respuesta1, pregunta2, respuesta2]);
            return;
        }
        catch (err) {
            console.log(`An error has ocurred when inserting the values for the InsertUser query: ${err}`);
            throw err;
        }
    });
    const getSecurityQuestions = (user) => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "SELECT * FROM preguntas_seguridad WHERE usuario = ?;";
            const [request] = yield mysqlConnection_1.pool.query(query, [user]);
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
    });
    const changePassword = (newData) => __awaiter(this, void 0, void 0, function* () {
        const { username, password } = newData;
        try {
            const query = "UPDATE usuarios SET password = ? WHERE username = ?";
            const request = yield mysqlConnection_1.pool.query(query, [password, username]);
            return;
        }
        catch (err) {
            console.log("An error has ocurred when executing the changePassword function.");
            throw err;
        }
    });
    return {
        checkUsername,
        insertUser,
        getRoles,
        insertSecurityQuestions,
        getSecurityQuestions,
        changePassword
    };
}
exports.register = register;
