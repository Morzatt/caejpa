import { Request, Response, Router } from "express"
import { renameSync } from "fs"
import { createBackup, uploadBackup } from "../../middleware/dbbackup";

export const backup = Router();

backup.post("/create",
    (req: Request, res: Response) => {
        try {
            createBackup(req, res);
        } catch (err) {
            throw err
        }
    }
)

backup.get("/download",
    async (req: Request, res: Response) => {
        try {
            const date = new Date()
            const backupName = `backup_${date.getDate()}${date.getMonth()+1}${date.getFullYear()}${date.getHours()}${date.getMinutes()}`
            renameSync("./generated/backup.sql", `./generated/${backupName}.sql`)
            res.download(`./generated/${backupName}.sql`, (err) => {
                if (err) {
                    res.status(500).send('Hubo un error al descargar el archivo');
                } else {
                    console.log('Archivo descargado exitosamente');
                }
            });
        } catch (err) {
            console.log(`And error has ocorred while sending the get request on the login ${err}`)
        }
    }
)

backup.post("/upload",
    (req: Request, res: Response) => {
        try {
            uploadBackup(req, res);
        } catch (err) {
            console.log(`And error has ocorred while sending the get request on the login ${err}`)
        }
    }
)