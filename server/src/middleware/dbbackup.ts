import type { UserSession } from "../data/types";
import type { Request, Response } from "express";
import config from "../config";
import { exec } from "child_process";
import { deleteOldBackups, isAdmin } from "./utils";

export async function createBackup(req: Request, res: Response) {
    if (!isAdmin(req, res)) return
    try {
        exec(`mysqldump -u ${config.dbuser} --password=${config.dbpwd} -P 3307 ${config.dbname} > ./generated/backup.sql`)
        res.status(200).send({
            message: "Archivo de respaldo creado correctamente."
        })
    } catch (err) {
        console.log(err)
        res.status(400).send({
            message: "Ha ocurrido un error al intentar crear la copia de seguridad",
            err: err
        })
    }
}

export async function uploadBackup(req: Request, res: Response) {
    if (!isAdmin(req, res)) return
    // Archivo recibido
    let dbBackup: any;
    let uploadPath: string;
    // Verificacion de que el archivo no sea nulo o este vacio
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
            message: "No se ha subido ningún archivo."
        });
    }
    dbBackup = req.files?.backup_upload;
    uploadPath = __dirname;
    if (!dbBackup.name.endsWith(".sql")) {
        return res.status(400).send({
            message: "El archivo subido no es un archivo sql. Asegurese de elegir el archivo correcto."
        })
    } 
    try {
        // Translado del archivo a otro lugar
        dbBackup.mv(`./backup/${dbBackup.name}`, (err: any) => {
            if (err) {
                console.log(err)
            } else {
                console.log("archivo movido exitosamente")
            }
        });
        exec(`mysql -u ${config.dbuser} --password=${config.dbpwd} -P 3307 ${config.dbname} < ./backup/${dbBackup.name}`)
        .addListener("message", (msg) => {
            console.log(msg)
        })
        res.status(200).send({
            message: "Copia de seguridad restaurada correctamente",
            err: null
        })
    } catch (err) {
        console.log(err)
        res.status(400).send({
            message: "Ha ocurrido un error al intentar cargar la copia de seguridad",
            err: err
        })
    }
}