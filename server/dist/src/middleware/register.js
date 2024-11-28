// Server's side logic for the register function of the app
// Imports
import { register as registerModel } from "../data/register";
import { login } from "../data/login";
import { compare } from "bcrypt";
import bcrypt from "bcrypt";
import { rejectEmptyInput } from "./utils";
export const hashPwd = (pwd) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(pwd, salt);
    return hash;
};
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
export async function register(req, res) {
    if (!rejectEmptyInput(req, res))
        return;
    // Data provided by the user, stored now as a single object.
    const userData = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        username: req.body.username,
        password: hashPwd(req.body.password),
    };
    // Check if the there's any user with the same username in the DB
    const DBUser = await registerModel().checkUsername(userData.username);
    if (DBUser === null) { // If there's no user, proceed to insert the information
        try {
            // Check if there's no admin user
            const roles = await registerModel().getRoles();
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
            await registerModel().insertUser(userData);
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
}
// 
export async function sendSecurityQuestions(req, res) {
    if (!rejectEmptyInput(req, res))
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
}
// 
export async function saveSecurityQuestions(req, res) {
    if (!rejectEmptyInput(req, res))
        return;
    const usuario = await login().getUser(req.body.usuario);
    const preguntasDeSeguridad = {
        usuario: usuario[0].id,
        pregunta1: req.body.pregunta1,
        respuesta1: hashPwd(req.body.respuesta1),
        pregunta2: req.body.pregunta2,
        respuesta2: hashPwd(req.body.respuesta2)
    };
    try {
        await registerModel().insertSecurityQuestions(preguntasDeSeguridad);
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
}
export async function getUserSecurityQuestions(req, res) {
    if (!rejectEmptyInput(req, res))
        return;
    const username = req.body.username;
    try {
        const DBuser = await login().checkUsername(username);
        if (DBuser !== null) {
            const usuario = await login().getUser(username);
            const securityQuestions = await registerModel().getSecurityQuestions(usuario[0].id);
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
}
export async function changePassword(req, res) {
    if (!rejectEmptyInput(req, res))
        return;
    const newData = {
        username: req.body.username,
        password: hashPwd(req.body.newPassword),
        pregSeg1: req.body.pregSeg1,
        pregSeg2: req.body.pregSeg2
    };
    const DBUser = await registerModel().checkUsername(newData.username);
    const usuario = await login().getUser(newData.username);
    const securityQuestions = await registerModel().getSecurityQuestions(usuario[0].id);
    const result1 = await compare(newData.pregSeg1, securityQuestions[0].respuesta1);
    const result2 = await compare(newData.pregSeg2, securityQuestions[0].respuesta2);
    if (DBUser !== null) {
        if (result1 && result2) {
            try {
                await registerModel().changePassword(newData);
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
}
