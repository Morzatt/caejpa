import { usuarios as usuariosModel } from "../data/usuarios/index.js";
export async function getUsers(req, res) {
    const id = req.params.id;
    try {
        if (id !== "*") {
            const usuario = await usuariosModel().getUser(id);
            return res.send(usuario[0]);
        }
        const usuarios = await usuariosModel().getUsers();
        return res.send(usuarios);
    }
    catch (err) {
        console.log(err);
        res.status(400).send({
            message: "Ha ocurrido un error al buscar los usuarios",
            err: err
        });
    }
}
export async function editUser(req, res) {
    // if (!isAdmin(req,res)) return
    const id = req.params.id;
    if (id === undefined || null || "") {
        return res.status(400).send({
            message: "No se ha seleccionado ningun usuario."
        });
    }
    const nombre = req.query.nombre;
    const apellido = req.query.apellido;
    const username = req.query.username;
    const role = req.query.role;
    try {
        const usuario = await usuariosModel().getUser(id);
        await usuariosModel().editUser(id, (nombre ? nombre : usuario[0].nombre), (apellido ? apellido : usuario[0].apellido), (username ? username : usuario[0].username), (role ? role : usuario[0].role));
        res.status(200).send({
            message: "Datos del Usuario editados correctamente."
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({
            message: "Ha ocurrido un error al intentar editar el usuario.",
            err: err
        });
    }
}
export async function deleteUser(req, res) {
    // if (!isAdmin(req,res)) return
    const id = req.params.id;
    if (id === undefined || null || "") {
        return res.status(400).send({
            message: "No se ha seleccionado ningun usuario."
        });
    }
    try {
        await usuariosModel().deleteUser(id);
        res.status(200).send({
            message: "Usuario eliminado correctamente."
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({
            message: "Ha ocurrido un error al intentar editar el usuario.",
            err: err
        });
    }
}
export async function blockUser(req, res) {
    // if (!isAdmin(req,res)) return
    const id = req.params.id;
    if (id === undefined || null || "") {
        return res.status(400).send({
            message: "No se ha seleccionado ningun usuario."
        });
    }
    try {
        await usuariosModel().blockUser(id);
        res.status(200).send({
            message: "Usuario bloqueado correctamente."
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({
            message: "Ha ocurrido un error al intentar editar el usuario.",
            err: err
        });
    }
}
export async function unlockUser(req, res) {
    // if (!isAdmin(req,res)) return
    const id = req.params.id;
    if (id === undefined || null || "") {
        return res.status(400).send({
            message: "No se ha seleccionado ningun usuario."
        });
    }
    try {
        await usuariosModel().unlockUser(id);
        res.status(200).send({
            message: "Usuario desbloqueado correctamente."
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({
            message: "Ha ocurrido un error al intentar editar el usuario.",
            err: err
        });
    }
}
