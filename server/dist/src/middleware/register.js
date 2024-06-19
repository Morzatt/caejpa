"use strict";
// Server's side logic for the register function of the app
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.getUserSecurityQuestions = exports.saveSecurityQuestions = exports.sendSecurityQuestions = exports.register = exports.hashPwd = void 0;
// Imports
const register_1 = require("../data/register");
const login_1 = require("../data/login");
const bcrypt_1 = require("bcrypt");
const bcrypt_2 = __importDefault(require("bcrypt"));
const utils_1 = require("./utils");
const hashPwd = (pwd) => {
    const saltRounds = 10;
    const salt = bcrypt_2.default.genSaltSync(saltRounds);
    const hash = bcrypt_2.default.hashSync(pwd, salt);
    return hash;
};
exports.hashPwd = hashPwd;
const preguntasDeSeguridad = [
    "Nombre de su Abuela Paterna",
    "Nombre de su Primera Mascota",
    "Titulo de su Libro Favorito",
    "Comida Favorita",
    "Pelicula Favorita",
    "Profesion de su Padre",
    "Profesion de su Madre",
    "Color Favorito"
];
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, utils_1.rejectEmptyInput)(req, res))
            return;
        // Data provided by the user, stored now as a single object.
        const userData = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            username: req.body.username,
            password: (0, exports.hashPwd)(req.body.password),
        };
        // Check if the there's any user with the same username in the DB
        const DBUser = yield (0, register_1.register)().checkUsername(userData.username);
        if (DBUser === null) { // If there's no user, proceed to insert the information
            try {
                // Check if there's no admin user
                const roles = yield (0, register_1.register)().getRoles();
                for (let i = 0; i < roles.length; i++) {
                    if (userData.role === "Administrador" && roles[i] === "Administrador") {
                        res.status(400).send({
                            message: "Ya existe un usuario Administrador.",
                            err: null
                        });
                        return;
                    }
                }
                // Insert the user
                yield (0, register_1.register)().insertUser(userData);
                res.status(200).send({
                    message: `Usuario ${userData.username} correctamente registrado.`,
                    err: null
                });
            }
            catch (err) { // Catch an error
                console.log(`There was an error when signing up the user: ${err}`);
                res.status(400).send({
                    message: "Ha ocurrido un error al intentar registrar al usuario.",
                    err: err
                });
                throw err;
            }
        }
        else { // If there was no user, return a response
            console.log("User already Registered");
            res.status(400).send({
                message: "El usuario ya se encuentra registrado.",
                err: null
            });
        }
    });
}
exports.register = register;
// 
function sendSecurityQuestions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, utils_1.rejectEmptyInput)(req, res))
            return;
        try {
            res.status(200).send(preguntasDeSeguridad);
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                message: `Ha ocurrido un error al intentar cambiar la contraseña del usuario. Intente nuevamente.`,
                err: err
            });
            throw err;
        }
    });
}
exports.sendSecurityQuestions = sendSecurityQuestions;
// 
function saveSecurityQuestions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, utils_1.rejectEmptyInput)(req, res))
            return;
        const usuario = yield (0, login_1.login)().getUser(req.body.usuario);
        const preguntasDeSeguridad = {
            usuario: usuario[0].id,
            pregunta1: req.body.pregunta1,
            respuesta1: (0, exports.hashPwd)(req.body.respuesta1),
            pregunta2: req.body.pregunta2,
            respuesta2: (0, exports.hashPwd)(req.body.respuesta2)
        };
        try {
            yield (0, register_1.register)().insertSecurityQuestions(preguntasDeSeguridad);
            res.status(200).send({
                message: "Preguntas de Seguridad insertadas correctamente",
                err: null
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                message: `Ha ocurrido un error al intentar cambiar la contraseña del usuario. Intente nuevamente.`,
                err: err
            });
            throw err;
        }
    });
}
exports.saveSecurityQuestions = saveSecurityQuestions;
function getUserSecurityQuestions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, utils_1.rejectEmptyInput)(req, res))
            return;
        const username = req.body.username;
        try {
            const DBuser = yield (0, login_1.login)().checkUsername(username);
            if (DBuser !== null) {
                const usuario = yield (0, login_1.login)().getUser(username);
                const securityQuestions = yield (0, register_1.register)().getSecurityQuestions(usuario[0].id);
                res.status(200).send(securityQuestions);
                return;
            }
            else {
                res.send({
                    message: "No se encuentra el usuario especificado.",
                    err: null
                });
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).send({
                message: `Ha ocurrido un error al intentar obtener las preguntas de seguridad del usuario. Intente nuevamente.`,
                err: err
            });
            throw err;
        }
    });
}
exports.getUserSecurityQuestions = getUserSecurityQuestions;
function changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, utils_1.rejectEmptyInput)(req, res))
            return;
        const newData = {
            username: req.body.username,
            password: (0, exports.hashPwd)(req.body.newPassword),
            pregSeg1: req.body.pregSeg1,
            pregSeg2: req.body.pregSeg2
        };
        const DBUser = yield (0, register_1.register)().checkUsername(newData.username);
        const usuario = yield (0, login_1.login)().getUser(newData.username);
        const securityQuestions = yield (0, register_1.register)().getSecurityQuestions(usuario[0].id);
        const result1 = yield (0, bcrypt_1.compare)(newData.pregSeg1, securityQuestions[0].respuesta1);
        const result2 = yield (0, bcrypt_1.compare)(newData.pregSeg2, securityQuestions[0].respuesta2);
        if (DBUser !== null) {
            if (result1 && result2) {
                try {
                    yield (0, register_1.register)().changePassword(newData);
                    res.status(200).send({
                        message: `Contraseña del usuario: ${newData.username}, correctamente cambiada.`,
                        err: null
                    });
                    console.log("Cambio de contraseña para", newData.username, " exitoso");
                    return;
                }
                catch (err) {
                    console.log(err);
                    res.status(400).send({
                        message: `Ha ocurrido un error al intentar cambiar la contraseña del usuario ${newData.username}.Intente nuevamente.`,
                        err: err
                    });
                    throw err;
                }
            }
            else {
                res.status(400).send({
                    message: "Las respuestas a sus preguntas seguridad no coinciden. Revise sus respuestas e intente de nuevo",
                    err: null
                });
            }
        }
        else {
            res.status(400).send({
                message: "El usuario no se encuentra registrado.",
                err: null
            });
        }
    });
}
exports.changePassword = changePassword;
