import { Request, Response, Router } from "express"
import { editUser, getUsers, deleteUser, blockUser, unlockUser } from "../../middleware/usuarios";

export const usuarios = Router();

usuarios.get("/:id", 
    (req: Request, res: Response) => {
        try {
            getUsers(req,res)
        } catch (err) {
            console.log(`An error has ocurred with the GET /prestamos/variables route`)
        }
    }
)

usuarios.patch("/:id", 
    (req: Request, res: Response) => {
        try {
            editUser(req, res)
        } catch (err) {
            console.log(`An error has ocurred with the GET /prestamos/variables route`)
        }
    }
) 

usuarios.delete("/:id", 
    (req: Request, res: Response) => {
        try {
            deleteUser(req, res)
        } catch (err) {
            console.log(`An error has ocurred with the GET /prestamos/variables route`)
        }
    }
)

usuarios.get("/block/:id", 
    (req: Request, res: Response) => {
        try {
            blockUser(req, res)
        } catch (err) {
            console.log(`An error has ocurred with the GET /prestamos/variables route`)
        }
    }
)
usuarios.get("/unlock/:id", 
    (req: Request, res: Response) => {
        try {
            unlockUser(req, res)
        } catch (err) {
            console.log(`An error has ocurred with the GET /prestamos/variables route`)
        }
    }
)