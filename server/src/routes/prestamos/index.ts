// Routes and configuration for the register page of the app 

import { Request, Response, Router } from "express"
import { insertPrestamo, getPrestamos, individualDownload, grupalDownload, deletePrestamo, sendPrestamosStats } from "../../middleware/prestamos";

export const prestamos = Router();

prestamos.get("/stats", 
    (req: Request, res: Response) => {
        try {
            sendPrestamosStats(req, res)
        } catch (err) {
            console.log(`${err}`)
        }
    }
)
prestamos.post("/",
    (req: Request, res: Response) => {
        try {
            insertPrestamo(req, res)
        } catch (err) {
            console.log(`And error has ocorred while sending the post request ${err}`)
        }
    }
)

prestamos.post("/createPrestamo",
    (req: Request, res: Response) => {
        try {
            individualDownload(req, res)
        } catch (err) {
            console.log(`And error has ocorred while sending the post request ${err}`)
        }
    }
)

prestamos.get("/downloadPrestamo",
    (req: Request, res: Response) => {
        try {
            res.download("./individualReport.pdf", (err) => {
                if (err) {
                    console.log("File Correctly Downloaded.")
                } else {
                    console.log("Error at downloading the file")    
                }
            })
        } catch (err) {
            console.log(`And error has ocorred while sending the post request ${err}`)
        }
    }
)

prestamos.post("/createPrestamos",
    (req: Request, res: Response) => {
        try {
            grupalDownload(req, res)
        } catch (err) {
            console.log(`And error has ocorred while sending the post request ${err}`)
        }
    }
)
prestamos.get("/downloadPrestamos",
    (req: Request, res: Response) => {
        try {
            res.download("./grupalReport.pdf", (err) => {
                if (err) {
                    console.log("File Correctly Downloaded.")
                } else {
                    console.log("Error at downloading the file")    
                }
            })
        } catch (err) {
            console.log(`And error has ocorred while sending the post request ${err}`)
        }
    }
)

prestamos.get("/:id",
    (req: Request, res: Response) => {
        try {
            getPrestamos(req, res)
        } catch (err) {
            console.log(`And error has ocorred while sending the post request ${err}`)
        }
    }
)

prestamos.delete("/:id",
    (req: Request, res: Response) => {
        try {
            deletePrestamo(req, res)
        } catch (err) {
            console.log(`And error has ocorred while sending the post request ${err}`)
        }
    }
)