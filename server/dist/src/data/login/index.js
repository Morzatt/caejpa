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
exports.login = void 0;
const bcrypt_1 = require("bcrypt");
const mysqlConnection_1 = require("../mysqlConnection");
function login() {
    const checkUsername = (username) => __awaiter(this, void 0, void 0, function* () {
        const query = "SELECT username FROM usuarios WHERE username = ?";
        try {
            const [usernameFromDB] = yield mysqlConnection_1.pool.query(query, username);
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
    });
    const authUser = (username, password) => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "SELECT * FROM usuarios WHERE username = ?";
            const [userFromDB] = yield mysqlConnection_1.pool.query(query, username);
            let userData = {
                id: userFromDB[0].id,
                nombre: userFromDB[0].nombre,
                apellido: userFromDB[0].apellido,
                username: userFromDB[0].username,
                password: userFromDB[0].password
            };
            const result = yield (0, bcrypt_1.compare)(password, userData.password);
            return result;
        }
        catch (err) {
            console.log(`An error has ocurred when selecting the values for the selectUser query: ${err}`);
            throw err;
        }
    });
    const getUsers = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "SELECT * FROM usuarios WHERE id";
            const [usersFromDB] = yield mysqlConnection_1.pool.query(query);
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
    });
    const getUser = (username) => __awaiter(this, void 0, void 0, function* () {
        try {
            const query = "SELECT * FROM usuarios WHERE username = ?";
            const [userFromDB] = yield mysqlConnection_1.pool.query(query, [username]);
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
    });
    return {
        checkUsername,
        authUser,
        getUsers,
        getUser
    };
}
exports.login = login;
