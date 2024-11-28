import { afiliados as afiliadosModel } from "../data/afiliados";
export async function sendAfiliados(req, res) {
    const searchParams = req.query.searchParams;
    try {
        const afiliados = await afiliadosModel().getAfiliados();
        if (afiliados === null) {
            return res.status(403).send({
                message: "No se ha añadido ningún afiliado a la lista de Afiliados Frecuentes"
            });
        }
        if (searchParams !== "") {
            const filteredAfiliados = afiliados.filter(afiliado => {
                return afiliado.expediente.toLowerCase().includes(searchParams) ||
                    afiliado.nombre.toLowerCase().includes(searchParams) ||
                    afiliado.apellido.toLowerCase().includes(searchParams) ||
                    afiliado.cedula.toString().toLowerCase().includes(searchParams);
            });
            return res.status(200).send(filteredAfiliados);
        }
        res.status(200).send(afiliados);
    }
    catch (err) {
        console.log(err);
        res.status(400).send({
            message: "Ha ocurrido un error al intentar crear la copia de seguridad",
            err: err
        });
    }
}
export async function deleteAfiliado(req, res) {
    const cedula = req.params.cedula;
    try {
        await afiliadosModel().deleteAfiliado(cedula);
        res.status(200).send({ message: "El afiliado ha sido eliminado." });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({
            message: "Ha ocurrido un error al intentar crear la copia de seguridad",
            err: err
        });
    }
}
export async function sendAfiliadosRetirados(req, res) {
    const cedula = req.params.cedula;
    const searchParams = req.query.searchParams;
    try {
        const retirados = await afiliadosModel().getAfiliadosRetirados(cedula);
        if (retirados === null) {
            return res.status(403).send({
                message: "No existen registros de Afiliados Retirados"
            });
        }
        if (searchParams !== "") {
            const filteredRetirados = retirados.filter(afiliado => {
                return afiliado.expediente.toLowerCase().includes(searchParams) ||
                    afiliado.nombre.toLowerCase().includes(searchParams) ||
                    afiliado.apellido.toLowerCase().includes(searchParams) ||
                    afiliado.cedula.toString().toLowerCase().includes(searchParams);
            });
            return res.status(200).send(filteredRetirados);
        }
        res.status(200).send(retirados);
    }
    catch (err) {
        console.log(err);
        res.status(400).send({
            message: "Ha ocurrido un error al intentar crear la copia de seguridad",
            err: err
        });
    }
}
export async function insertReingresoData(req, res) {
    const { nombre, apellido, expediente, cedula, motivo } = req.body;
    const session = req.session;
    const usuario = session.userInfo?.username;
    try {
        await afiliadosModel().deleteAfiliadoRetirado(cedula);
        await afiliadosModel().insertReingresoData(nombre, apellido, cedula, expediente, motivo, usuario);
        res.status(200).send({
            message: "Afiliado Reingresado."
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({
            message: "Ha ocurrido un error al intentar crear la copia de seguridad",
            err: err
        });
    }
}
export async function sendReingresados(req, res) {
    const searchParams = req.query.searchParams;
    try {
        const reingresados = await afiliadosModel().getReingresoData();
        if (reingresados === null) {
            return res.status(403).send({
                message: "No existen registros de Afiliados Reingresados"
            });
        }
        if (searchParams !== "") {
            const filteredReingresados = reingresados.filter(afiliado => {
                return afiliado.expediente.toLowerCase().includes(searchParams) ||
                    afiliado.nombre.toLowerCase().includes(searchParams) ||
                    afiliado.apellido.toLowerCase().includes(searchParams) ||
                    afiliado.cedula.toString().toLowerCase().includes(searchParams);
            });
            return res.status(200).send(filteredReingresados);
        }
        res.status(200).send(reingresados);
    }
    catch (err) {
        console.log(err);
        res.status(400).send({
            message: "Ha ocurrido un error al intentar crear la copia de seguridad",
            err: err
        });
    }
}
